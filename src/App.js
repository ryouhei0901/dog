import { useEffect, useState } from "react";
import { fetchImages } from "./api";
function Header() {
  return (
    <header className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">勝手な偏見で成金が飼っていそうなdog一覧</h1>
          <h1 className="Subtitle">日本大学文理学部情報科学科 Webプログラミングの演習課題</h1>
          <h1 className="Subtitle">氏名:辻涼平　学籍番号:5419003</h1>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="cute dog!" />
          
        </figure>
      </div>
    </div>
  );
}
function Loading() {
    return <p>Loading...</p>;
  
}
  

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
        return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
        {urls.map((url) => {
          return(
            <div key={url} className="column is-3">
              <Image src={url} />
            </div>
          );
        })} 
      </div>
  );
}

function Form(props) {
      function handleSubmit(event) {
        event.preventDefault();
        const { breed } = event.target.elements;
        props.onFormSubmit(breed.value);
      } 
    return (
      <div>
        
        <form onSubmit={handleSubmit}>
         <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
               <select name="breed" defaultValue="shiba">

                  <option value="shiba">Shiba</option>
                  <option value="akita">Akita</option>
                  <option value="pug">Pug</option>
                  <option value="Pug">Pug</option>
                  <option value="golden Retriever">Golden Retriever</option>
                  <option value="saluki">Saluki</option>
                  <option value="pitbull">Pitbull</option>
                  
                  
                  </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-dark">
                Reload
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
        fetchImages("shiba").then((urls) => {
          setUrls(urls);
        });
      }, []);
      function reloadImages(breed) {
            fetchImages(breed).then((urls) => {
              setUrls(urls);
            });
          }
  return (
    <main>
      <section className="section">
        <div className="container">
         
        
          
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Dog images are retrieved from Dog API</p>
        <p>
          <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;