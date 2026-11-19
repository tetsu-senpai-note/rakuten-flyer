// メニューが画面からはみ出すとき、いま見ているページのタブを見える位置に寄せる
(function(){
  var nav=document.querySelector('.site nav');
  if(!nav) return;
  var cur=nav.querySelector('[aria-current]');
  if(cur && nav.scrollWidth>nav.clientWidth){
    nav.scrollLeft=Math.max(0, cur.offsetLeft-16);
  }
  // 右端まで来たら「続きがある」の影を消す
  function fade(){
    var more=nav.scrollLeft+nav.clientWidth < nav.scrollWidth-2;
    nav.parentNode.classList.toggle('more',more);
  }
  fade();
  nav.addEventListener('scroll',fade,{passive:true});
  window.addEventListener('resize',fade);
})();
