const tab = document.querySelectorAll('#tab');
const tabMenu = document.querySelector('.nav');
const list = document.querySelector('#list')
const btn = document.querySelector('.btn');
const loading = document.querySelector('#loading');


// 콘텐츠 탭 구현, 각 탭 선택되면 선택된 탭 class 적용, 각 콘텐츠 노출시에 로딩이미지 1초
// 각 탭 누를때마다 해당 JSON 사용 결과표시, 가져온 데이터 list에 노출, 제목,링크이미지,CP 표시
// 10개씩 보여주고 더보기 클릭시 10개 추가 및 로딩 이미지

let startNum = 0;
let endNum = 10;
let str = ``;
let currentContents = [];
let listWrapper = document.createElement('div');
listWrapper.className = 'listWrapper';


list.prepend(listWrapper);
loading.style.visibility = 'hidden';


const addContents = (contents, startNum, endNum) => {
    str = '';
    for (let i = startNum; i < endNum ; i++) {
        if (contents[i]) {
            str += `<div>
            <img src='${contents[i].img}'>
            <h3>${contents[i].title}</h3>
            <div>${contents[i].cp}</div>
            </div>`
        }
    }
    return str;
}

const clickBtn = () => {
    startNum += 10;
    endNum += 10;
    loadingImg();
    setTimeout(function() {
        listWrapper.innerHTML += addContents(currentContents, startNum, endNum);
    }, 1000);
}

const resetState = () => {
    str = '';
    startNum = 0;
    endNum = 10;
    listWrapper.innerHTML = ''
    loadingImg();
}

const loadingImg = () => {
    loading.style.visibility = 'visible';
    setTimeout(function() {
        loading.style.visibility = 'hidden';
    }, 1000);
}

const activeClass = () => {
    for(let i = 0 ; i < tabMenu.childElementCount; i++) {
        tabMenu.children[i].classList.remove('active');
    }
}

function init() {
    tab.forEach(function(item) {
        item.addEventListener('click' , (event) => {
            activeClass();
            event.currentTarget.classList.add('active');
            if (event.currentTarget.className == 'recent active') {
                currentContents = [...recentContents];
                resetState()
                setTimeout(() => {
                    listWrapper.innerHTML = addContents(recentContents, startNum, endNum);
                }, 1000);
            }
            else if (event.currentTarget.className == 'popular active') {
                currentContents = [...popularContents];
                resetState()
                setTimeout(() => {
                    listWrapper.innerHTML = addContents(popularContents, startNum, endNum);
                }, 1000);
            }
            else if (event.currentTarget.className == 'view active') {
                currentContents = [...viewContents];
                resetState()
                setTimeout(() => {
                    listWrapper.innerHTML = addContents(viewContents, startNum, endNum);
                }, 1000);
            }
        });
    })
}

init();
btn.addEventListener('click', clickBtn);