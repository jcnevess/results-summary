class CategorySummary extends HTMLElement {
  static observedAttributes = [
    "category",
    "score",
    "icon",
    "color",
    "bg-color",
  ];

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const stylesheet1 = document.createElement("link");
    stylesheet1.setAttribute("rel", "preconnect");
    stylesheet1.setAttribute("href", "https://fonts.googleapis.com");

    const stylesheet2 = document.createElement("link");
    stylesheet2.setAttribute("rel", "preconnect");
    stylesheet2.setAttribute("href", "https://fonts.gstatic.com");
    stylesheet2.setAttribute("crossorigin", "true");

    const stylesheet3 = document.createElement("link");
    stylesheet3.setAttribute("rel", "stylesheet");
    stylesheet3.setAttribute(
      "href",
      "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;700;800&display=swap"
    );

    document.head.appendChild(stylesheet1);
    document.head.appendChild(stylesheet2);
    document.head.appendChild(stylesheet3);

    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");

    const icon = document.createElement("span");
    icon.setAttribute("class", "icon");

    const title = document.createElement("span");
    title.setAttribute("class", "title");

    const scoreboard = document.createElement("span");
    scoreboard.setAttribute("class", "scoreboard");

    const score = document.createElement("span");
    score.setAttribute("class", "score");

    scoreboard.appendChild(score);
    scoreboard.appendChild(document.createTextNode(" / 100"));

    const style = document.createElement("style");
    style.textContent = `    
      .wrapper {
        display: grid;
        grid-template-columns: 10% 60% 30%;
        font-weight: bold;
        align-items: center;
        padding: 0.75rem;
        border-radius: 10px;
        font-family: 'Hanken Grotesk', sans-serif;
      }

      .scoreboard {
        color: lightgray;
        text-align: right;
      }

      .score {
        color: hsl(224, 30%, 27%);
      }

      .icon {
        display: flex;
        align-items: center;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(title);
    wrapper.appendChild(scoreboard);
  }

  connectedCallback() {
    const shadow = this.shadowRoot;

    const iconImg = document.createElement("img");
    iconImg.setAttribute("src", this.getAttribute("icon"));
    iconImg.setAttribute("alt", this.getAttribute("category"));

    shadow.querySelector(".icon").appendChild(iconImg);

    shadow.querySelector(".title").textContent = this.getAttribute("category");

    shadow.querySelector(".score").textContent = this.getAttribute("score");

    shadow.querySelector("style").textContent = shadow.querySelector("style")
      .textContent.concat(`
      .title {
        color: ${this.getAttribute("color")}
      }
      .wrapper {
        background-color: ${this.getAttribute("bg-color")}
      }
    `);
  }
}

customElements.define("category-summary", CategorySummary);
