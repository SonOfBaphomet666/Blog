import { useState, useEffect } from "react";

interface Post {
  frontmatter: {
    title: string;
    date: Date;
    text: string;
    tags?: string[];
  };
  url: string;
}

interface CardReact {
  posts: Post[];
}

const CardReact = ({ posts }) => {
  const allPosts: Post[] = Object.values(
    import.meta.glob("../../pages/posts/*.md", { eager: true }),
  ) as Post[];
  
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [visibleData, setVisibleData] = useState<number>(5);

  const handleLoadMore = () => {
    setVisibleData((prevCount) => prevCount + 5);
  };

  useEffect(() => {
    const savedTag = localStorage.getItem("selectedTag");
    if (savedTag) {
      setSelectedTag(savedTag);
    }
  }, []);

  const filterPosts = (tag: string) => {
    setSelectedTag(tag);
    localStorage.setItem("selectedTag", tag);
    setVisibleData(5);
  };

  const filteredPosts =
    selectedTag === "all"
      ? allPosts.slice(0, visibleData)
      : allPosts
          .filter((post) => post.frontmatter.tags?.includes(selectedTag))
          .slice(0, visibleData);

  const hasMorePosts =
    filteredPosts.length <
    (selectedTag === "all"
      ? allPosts.length
      : allPosts.filter((post) => post.frontmatter.tags?.includes(selectedTag))
          .length);

  return (
    <div>
      <div className="buttonBox">
        <button onClick={() => filterPosts("breakdance")}>Breakdance</button>
        <button onClick={() => filterPosts("programming")}>Programming</button>
        <button onClick={() => filterPosts("all")}>All</button>
      </div>
      <div className="card">
        {filteredPosts.map((post) => (
          <div className="cardBox" key={post.frontmatter.title}>
            <div className="cardBox__box">
              <div className="cardBox__title">
                <h3>{post.frontmatter.title}</h3>
              </div>
              <div className="cardBox__date">
                <p>{post.frontmatter.date.toString().slice(0, 10)}</p>
              </div>
              <div className="cardBox__par">
                <p>{post.frontmatter.text}</p>
                <a className="link" href={post.url}>
                  View the entire post!
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="loadMoreBox">
        {hasMorePosts ? (
          <button onClick={handleLoadMore}>Load More</button>
        ) : (
          <p>No more posts available.</p>
        )}
      </div>
    </div>
  );
};

export default CardReact;
