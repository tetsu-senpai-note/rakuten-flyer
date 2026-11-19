// メニューが画面からはみ出すとき、いま見ているページのタブを見える位置に寄せる。
// Webフォントが後から読み込まれて幅が変わるので、読み込み完了後にもやり直す。
(function(){
  var wrap=document.querySelector('.site .in');
  var nav=wrap && wrap.querySelector('nav');
  if(!nav) return;

  function fade(){
    var more=nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 2;
    wrap.classList.toggle('more', more);
  }

  function focusCurrent(){
    var cur=nav.querySelector('[aria-current]');
    if(!cur) { fade(); return; }
    if(nav.scrollWidth <= nav.clientWidth){ nav.scrollLeft=0; fade(); return; }
    var left=cur.offsetLeft, right=left+cur.offsetWidth;
    if(right > nav.scrollLeft + nav.clientWidth){
      // 右にはみ出している → 右端にそろえる（16pxだけ余白を残す）
      nav.scrollLeft = right - nav.clientWidth + 16;
    } else if(left < nav.scrollLeft){
      nav.scrollLeft = Math.max(0, left - 16);
    }
    fade();
  }

  focusCurrent();
  window.addEventListener('load', focusCurrent);
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(focusCurrent); }
  nav.addEventListener('scroll', fade, {passive:true});
  window.addEventListener('resize', focusCurrent);
})();
