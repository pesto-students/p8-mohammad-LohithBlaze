import { useState } from 'react';
import ReactGA from 'react-ga';
// import './App.css';
import axios from "axios";
import heroImage from "./assets/illustration-working.svg";

ReactGA.initialize('UA-12345678-1');

function CopyButton({ text }) {
  const [buttonText, setButtonText] = useState("Copy");
  const [buttonClass, setButtonClass] = useState("primary");

  return <button className={buttonClass} onClick={() => {
    setButtonText("Copied");
    setButtonClass("contrast");
    console.log(text);
    navigator.clipboard.writeText(text);
    ReactGA.event({
      category: 'Button',
      action: 'Copy Link',
      label: 'Shortened Link',
    });
  }}>{buttonText}</button>;

}

function App() {
  const [shortLink, setShortLink] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const fetchShortLink = async () => {
    try {
      setisLoading(true);
      const response = await axios(
        `https://api.shrtco.de/v2/shorten?url=${userInput}`
      );
      setShortLink([...shortLink, response.data.result.full_short_link]);
      setisLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className='container-fluid' data-theme="light" >
        <nav>
          <ul>
            <li><a href='./' onClick={(event) => event.preventDefault()}><strong>Shortly</strong></a></li>
          </ul>
          <ul>
            <li><a href='#'>Features</a></li>
            <li><a href='#'>Pricing</a></li>
            <li><a href='#'>Resources</a></li>
          </ul>
          <ul>
            <li><a href='#'>Login</a></li>
            <li><a href='#' role="button">Sign Up</a></li>
          </ul>
        </nav>
        <section className="grid">
          <div>
            <article>
              <h1>More than just shorter links</h1>
              <p>Build your brand’s recognition and get detailed insights
                on how your links are performing.</p>
              <p><a href="#" role="button" onClick={(e) => e.preventDefault()}>Get Started</a></p>
            </article>
          </div>
          <div>
            <img src={heroImage} alt="" />
          </div>
        </section>
      </div>
      <section className='container'>
        <div className='grid'>
          <input type="text" name="shortenURL" placeholder="Shorten a link here" required value={userInput} onChange={(e) => setUserInput(e.target.value)} />
          <button type='submit' aria-busy={isLoading} onClick={() => fetchShortLink()}>Shorten It!</button>
        </div>
      </section>
      {
        shortLink && shortLink.map((link, index) => <section className='container' key={index}>
          <article className='grid'>
            {link}
            <CopyButton text={link}></CopyButton>
          </article>
        </section>)
      }
      <button onClick={() => methodDoesNotExist()}>Break the world</button>;
    </>
  )
}

export default App
