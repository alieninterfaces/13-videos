class VideoHover extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addListeners();
  }

  render() {
    this._shadowRoot.innerHTML = `
                <style>
                    .container {
                      border-radius: 20px;
                      overflow: hidden;
                      box-shadow: 0 10px 20px rgba(0,0,0,0.5);
                    }

                    video {
                        width: 100%;
                        height: auto;
                        display: block;
                    }

                    .bottom{
                    font-size: 12px;
                    background: linear-gradient(90deg, #0e192d, #09283c);
                    padding: 15px 20px;
                    box-sizing: border-box;
                    }
                </style>
                <div class="container">
                <video muted>
                    <source src="${this.getAttribute("src")}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="bottom">
                  <slot></slot>
                </div>
                </div>
            `;
  }

  addListeners() {
    const video = this._shadowRoot.querySelector("video");

    this.addEventListener("mouseover", () => {
      video.play();
    });

    this.addEventListener("mouseout", () => {
      video.pause();
      video.currentTime = 0;
    });
  }
}

customElements.define("video-btn", VideoHover);
