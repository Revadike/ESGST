_MODULES.push({
    description: `
      <ul>
        <li>If you cannot access a giveaway for blacklist reasons (either because you have blacklisted the creator or the creator has blacklisted you), this feature requests the giveaway in anonymous mode (as if you were not logged in) and loads it to you.</li>
      </ul>
    `,
    id: `bgl`,
    load: bgl,
    name: `Blacklist Giveaway Loader`,
    sg: true,
    type: `giveaways`
  });

  async function bgl() {
    if (!esgst.giveawayPath) return;

    let backup = Array.from(esgst.pageOuterWrap.children).map(x => {
      return {
        context: x
      };
    });
    let summary = document.getElementsByClassName(`table--summary`)[0];
    summary = summary && summary.lastElementChild.firstElementChild.lastElementChild;
    if (!summary) return;
    let match = summary.textContent.match(/you\s(have\s(been\s)?|previously\s)blacklisted/);
    if (!match) return;
    createElements(esgst.pageOuterWrap, `inner`, [{
      attributes: {
        class: `fa fa-circle-o-notch fa-spin`
      },
      type: `i`
    }, {
      text: `Loading giveaway...`,
      type: `span`
    }]);
    let responseHtml = parseHtml((await request({anon: true, method: `GET`, url: location.pathname})).responseText);
    if (responseHtml.getElementsByClassName(`table--summary`)[0]) {
      createElements(esgst.pageOuterWrap, `inner`, backup);
      createElements(esgst.pageOuterWrap.getElementsByClassName(`table--summary`)[0].lastElementChild.firstElementChild.lastElementChild, `beforeEnd`, [{
        type: `br`
      }, {
        type: `br`
      }, {
        attributes: {
          class: `esgst-red`
        },
        text: `This is a group/whitelist giveaway and therefore cannot be loaded by Blacklist Giveaway Loader.`,
        type: `span`
      }]);
    } else {
      esgst.featuredContainer = createElements(esgst.pageOuterWrap, `beforeBegin`, [{
        attributes: {
          class: `featured__container`
        },
        type: `div`
      }]);
      createElements(esgst.featuredContainer, `inner`, Array.from(responseHtml.getElementsByClassName(`featured__container`)[0].children).map(x => {
        return {
          context: x
        };
      }));
      createElements(esgst.pageOuterWrap, `inner`, Array.from(responseHtml.getElementsByClassName(`page__outer-wrap`)[0].children).map(x => {
        return {
          context: x
        };
      }));
      await getElements();
      createElements(esgst.sidebar, `afterBegin`, [{
        attributes: {
          class: `sidebar__error is-disabled`
        },
        type: `div`,
        children: [{
          attributes: {
            class: `fa fa-exclamation-circle`
          },
          type: `i`
        }, {
          text: `${match[1] ? (match[1] === `previously ` ? `Off Your Blacklist (${summary.firstElementChild.textContent})` : (match[1] === `have been ` ? `You Are Blacklisted` : `On Your Blacklist`)) : `On Your Blacklist`}`,
          type: `node`
        }]
      }]);
    }
  }
