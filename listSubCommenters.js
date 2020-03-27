
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
   var numComments = document.querySelectorAll("div[data-sigil='comment']").length;
   var firstReplies = document.querySelectorAll("div[data-sigil='comment inline-reply']:first-of-type");

   dxe_engager_names = dxe_engager_names.split(",");
   replyCounts = new Map();
   for (var v of dxe_engager_names) replyCounts.set(v.trim(), [0, 0, false]);

   for (var i = 0; i < firstReplies.length; ++i) {
      var reply = firstReplies[i];
      while (reply !== null) {
         var replierName = reply.querySelector("a i").getAttribute("aria-label");
         var replierCount = replyCounts.get(replierName);
         if (replierCount) {
            if (!replierCount[2]) {
               ++replierCount[1];
               replierCount[2] = true;
            }
            ++replierCount[0];
         }
         reply = reply.nextSibling;
      }

      for (var v of replyCounts.values()) v[2] = false;
   }

   var csvres = 
      "Comments replied to by ANYONE: " + firstReplies.length + " of " + numComments + "\n" +
      "Name, Total Replies, Unique Replies\n";
   for (var e of replyCounts.entries()) {
      csvres += e[0] + "," + e[1][0] + "," + e[1][1]  + "\n";
   }

   console.log(csvres);
}

function expandMainCommentsPrev() {   expandMainCommentsThread(false, expandMainCommentsNext); }
function expandMainCommentsNext() {   expandMainCommentsThread(true, expandReplies); }

var res = expandMainCommentsPrev();
