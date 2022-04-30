const tab = document.querySelectorAll('#tab');
const tabMenu = document.querySelector('.nav');
const list = document.querySelector('#list')
const btn = document.querySelector('.btn');
const loading = document.querySelector('#loading');


// 콘텐츠 탭 구현, 각 탭 선택되면 선택된 탭 class 적용, 각 콘텐츠 노출시에 로딩이미지 1초
// 각 탭 누를때마다 해당 JSON 사용 결과표시, 가져온 데이터 list에 노출, 제목,링크이미지,CP 표시
// 10개씩 보여주고 더보기 클릭시 10개 추가 및 로딩 이미지 = 마지막 차일드에 로딩 추가 삭제

let startNum = 0;
let endNum = 10;
let str = ``;
let currentContents = [];
let listWrapper = document.createElement('div');
let isEnd = false;
listWrapper.className = 'listWrapper';

list.prepend(listWrapper);
loading.style.visibility = 'hidden';


function addContents(contents, startNum, endNum) {
    str = '';
    for (let i = startNum; i < endNum ; i++) {
        if (contents[i]) {
            str += `<div>
            <img src='${contents[i].img}'>
            <div>${contents[i].title}</div>
            <div>${contents[i].cp}</div>
            </div>`
        }
    }
    return str;
}

function clickBtn() {
    startNum += 10;
    endNum += 10;
    loadingImg();
    setTimeout(function() {
        listWrapper.innerHTML += addContents(currentContents, startNum, endNum);
    }, 1000);
}

btn.addEventListener('click', clickBtn);

tab.forEach(function(item) {
    item.addEventListener('click' , function(event) {
        for(let i = 0 ; i < tabMenu.childElementCount; i++) {
            tabMenu.children[i].classList.remove('active');
        }
        event.currentTarget.classList.add('active');
        if (event.currentTarget.className == 'recent active') {
            currentContents = recentContents;
            str = '';
            startNum = 0;
            endNum = 10;
            listWrapper.innerHTML = ''
            loadingImg();
            setTimeout(function() {
                listWrapper.innerHTML = addContents(recentContents, startNum, endNum);
            }, 1000);
        }
        else if (event.currentTarget.className == 'popular active') {
            currentContents = popularContents;
            str = '';
            startNum = 0;
            endNum = 10;
            listWrapper.innerHTML = ''
            loadingImg();
            setTimeout(function() {
                listWrapper.innerHTML = addContents(popularContents, startNum, endNum);
            }, 1000);
        }
        else if (event.currentTarget.className == 'view active') {
            currentContents = viewContents;
            str = '';
            startNum = 0;
            endNum = 10;
            listWrapper.innerHTML = ''
            loadingImg();
            setTimeout(function() {
                listWrapper.innerHTML = addContents(viewContents, startNum, endNum);
            }, 1000);
        }
    });
})


function loadingImg() {
    loading.style.visibility = 'visible';
    setTimeout(function() {
        loading.style.visibility = 'hidden';
    }, 1000);
}