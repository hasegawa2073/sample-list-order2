"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const todo = document.querySelector('.todo__ul');
    let lists = document.querySelectorAll('.todo__li');
    const heightArray = new Array();
    const listTopArray = new Array();
    lists.forEach((list) => {
        const target = list;
        const height = target.clientHeight;
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
            const target = list;
            target.style.top = `${listTopArray[index]}px`;
            target.style.left = '0px';
        });
    };
    arrangementList();
    // マウスが入ってきた位置の変数
    let startMouseX;
    let startMouseY;
    // マウスを動かしているときのマウスの位置の変数
    let currentMouseX;
    let currentMouseY;
    // マウスの移動距離の変数
    let moveMouseX;
    let moveMouseY;
    // 移動前のリストの座標
    let startTargetX;
    let startTargetY;
    // 渡ってきたリストの配列をtopの値順にして返す関数 (見た目とDOMの順番を揃えるための関数)
    const topOrderListArrayFactory = (listArray) => {
        const topOrderListArray = new Array();
        const topKeyListMap = new Map();
        listArray.forEach((list) => {
            const top = parseInt(list.style.top);
            topKeyListMap.set(list, top);
        });
        // topの値順に並べ替え(昇順)
        const topOrderListMap = new Map([...topKeyListMap].sort((a, b) => a[1] - b[1]));
        for (const [key] of topOrderListMap) {
            topOrderListArray.push(key);
        }
        return topOrderListArray;
    };
    lists.forEach((list, index, array) => {
        const target = list;
        target.addEventListener('mousedown', function (e) {
            const currentTarget = e.currentTarget;
            startMouseX = e.clientX;
            startMouseY = e.clientY;
            startTargetX = parseInt(currentTarget.style.left);
            startTargetY = parseInt(currentTarget.style.top);
            currentTarget.classList.add('grabbing');
        });
        target.addEventListener('mousemove', function (e) {
            const currentTarget = e.currentTarget;
            currentMouseX = e.clientX;
            currentMouseY = e.clientY;
            moveMouseX = currentMouseX - startMouseX;
            moveMouseY = currentMouseY - startMouseY;
            arrangementList();
            // リストを掴んだままマウスを移動しているとき
            if (currentTarget.classList.contains('grabbing')) {
                const moveTargetX = moveMouseX;
                const moveTargetY = startTargetY + moveMouseY;
                target.style.left = `${moveTargetX}px`;
                target.style.top = `${moveTargetY}px`;
                // リストの見た目の順番とDOMの順番を揃える
                topOrderListArrayFactory(array).forEach((list) => {
                    todo?.append(list);
                });
            }
        });
        target.addEventListener('mouseup', function (e) {
            const currentTarget = e.currentTarget;
            currentTarget.style.left = '0px';
            currentTarget.classList.remove('grabbing');
            arrangementList();
        });
        target.addEventListener('mouseout', function (e) {
            const currentTarget = e.currentTarget;
            currentTarget.classList.remove('grabbing');
            arrangementList();
        });
    });
});
