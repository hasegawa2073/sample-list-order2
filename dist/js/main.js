"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const todo = document.querySelector('.todo__ul');
    const lists = document.querySelectorAll('.todo__li');
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
    // リストそれぞれにtopの値を割り当てる
    lists.forEach((list, index) => {
        const target = list;
        target.style.top = `${listTopArray[index]}px`;
    });
    lists.forEach((list) => {
        const target = list;
        target.addEventListener('mousedown', function (e) {
            const currentTarget = e.currentTarget;
            currentTarget.classList.add('grabbing');
        });
        target.addEventListener('mouseup', function (e) {
            const currentTarget = e.currentTarget;
            currentTarget.classList.remove('grabbing');
        });
        target.addEventListener('mouseout', function (e) {
            const currentTarget = e.currentTarget;
            currentTarget.classList.remove('grabbing');
        });
    });
});
