import { useState, useEffect } from "react";

const CardReact = ({ posts }) => {
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    const savedTag = localStorage.getItem("selectedTag");
    console.log("Saved Tag:", savedTag);
    if (savedTag) {
      setSelectedTag(savedTag);
    }
  }, []);

  const filterPosts = (tag) => {
    setSelectedTag(tag);
    localStorage.setItem("selectedTag", tag);
  };

  const filteredPosts =
    selectedTag === "all"
      ? posts
      : posts.filter((post) => post.frontmatter.tags?.includes(selectedTag));
  console.log("Filtered Posts:", filteredPosts);

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
    </div>
  );
};

export default CardReact;
