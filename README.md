# 나만의 버킷리스트 
* 일정 : 2022.05.20 ~ 2022.05.26
* 사용 기술 : React, Redux, styled-component

## 메인
> <img src=https://user-images.githubusercontent.com/102746846/170443501-93679a3f-c55d-4947-9efa-fd43582cc5b1.png height=500 />
### 1. Progress bar
* 배경이될 div 위에 진행도를 나타낼 div를 겹쳐서 구현
* useSelector()를 이용해서 완료 여부를 받아온 뒤, (완료 / 전체)로 진행도 계산
* `transition: 1s width;` 속성을 주어서 width 값이 변하면 진행도가 스르륵 올라감

```javascript
// Progress.js
...
const bucketList = useSelector((state) => state.bucket.list);
let completedCount = 0;
bucketList.map((item, index) => {
    if (item.completed === true) completedCount++;
});
const progress = (completedCount / bucketList.length) * 100;
...
```
* 위에 겹쳐진 Highlight div는 진행도에 따라 width가 변경됨.
    
```javascript
// Progress.js
...
<Highlight width={progress + "%"} />
...
```
    
### 2. 버킷리스트
* firebase → redux → BucketList.js (myLists) 데이터로 map을 이용해서 컴포넌트 생성
* 클릭 시 url 파라미터가 적용된 상세페이지로 이동

```javascript
// BucketList.js
...
{myLists.map((list, index) => {
  return (
    <ItemStyle
      completed={list.completed}
      className="listItem"
      key={index}
      onClick={() => {
        history.push("/detail/" + index);
      }}
    >
    {list.text}
  </ItemStyle>
...
```

### 3. 버킷리스트 추가하기
* 텍스트 입력 → useRef()로 text 변수에 저장
```javascript
// App.js
...
const text = useRef(null);
...
<input type="text" ref={text} onKeyPress={onPressEnter} />
...
```

* addBucketFB (bucket.js) → firebase에 데이터 추가 → dispatch → reducer
* 빈 문자열은 입력 불가
* 입력 완료 후 input 빈칸으로 리셋
   
```javascript
// App.js
...
const addBucket = () => {
  if (text.current.value === "") return;
  dispatch(addBucketFB({ text: text.current.value, completed: false }));
  text.current.value = "";
};
...
```

----

## 상세페이지
> <img src=https://user-images.githubusercontent.com/102746846/170443508-9b4c70ae-884b-4db1-891d-e34a56c25fc9.png height=500/>
> <img src=https://user-images.githubusercontent.com/102746846/170443514-e73a358c-5e6c-44ef-9f7d-f4ff034e7d0f.png height=500/>

### 1. 버킷리스트 내용
* 메인 → 상세로 이동 시, index를 파라미터로 넘겨주기 때문에, useParams()를 이용해 해당 인덱스의 데이터를 보여줌

```javascript
// Detail.js
...
const params = useParams();
const bucketIndex = params.index;
const myLists = useSelector((state) => state.bucket.list);
...
```

* 버킷리스트의 완료 여부에 따라 CSS 변경됨

```javascript
// Detail.js
...
<Title completed={myList.completed}>
  {myList.text}
</Title>
...
const Title = styled.h2`
  color: ${(props) => (props.completed ? "#8d8d8d" : null)};
  text-decoration: ${(props) => (props.completed ? "line-through" : null)};
`;
...
```

### 2. 완료하기
* 버킷리스트의 완료 여부에 따라 완료 or 취소하기 버튼으로 변경

```javascript
// Detail.js
...
{myList.completed === true ? (
  <button onClick={() => {
      dispatch(updateBucketFB(myLists[bucketIndex]));}}>
    ❌ 취소하기
  </button>) 
  : (
  <button onClick={() => {
      dispatch(updateBucketFB(myLists[bucketIndex]));}}>
    ✔️ 완료하기
  </button>
)}
...
```

* 두 버튼 모두 버킷리스트의 completed 값을 반대로 변경해줌

```
// bucket.js
...
export const updateBucketFB = (bucket) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "bucket", bucket.id);

    if (bucket.completed === false) {
      await updateDoc(docRef, { completed: true });
    } else {
      await updateDoc(docRef, { completed: false });
    }

    const _bucketList = getState().bucket.list;
    const bucketIndex = _bucketList.findIndex((item) => {
      return item.id === bucket.id;
    });
    dispatch(updateBucket(bucketIndex));
  };
};
...
```
### 3. 삭제하기
* 클릭 시 데이터 삭제되고, 뒤로가기
* react-router-dom: 5.2.1
```javascript
<button
  onClick={() => {
    dispatch(deleteBucketFB(myLists[bucketIndex].id));
    history.goBack();
  }}
>
  🗑 삭제하기
</button>
```
### 4. 뒤로가기
* 클릭 시 그냥 뒤로 이동됨
```javascript
<button
  onClick={() => {
    history.goBack();
  }}
>
  ⌫ 뒤로가기
</button>
```


