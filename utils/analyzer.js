module.exports = (is, index, data, answerer) => {
  let analyzer = data;
  const name = ["A", "B", "C", "D", "E", "F"];
  const divider = is == "mces" ? 5 : 4;
  const watchTemp = JSON.stringify(analyzer.watcher);
  const reduceTemp = JSON.stringify(analyzer.reducer);
  if (analyzer.reducer[0].length > 0 && analyzer.reducer[0].includes(index)) {
    const idx = analyzer.reducer[0].findIndex((i) => i === index);
    const indexa =
      (idx + 1) % 3 == 0 ? idx - 2 : (idx + 1) % 3 == 2 ? idx - 1 : idx;
    analyzer.reducer[0].splice(indexa, 3);
    analyzer.reducer[1].splice(indexa, 3);
    analyzer.watcher = [...Array(4)].map((_, i) =>
      Object.fromEntries([...Array(divider)].map((n, i) => [i.toString(), ""]))
    );
  }
  const modFilter = (mod) =>
    answerer.filter((r, i) => (i + 1) % divider === mod);
  const lessFilter = (less) =>
    answerer.filter(
      (r, i) => (i + 1) / divider > less && (i + 1) / divider <= less + 1
    );
  const rightData = () => [
    [
      ...[...Array(divider - 2)].map((_, i) => i + 1),
      ...[...Array(divider - 3)].map((_, i) => divider * (i + 1) + 1),
    ],
    [
      ...[...Array(divider - 2)].map((_, i) => divider * (divider - i)),
      ...[...Array(divider - 3)].map((_, i) => divider ** 2 - (i + 1)),
    ],
  ];
  const leftData = () => [
    [
      ...[...Array(divider - 2)].map((_, i) => divider - i),
      ...[...Array(divider - 3)].map((_, i) => divider * (i + 2)),
    ],
    [
      ...[...Array(divider - 2)].map(
        (_, i) => divider * (divider - (i + 1)) + 1
      ),
      ...[...Array(divider - 3)].map((_, i) => divider * (divider - 1) + i + 2),
    ],
  ];
  const pad = (is, start, stop, step) => [
    ...[...Array((stop - start) / step + 1)].map((_, i) =>
      is == "idx" ? start + step * i : answerer[start + step * i - 1]
    ),
    ...[...Array(divider - ((stop - start) / step + 1))].map((_, i) =>
      is == "idx" ? 0 : "JC"
    ),
  ];
  const beta = JSON.parse(watchTemp);
  const temp = watchTemp.length > JSON.stringify(analyzer.watcher).length;
  const indexa =
    JSON.parse(reduceTemp)[1][
      JSON.parse(reduceTemp)[0].findIndex((i) => i === index)
    ];
  const analyze = (tempMaker, idx, id, nameId) => {
    if (!tempMaker.some((m) => analyzer.reducer[0].includes(m))) {
      analyzer.reducer[0].push(...tempMaker);
      analyzer.reducer[1].push(
        ...[
          [idx, id],
          [idx, id],
          [idx, id],
        ]
      );
      analyzer.watcher[idx][id] = name[nameId];
    }
    for (const i in beta) {
      for (const j of Object.keys(beta[i])) {
        if (
          beta[i][j] !== analyzer.watcher[i][j] &&
          analyzer.watcher[i][j] === "" &&
          watchTemp.length !== JSON.stringify(analyzer.watcher).length
        )
          analyzer.watcher[i][j] = beta[i][j];
        if (indexa) {
          if (temp) analyzer.watcher[indexa[0]][indexa[1]] = "";
        }
      }
    }
  };
  for (let i = 0; i < divider; i++) {
    for (let j = 0; j < divider - 2; j++) {
      for (let k = 0; k < name.length; k++) {
        if (
          modFilter(i)
            .slice(j, j + 3)
            .every((e) => e == name[k])
        )
          analyze(
            [...Array(3)].map((_, l) =>
              i == 0 ? divider * (l + j + 1) + divider : divider * (l + j) + i
            ),
            0,
            i == 0 ? (divider - 1).toString() : (i - 1).toString(),
            k
          );
        if (
          lessFilter(i)
            .slice(j, j + 3)
            .every((e) => e == name[k])
        )
          analyze(
            [...Array(3)].map((_, l) => i * divider + (l + j + 1)),
            1,
            i.toString(),
            k
          );
      }
    }
  }
  for (let i = 0; i < (is === "mces" ? divider : divider - 1); i++) {
    for (let j = 0; j < divider - 2; j++) {
      for (let k = 0; k < name.length; k++) {
        if (
          pad("ans", rightData()[0][i], rightData()[1][i], divider + 1)
            .slice(j, j + 3)
            .every((e) => e == name[k])
        )
          analyze(
            pad("idx", rightData()[0][i], rightData()[1][i], divider + 1).slice(
              j,
              j + 3
            ),
            2,
            i.toString(),
            k
          );
        if (
          pad("ans", leftData()[0][i], leftData()[1][i], divider - 1)
            .slice(j, j + 3)
            .every((e) => e == name[k])
        )
          analyze(
            pad("idx", leftData()[0][i], leftData()[1][i], divider - 1).slice(
              j,
              j + 3
            ),
            3,
            i.toString(),
            k
          );
      }
    }
  }

  const decision = (a, b) => {
    const compare = (c, d) => c.split("").find((i, idx) => c[idx] !== d[idx]);
    const filter = (e) =>
      JSON.stringify(e.split("").filter((i, idx) => name.includes(i)));
    if (a.length > b.length)
      return { before: "", after: compare(a, `${b}$`), val: 1 };
    else if (a.length < b.length)
      return { before: compare(b, `${a}$`), after: "", val: -1 };
    else
      return {
        before: compare(filter(b), filter(a)),
        after: compare(filter(a), filter(b)),
        val: 0,
      };
  };

  let dec = null;
  if (watchTemp !== JSON.stringify(analyzer.watcher)) {
    dec = decision(JSON.stringify(analyzer.watcher), watchTemp);
  }
  return { dec, newData: analyzer };
};
