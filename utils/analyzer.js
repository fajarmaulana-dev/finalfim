module.exports = (is, index, data, answerer) => {
  let analyzer = data;
  const name = ["A", "B", "C", "D", "E"];
  const divider = is == "mces" ? 5 : 4;
  const watchTemp = JSON.stringify(analyzer.watcher);
  if (analyzer.reducer[0].length > 0 && analyzer.reducer[0].includes(index)) {
    const idx = analyzer.reducer[0].findIndex((i) => i === index);
    const indexa = (idx + 1) % 3 == 0 ? idx - 2 : (idx + 1) % 3 == 2 ? idx - 1 : idx;
    const current = analyzer.reducer[1][indexa];
    analyzer.watcher[current[0]][current[1]] = "";
    analyzer.reducer[0].splice(indexa, 3);
    analyzer.reducer[1].splice(indexa, 3);
  }
  const modFilter = (mod) => answerer.filter((r, i) => (i + 1) % divider === mod);
  const lessFilter = (less) =>
    answerer.filter((r, i) => (i + 1) / divider > less && (i + 1) / divider <= less + 1);
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
      ...[...Array(divider - 2)].map((_, i) => divider * (divider - (i + 1)) + 1),
      ...[...Array(divider - 3)].map((_, i) => divider * (divider - 1) + i + 2),
    ],
  ];

  const pad = (is, start, stop, step) => [
    ...[...Array((stop - start) / step + 1)].map((_, i) =>
      is == "idx" ? start + step * i : answerer[start + step * i - 1]
    ),
    ...[...Array(divider - ((stop - start) / step + 1))].map((_, i) => (is == "idx" ? 0 : "JC")),
  ];

  const extract = (data, base) => {
    let i = 0;
    const arr = [];
    while (i < divider) {
      let j = data[0][i];
      const child = [];
      while (j <= data[1][i]) {
        child.push(j);
        j += divider + base;
      }
      arr.push(child);
      i++;
    }
    return arr;
  };

  const analyze = (tempMaker, idx, id, nameId) => {
    const floor = (m, param) =>
      Math.floor(m / (divider + 0.1)) == Math.floor(param / (divider + 0.1));
    const bottom = (m, param) => m % divider == param % divider;
    const from = (m, param) =>
      extract(rightData(), 1).some((n) => n.includes(m) && n.includes(param));
    const to = (m, param) =>
      extract(leftData(), -1).some((n) => n.includes(m) && n.includes(param));
    const exist = tempMaker.find((m) => analyzer.reducer[0].includes(m));

    const adder = () => {
      analyzer.reducer[0].push(...tempMaker);
      analyzer.reducer[1].push(
        ...[
          [idx, id],
          [idx, id],
          [idx, id],
        ]
      );
      analyzer.watcher[idx][id] = name[nameId];
    };

    const extraAdder = (inter, rule, indic, arr) => {
      if (
        Math.abs(index - exist) == inter &&
        !tempMaker.every((m) => analyzer.reducer[0].includes(m))
      ) {
        let spl = analyzer.reducer[0].indexOf(exist);
        if (analyzer.reducer[0].some((m) => m == exist - indic && rule(m, exist))) {
          spl = analyzer.reducer[0].indexOf(exist - indic);
        }
        analyzer.reducer[0].splice(spl, 3, ...arr);
        adder();
      }
    };

    if (!tempMaker.some((m) => analyzer.reducer[0].includes(m))) adder();
    else {
      if ([0, 2, 3].includes(idx) && analyzer.reducer[0].some((m) => floor(m, index))) {
        const arr = [...Array(3)].map((_, i) => (index - exist < 0 ? index + i : index - 2 + i));
        extraAdder(3, floor, 1, arr);
      }
      if ([1, 2, 3].includes(idx) && analyzer.reducer[0].some((m) => bottom(m, index))) {
        const arr = [...Array(3)].map((_, i) =>
          index - exist < 0 ? index + i * divider : index + (i - 2) * divider
        );
        extraAdder(3 * divider, bottom, divider, arr);
      }
      if ([0, 1, 2].includes(idx) && analyzer.reducer[0].some((m) => to(m, index))) {
        const arr = [...Array(3)].map((_, i) =>
          index - exist < 0 ? index + i * (divider - 1) : index + (i - 2) * (divider - 1)
        );
        extraAdder(3 * (divider - 1), from, divider - 1, arr);
      }
      if ([0, 1, 3].includes(idx) && analyzer.reducer[0].some((m) => from(m, index))) {
        const arr = [...Array(3)].map((_, i) =>
          index - exist < 0 ? index + i * (divider + 1) : index + (i - 2) * (divider + 1)
        );
        extraAdder(3 * (divider + 1), from, divider + 1, arr);
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
        ) {
          const arr = [...Array(3)].map((_, l) =>
            i == 0 ? divider * (l + j) + divider : divider * (l + j) + i
          );
          const id = i == 0 ? (divider - 1).toString() : (i - 1).toString();
          analyze(arr, 0, id, k);
        }
        if (
          lessFilter(i)
            .slice(j, j + 3)
            .every((e) => e == name[k])
        ) {
          const arr = [...Array(3)].map((_, l) => i * divider + (l + j + 1));
          analyze(arr, 1, i.toString(), k);
        }
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
        ) {
          const padded = pad("idx", rightData()[0][i], rightData()[1][i], divider + 1);
          analyze(padded.slice(j, j + 3), 2, i.toString(), k);
        }
        if (
          pad("ans", leftData()[0][i], leftData()[1][i], divider - 1)
            .slice(j, j + 3)
            .every((e) => e == name[k])
        ) {
          const padded = pad("idx", leftData()[0][i], leftData()[1][i], divider - 1);
          analyze(padded.slice(j, j + 3), 3, i.toString(), k);
        }
      }
    }
  }

  const decision = (a, b) => {
    const compare = (c, d) => c.split("").find((i, idx) => c[idx] !== d[idx]);
    const filter = (e) => JSON.stringify(e.split("").filter((i, idx) => name.includes(i)));
    if (a.length > b.length) return { before: "", after: compare(a, `${b}$`), val: 1 };
    else if (a.length < b.length) return { before: compare(b, `${a}$`), after: "", val: -1 };
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
