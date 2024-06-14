import { useEffect, useState } from "react";
import "./App.css";
import { ID } from "appwrite";
import { databases, databaseId, collectionId } from "./utils/client";

type Todo = {
  title: string;
  url: string;
};

function App() {
  const [todo, SetTodo] = useState<Array<Todo>>([]);

  const [item, setItem] = useState<Todo>({
    title: "",
    url: ""
  });

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await databases.listDocuments(databaseId, collectionId);
        SetTodo(
          response.documents.map((document) => ({
            title: document.title,
            url: document.url,
          }))
        );
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchLinks();
  }
  , [todo]);


  const addLink = async () => {
    console.log(item);
    try {
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          title: item.title,
          url: item.url,
        }
      );
      console.log("Document created successfully:", response);
      alert("Link added successfully");
    } catch (error) {
      console.error("Error creating document:", error);
    } 
    finally {
      setItem({
        title: "",
        url: ""
      });
    }
  }

  const listOperations = async (op:string) => {
    
    if(op === "add"){
      addLink();
    }

  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        position: "relative",
        minHeight: "100vh",
        background: "#1B1B1B",
      }}
    >
      <p
        style={{
          fontSize: "30px",
          marginTop: "60px",
        }}
      >
        My Sandbox creations I do in my passtime
      </p>
      <p
        style={{
          textAlign: "center",
          fontSize: "25px",
        }}
      >
        🎧 + 💻 + 🔨
      </p>

      <div
        style={{
          display: "flex",
          marginTop: "50px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          width: "50%",
          padding: "20px",
        }}
      >
        {todo.length>0 ? todo.map((todo, index) => (
          <div key={index}  
          className="todo-item"
          style={{
            width: "100%",
          }}
          >
            <a
              style={{
                fontSize: "20px",
                color: "#888380",
                textDecoration: "none",
              }}
              target="_blank"
              href={todo.url}
            >
              {todo.title} 🔗
            </a>
          </div>
        ))
      :
      <div>
        <p style={{color: "#888380"}}>No links found</p>
      </div>
      }
      </div>

      <div
        className="form"
        style={{
          display: "flex",
          paddingBlock: "2rem",
          flexDirection: "row",
          width: "100%",
          position: "absolute",
          bottom: 0,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "50%",
            padding: "2rem",
            borderRadius: "20px",
            justifyContent: "space-evenly",
            alignItems: "center",
            border: "1px solid #363736",
            backgroundColor: "#1D1E1D",
          }}
        >
          <label htmlFor="" color="#A8A29E">
            Title
          </label>
          <input
            style={{
              padding: "15px",
              borderRadius: "5px",
              display: "flex",
              flexGrow: 1,
              backgroundColor: "#3B3C3B",
              color: "white",
              border: "1px solid #C6DBEF",
            }}
            type="text"
            name="title"
            value={item.title}
            onChange={
              (e) => setItem({ ...item, title: e.target.value })
            }
          />
          <label htmlFor="" color="#A8A29E">
            URL
          </label>
          <input
            style={{
              padding: "15px",
              borderRadius: "5px",
              display: "flex",
              flexGrow: 1,
              backgroundColor: "#3B3C3B",
              color: "white",
              border: "1px solid #C6DBEF",
            }}
            type="text"
            name="url"
            value={item.url}
            onChange={
              (e) => setItem({ ...item, url: e.target.value })
            }
          />
          <button
            style={{
              padding: "10px",
              paddingInline: "20px",
              backgroundColor: "rgb(241,245,249)",
              color: "black",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={() => {
              listOperations("add");
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
