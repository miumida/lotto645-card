const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;

const fireEvent = (node, type, detail, options) => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};

function hasConfigOrEntityChanged(element, changedProps) {
  if (changedProps.has("_config")) {
    return true;
  }

  const oldHass = changedProps.get("hass");
  if (oldHass) {
    return (
      oldHass.states[element._config.entity] !==
        element.hass.states[element._config.entity] ||
      oldHass.states["sun.sun"] !== element.hass.states["sun.sun"]
    );
  }

  return true;
}

class LottoCard extends LitElement {
  static get properties() {
    return {
      _config: {},
      hass: {}
    };
  }

  static getStubConfig() {
    return {};
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Please define a nlotto entity");
    }
    this._config = config;
  }

  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    var stateObj = this.hass.states[this._config.entity];

	const number_1 = stateObj.attributes.number_1;
	const number_2 = stateObj.attributes.number_2;
	const number_3 = stateObj.attributes.number_3;
	const number_4 = stateObj.attributes.number_4;
	const number_5 = stateObj.attributes.number_5;
	const number_6 = stateObj.attributes.number_6;
	const number_bonus = stateObj.attributes.number_bonus;

  const n1 = Math.floor(number_1 / 10);
  const n2 = Math.floor(number_2 / 10);
  const n3 = Math.floor(number_3 / 10);
  const n4 = Math.floor(number_4 / 10);
  const n5 = Math.floor(number_5 / 10);
  const n6 = Math.floor(number_6 / 10);
  const nb = Math.floor(number_bonus / 10);

    if (!stateObj) {
      return html`
        <style>
          .not-found {
            flex: 1;
            background-color: yellow;
            padding: 8px;
          }
        </style>
        <ha-card>
          <div class="not-found">
            Entity not available: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    const lang = this.hass.selectedLanguage || this.hass.language;

    return html`
      ${this.renderStyle()}
      <ha-card @click="${this._handleClick}">
        <div class="main_info">
          <span class="lotto_title"
            >${stateObj.attributes.title}</span>
        </div>
        <div class="lottery_info">
          ${stateObj.attributes.lottery_date}
        </div>
        <ul class="variations">
          <li>
            <table><tr><td colspan="8">
              <div class="lotto_sub_title">당첨번호</div></td></tr>
              <tr>
              <td><div class="lotto_cont"><span class="lotto ball_${n1}">${number_1}</span></div></td>
              <td><div class="lotto_cont"><span class="lotto ball_${n2}">${number_2}</span></div></td>
              <td><div class="lotto_cont"><span class="lotto ball_${n3}">${number_3}</span></div></td>
              <td><div class="lotto_cont"><span class="lotto ball_${n4}">${number_4}</span></div></td>
              <td><div class="lotto_cont"><span class="lotto ball_${n5}">${number_5}</span></div></td>
              <td><div class="lotto_cont"><span class="lotto ball_${n6}">${number_6}</span></div></td>
              <td align="center">+</td>
              <td><div class="lotto_cont"><span class="lotto ball_${nb}">${number_bonus}</span></div>
            </td></tr></table>
          </li>
        </ul>
        <div class="sync_info">
        ${stateObj.attributes.sync_date}
        </div>
      </ha-card>
    `;
  }

  _handleClick() {
    fireEvent(this, "hass-more-info", { entityId: this._config.entity });
  }

  getCardSize() {
    return 1;
  }

  renderStyle() {
    return html`
      <style>
        ha-card {
          cursor: pointer;
          margin: auto;
          padding-top: 15px;
          padding-bottom: 10px;
          padding-left: 1em;
          padding-right: 1em;
          position: relative;
        }

        .clear {
          clear: both;
        }

        .ha-icon {
          height: 18px;
          margin-right: 5px;
          color: var(--paper-item-icon-color);
        }

        .title {
          position: absolute;
          left: 3em;
          top: 0.6em;
          font-weight: 300;
          font-size: 3em;
          color: var(--primary-text-color);
        }
        .lotto_title {
          font-weight: 500;
          font-size: 18px;
          color: var(--primary-text-color);
          position: relative;
          top: 0;
        }

        .variations {
          font-weight: 300;
          color: var(--primary-text-color);
          list-style: none;
          padding: 10px 0;
          margin:20px 0;
          border:1px solid #eee;
          border-radius: 10px;
          width:100%;
        }

        .variations li {
          width:100%;
          display:block;
          text-align: center;
          margin:0;
          padding:0;
          float:left;
          box-sizing:border-box;
        }

        .variations li table {
          margin:auto;
        }
        .variations li table td {
          text-align:left;
        }

        .variations:after{
          content:"";
          display:block;
          clear:both;
        }

        .variations .lotto_sub_title{
          font-size:11px;
          color:#666;
          margin-bottom:2px;
        }
        .variations .lotto_cont{
          font-size:13px;
          color:#222;
        }
        .variations .lotto{
          font-size:11px;
          font-weight: 500;
          color:#fff;
          border-radius:10px;
          padding:1px 5px;
          margin-left:5px;
        }
 		    .variations .ball_0{
          background-color: #fbc400;
        }
        .variations .ball_1{
          background-color: #69c8f2;
        }
        .variations .ball_2{
          background-color: #ff7272;
        }
        .variations .ball_3{
          background-color: #aaa;
        }
        .variations .ball_4{
          background-color: #b0d840;
        }

        .unit {
          font-size: 0.8em;
        }

        .precip_prob svg {
          position: relative;
          top:2px;
        }
        .main_info{
          width:100%;
          text-align:center;
        }
        .lottery_info{
          width:100%;
          text-align:center;
          font-size:13px;

          color: #999;
        }
        .sync_info{
          width:100%;
          text-align:center;
          font-size:11px

          color: #999;
        }

        .icon {
          width: 50px;
          height: 50px;
          margin-right: 5px;
          display: inline-block;
          vertical-align: middle;
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          text-indent: -9999px;
        }

      </style>
    `;
  }
}
customElements.define("lotto645-card", LottoCard);
