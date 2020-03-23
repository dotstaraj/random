
async function expandMainCommentsThread (next, nextStep) {
   console.log("....\n\nExpanding main comments thread, please wait..." + next);

   let selector = "div[id^='see_" + (next ? "next" : "prev") + "']";

   //This loop will keep on clicking "View previous comments" until no more left
   let node = document.querySelector(selector);

   let i = 0;
   while (node) {
      let lastCommentNode = node.previousSibling;
      node.firstChild.firstChild.click();
      console.log(++i + "... Expanding main comments thread, please wait...");
      await new Promise(r => setTimeout(r, 1000));
      node = document.querySelector(selector);
      while (node.firstChild.lastChild['style'].transform.length > 0) {
         await new Promise(r => setTimeout(r, 500));
         node = document.querySelector(selector);
      }
      if (next) window.scrollTo(0,document.body.scrollHeight);
      if (lastCommentNode === (next ? node.previousSibling : node.nextSibling)) break;
      //break;
   }

   nextStep();
}

function expandMainCommentsPrev() {   expandMainCommentsThread(false, expandMainCommentsNext); }
function expandMainCommentsNext() {   expandMainCommentsThread(true, expandReplies); }

async function expandReplies() {
   let nodes = document.querySelectorAll("div[id^='comment_replies_more']");
   //Clicks on all those links to expand the replies
   let c = 0;
   let i = 0;
   while (i < nodes.length) {
      nodes[i].firstChild.firstChild.click();
      await new Promise(r => setTimeout(r, 300));
      console.log(++c + "... Expanding replies, please wait...");
      ++i;
      }
   
   await new Promise(r => setTimeout(r, 500));
   while (true) {
      let nodes = document.querySelectorAll("div[id^='comment_replies_more']");
      //Clicks on all those links to expand the replies
      i = 0;
      while (i < nodes.length) {
         nodes[i].firstChild.click();
         await new Promise(r => setTimeout(r, 300));
         console.log(++c + "... Expanding replies, please wait...");
         ++i;
      }
      await new Promise(r => setTimeout(r, 500));
      if (nodes.length === 0) break;
   }

   printNames();
}

async function printNames() {
   let result = document.evaluate("//div[@data-sigil='comment inline-reply']\
                               //i[string-length(@aria-label) > 0]", document);
   let n = result.iterateNext();
   let nameList = "";
   while (n) {
      nameList += n.getAttribute('aria-label') + ", ";
      n = result.iterateNext();
   }
   console.log(nameList);
}

var res = expandMainCommentsPrev();
