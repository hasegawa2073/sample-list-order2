document.addEventListener('DOMContentLoaded', function () {
  const todo = document.querySelector('.todo__ul');
  const lists = document.querySelectorAll('.todo__li');
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
  // リストそれぞれに絶対配置の値を割り当てる
  lists.forEach((list, index) => {
    const target: HTMLElement = list as HTMLElement;
    target.style.top = `${listTopArray[index]}px`;
    target.style.left = '0px';
  });

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

  lists.forEach((list) => {
    const target: HTMLElement = list as HTMLElement;
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
      }
    });
    target.addEventListener('mouseup', function (e: any) {
      const currentTarget: HTMLElement = e.currentTarget;
      currentTarget.style.left = '0px';
      currentTarget.classList.remove('grabbing');
    });
    target.addEventListener('mouseout', function (e: any) {
      const currentTarget: HTMLElement = e.currentTarget;
      currentTarget.classList.remove('grabbing');
    });
  });
});
