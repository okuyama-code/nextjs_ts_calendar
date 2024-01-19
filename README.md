## githubリポジトリ
https://github.com/okuyama-code/nextjs_ts_calendar

## windows パス
```
cd ~/dev/happiness/nextjs_ts_calendar && code .
```

## 仕様github
https://github.com/happiness-chain/practice/blob/main/17_Nextjs/001_%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC%E3%82%92%E4%BD%9C%E3%82%8B.md

## 必須機能
デフォルトで今月のカレンダーが表示される
前月・翌月のボタンで表示を切り替えることができる
今日の日付にマークがついている(Google Calendarと同じ)
週表示・月表示の切り替えができる
予定を作成できる(モーダルを実装)。予定の属性はタイトルと日付のみでよい。時間は不要。
予定を編集できる。(編集はタイトルのみでOK)
予定を削除できる。
作成した予定がカレンダーに表示される。月にも週にも。

## カレンダーのコンソール結果
### 現在の日時情報を取得します。
- new Date()
```yaml
 Fri Jan 19 2024 04:33:53 GMT+0900 (GMT+09:00)
```
この表示は、曜日（Fri＝金曜日）、月（Jan＝1月）、日（19日）、年（2024年）、時刻（04:33:53）、およびタイムゾーン情報（GMT+0900）を含んでいます。


### 今月の1日の日時
const firstDayOfMonth = startOfMonth(currentDate);
Mon Jan 01 2024 00:00:00 GMT+0900 (GMT+09:00)

###　今月の最後の日時
  const lastDayOfMonth = endOfMonth(currentDate);
Wed Jan 31 2024 23:59:59 GMT+0900 (GMT+09:00)

## daysInMonth　月のすべて日時を配列で取得
```tsx
// 現在の月の最後の日を取得します。
const lastDayOfMonth = endOfMonth(currentDate);

// firstDayOfMonth から lastDayOfMonth までの日付を eachDayOfInterval 関数を使用して取得します。
const daysInMonth = eachDayOfInterval({
  start: firstDayOfMonth,
  end: lastDayOfMonth,
});

// daysInMonth には、現在の月の最初から最後までの日付が含まれています。

// 取得した日付をコンソールに表示して確認します。
console.log(daysInMonth);
```

###  月の最初の日の曜日を取得します。

// getDay 関数は、日曜日から土曜日までの数値を返します。
// 例えば、日曜日は 0、月曜日は 1、...、土曜日は 6 となります。
const startingDayIndex = getDay(firstDayOfMonth);
2024年１月は１なので月曜日


### イベント追加メソッド
```jsx
// eventsByDateは、eventsを日付ごとにグループ化したオブジェクトです。
// キーは日付（yyyy-MM-dd形式）で、値はその日付に関連付けられたイベントの配列です。
const eventsByDate = useMemo(() => {
  // eventsをreduceメソッドを使用して、日付ごとにグループ化します。
  return events.reduce((acc: { [key: string]: Event[] }, event) => {
    // イベントの日付を"yyyy-MM-dd"形式の文字列にフォーマットします。
    const dateKey = format(event.date, "yyyy-MM-dd");

    // accオブジェクトに、日付がキーとして存在しない場合、新たな配列を割り当てます。
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    // グループに対応する日付の配列にイベントを追加します。
    acc[dateKey].push(event);

    // 累積のオブジェクトを次のステップに渡します。
    return acc;
  }, {}); // reduceメソッドの初期値として空のオブジェクトを渡します。
}, [events]); // eventsが変更されたときだけ再計算されるように依存配列にeventsを指定します。
```
