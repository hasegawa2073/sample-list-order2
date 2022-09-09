document.addEventListener('DOMContentLoaded', function () {
  const todo = document.querySelector('.todo__ul');
  let lists = document.querySelectorAll('.todo__li');
  const heightArray: Array<number> = new Array();
  const listTopArray: Array<number> = new Array();
  lists.forEach((list) => {
    const target: HTMLElement = list as HTMLElement;
    const height: number = target.clientHeight;
    heightArray.push(height);
  });
  // リストそれぞれのtopの値を配列に格納
  heightArray.reduce((accu, curr) => {
    listTopArray.push(accu);
    return accu + curr;
  }, 0);
  // リストそれぞれに絶対配置の値を割り当てる関数
  const arrangementList = () => {
    lists = document.querySelectorAll('.todo__li');
    lists.forEach((list, index) => {
      const target: HTMLElement = list as HTMLElement;
      target.style.top = `${listTopArray[index]}px`;
      target.style.left = '0px';
    });
  };
  arrangementList();

  // タッチがスターチした位置の変数
  let startTouchX: number;
  let startTouchY: number;
  // タッチを動かしているときタッチの位置の変数
  let currentTouchX: number;
  let currentTouchY: number;
  // タッチの移動距離の変数
  let moveTouchX: number;
  let moveTouchY: number;
  // マウスが入ってきた位置の変数
  let startMouseX: number;
  let startMouseY: number;
  // マウスを動かしているときのマウスの位置の変数
  let currentMouseX: number;
  let currentMouseY: number;
  // マウスの移動距離の変数
  let moveMouseX: number;
  let moveMouseY: number;
  // 移動前のリストの座標
  let startTargetX: number;
  let startTargetY: number;

  // 渡ってきたリストの配列をtopの値順にして返す関数 (見た目とDOMの順番を揃えるための関数)
  const topOrderListArrayFactory = (listArray: Array<HTMLElement>) => {
    const topOrderListArray: Array<HTMLElement> = new Array();
    const topKeyListMap = new Map();
    listArray.forEach((list) => {
      const top = parseInt(list.style.top);
      topKeyListMap.set(list, top);
    });
    // topの値順に並べ替え(昇順)
    const topOrderListMap = new Map(
      [...topKeyListMap].sort((a, b) => a[1] - b[1])
    );
    for (const [key] of topOrderListMap) {
      topOrderListArray.push(key);
    }
    return topOrderListArray;
  };

  lists.forEach((list, index, array) => {
    const target: HTMLElement = list as HTMLElement;
    target.addEventListener('touchstart', function (e: any) {
      const currentTarget: HTMLElement = e.currentTarget;
      startTouchX = e.pageX;
      startTouchY = e.pageY;
      startTargetX = parseInt(currentTarget.style.left);
      startTargetY = parseInt(currentTarget.style.top);
      currentTarget.classList.add('grabbing');
    });
    target.addEventListener('touchmove', function (e: any) {
      e.preventDefault();
      const currentTarget: HTMLElement = e.currentTarget;
      currentTouchX = e.pageX;
      currentTouchY = e.pageY;
      moveTouchX = currentTouchX - startTouchX;
      moveTouchY = currentTouchY - startTouchY;
      // リストを掴んだままタッチが移動しているとき
      if (currentTarget.classList.contains('grabbing')) {
        const moveTargetX = moveTouchX;
        const moveTargetY = startTargetY + moveTouchY;
        target.style.left = `${moveTargetX}px`;
        target.style.top = `${moveTargetY}px`;
        // リストの見た目の順番とDOMの順番を揃える
        topOrderListArrayFactory(array as any).forEach((list) => {
          todo?.append(list);
        });
      }
    });
    target.addEventListener('touchend', function (e: any) {
      const currentTarget: HTMLElement = e.currentTarget;
      currentTarget.classList.remove('grabbing');
      currentTarget.style.left = '0px';
      arrangementList();
    });
    target.addEventListener('mousedown', function (e: any) {
      const currentTarget: HTMLElement = e.currentTarget;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      startTargetX = parseInt(currentTarget.style.left);
      startTargetY = parseInt(currentTarget.style.top);
      currentTarget.classList.add('grabbing');
    });
    target.addEventListener('mousemove', function (e: any) {
      const currentTarget: HTMLElement = e.currentTarget;
      currentMouseX = e.clientX;
      currentMouseY = e.clientY;
      moveMouseX = currentMouseX - startMouseX;
      moveMouseY = currentMouseY - startMouseY;
      // リストを掴んだままマウスを移動しているとき
      if (currentTarget.classList.contains('grabbing')) {
        const moveTargetX = moveMouseX;
        const moveTargetY = startTargetY + moveMouseY;
        target.style.left = `${moveTargetX}px`;
        target.style.top = `${moveTargetY}px`;
        // リストの見た目の順番とDOMの順番を揃える
        topOrderListArrayFactory(array as any).forEach((list) => {
          todo?.append(list);
        });
      }
    });
    target.addEventListener('mouseup', function (e: any) {
      const currentTarget: HTMLElement = e.currentTarget;
      currentTarget.style.left = '0px';
      currentTarget.classList.remove('grabbing');
      arrangementList();
    });
    target.addEventListener('mouseout', function (e: any) {
      const currentTarget: HTMLElement = e.currentTarget;
      currentTarget.classList.remove('grabbing');
      arrangementList();
    });
  });
});
