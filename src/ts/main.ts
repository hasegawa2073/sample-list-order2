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
  // リストそれぞれにtopの値を割り当てる
  lists.forEach((list, index) => {
    const target: HTMLElement = list as HTMLElement;
    target.style.top = `${listTopArray[index]}px`;
  });
});
