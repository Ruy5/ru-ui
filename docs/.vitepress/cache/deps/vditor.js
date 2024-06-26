import {
  __commonJS
} from "./chunk-BUSYA2B4.js";

// node_modules/vditor/dist/index.min.js
var require_index_min = __commonJS({
  "node_modules/vditor/dist/index.min.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Vditor = t() : e.Vditor = t();
    }(exports, () => (() => {
      var e = { 471: (e2) => {
        var t2 = function() {
          this.Diff_Timeout = 1, this.Diff_EditCost = 4, this.Match_Threshold = 0.5, this.Match_Distance = 1e3, this.Patch_DeleteThreshold = 0.5, this.Patch_Margin = 4, this.Match_MaxBits = 32;
        }, n2 = -1;
        t2.Diff = function(e3, t3) {
          return [e3, t3];
        }, t2.prototype.diff_main = function(e3, n3, r2, i) {
          void 0 === i && (i = this.Diff_Timeout <= 0 ? Number.MAX_VALUE : (/* @__PURE__ */ new Date()).getTime() + 1e3 * this.Diff_Timeout);
          var o = i;
          if (null == e3 || null == n3) throw new Error("Null input. (diff_main)");
          if (e3 == n3) return e3 ? [new t2.Diff(0, e3)] : [];
          void 0 === r2 && (r2 = true);
          var a = r2, l = this.diff_commonPrefix(e3, n3), s = e3.substring(0, l);
          e3 = e3.substring(l), n3 = n3.substring(l), l = this.diff_commonSuffix(e3, n3);
          var d = e3.substring(e3.length - l);
          e3 = e3.substring(0, e3.length - l), n3 = n3.substring(0, n3.length - l);
          var c = this.diff_compute_(e3, n3, a, o);
          return s && c.unshift(new t2.Diff(0, s)), d && c.push(new t2.Diff(0, d)), this.diff_cleanupMerge(c), c;
        }, t2.prototype.diff_compute_ = function(e3, r2, i, o) {
          var a;
          if (!e3) return [new t2.Diff(1, r2)];
          if (!r2) return [new t2.Diff(n2, e3)];
          var l = e3.length > r2.length ? e3 : r2, s = e3.length > r2.length ? r2 : e3, d = l.indexOf(s);
          if (-1 != d) return a = [new t2.Diff(1, l.substring(0, d)), new t2.Diff(0, s), new t2.Diff(1, l.substring(d + s.length))], e3.length > r2.length && (a[0][0] = a[2][0] = n2), a;
          if (1 == s.length) return [new t2.Diff(n2, e3), new t2.Diff(1, r2)];
          var c = this.diff_halfMatch_(e3, r2);
          if (c) {
            var u = c[0], p = c[1], m = c[2], f = c[3], h = c[4], v = this.diff_main(u, m, i, o), g = this.diff_main(p, f, i, o);
            return v.concat([new t2.Diff(0, h)], g);
          }
          return i && e3.length > 100 && r2.length > 100 ? this.diff_lineMode_(e3, r2, o) : this.diff_bisect_(e3, r2, o);
        }, t2.prototype.diff_lineMode_ = function(e3, r2, i) {
          var o = this.diff_linesToChars_(e3, r2);
          e3 = o.chars1, r2 = o.chars2;
          var a = o.lineArray, l = this.diff_main(e3, r2, false, i);
          this.diff_charsToLines_(l, a), this.diff_cleanupSemantic(l), l.push(new t2.Diff(0, ""));
          for (var s = 0, d = 0, c = 0, u = "", p = ""; s < l.length; ) {
            switch (l[s][0]) {
              case 1:
                c++, p += l[s][1];
                break;
              case n2:
                d++, u += l[s][1];
                break;
              case 0:
                if (d >= 1 && c >= 1) {
                  l.splice(s - d - c, d + c), s = s - d - c;
                  for (var m = this.diff_main(u, p, false, i), f = m.length - 1; f >= 0; f--) l.splice(s, 0, m[f]);
                  s += m.length;
                }
                c = 0, d = 0, u = "", p = "";
            }
            s++;
          }
          return l.pop(), l;
        }, t2.prototype.diff_bisect_ = function(e3, r2, i) {
          for (var o = e3.length, a = r2.length, l = Math.ceil((o + a) / 2), s = l, d = 2 * l, c = new Array(d), u = new Array(d), p = 0; p < d; p++) c[p] = -1, u[p] = -1;
          c[s + 1] = 0, u[s + 1] = 0;
          for (var m = o - a, f = m % 2 != 0, h = 0, v = 0, g = 0, y = 0, b = 0; b < l && !((/* @__PURE__ */ new Date()).getTime() > i); b++) {
            for (var w = -b + h; w <= b - v; w += 2) {
              for (var E = s + w, k = (C = w == -b || w != b && c[E - 1] < c[E + 1] ? c[E + 1] : c[E - 1] + 1) - w; C < o && k < a && e3.charAt(C) == r2.charAt(k); ) C++, k++;
              if (c[E] = C, C > o) v += 2;
              else if (k > a) h += 2;
              else if (f) {
                if ((T = s + m - w) >= 0 && T < d && -1 != u[T]) {
                  if (C >= (L = o - u[T])) return this.diff_bisectSplit_(e3, r2, C, k, i);
                }
              }
            }
            for (var S = -b + g; S <= b - y; S += 2) {
              for (var L, T = s + S, M = (L = S == -b || S != b && u[T - 1] < u[T + 1] ? u[T + 1] : u[T - 1] + 1) - S; L < o && M < a && e3.charAt(o - L - 1) == r2.charAt(a - M - 1); ) L++, M++;
              if (u[T] = L, L > o) y += 2;
              else if (M > a) g += 2;
              else if (!f) {
                if ((E = s + m - S) >= 0 && E < d && -1 != c[E]) {
                  var C;
                  k = s + (C = c[E]) - E;
                  if (C >= (L = o - L)) return this.diff_bisectSplit_(e3, r2, C, k, i);
                }
              }
            }
          }
          return [new t2.Diff(n2, e3), new t2.Diff(1, r2)];
        }, t2.prototype.diff_bisectSplit_ = function(e3, t3, n3, r2, i) {
          var o = e3.substring(0, n3), a = t3.substring(0, r2), l = e3.substring(n3), s = t3.substring(r2), d = this.diff_main(o, a, false, i), c = this.diff_main(l, s, false, i);
          return d.concat(c);
        }, t2.prototype.diff_linesToChars_ = function(e3, t3) {
          var n3 = [], r2 = {};
          function i(e4) {
            for (var t4 = "", i2 = 0, a2 = -1, l = n3.length; a2 < e4.length - 1; ) {
              -1 == (a2 = e4.indexOf("\n", i2)) && (a2 = e4.length - 1);
              var s = e4.substring(i2, a2 + 1);
              (r2.hasOwnProperty ? r2.hasOwnProperty(s) : void 0 !== r2[s]) ? t4 += String.fromCharCode(r2[s]) : (l == o && (s = e4.substring(i2), a2 = e4.length), t4 += String.fromCharCode(l), r2[s] = l, n3[l++] = s), i2 = a2 + 1;
            }
            return t4;
          }
          n3[0] = "";
          var o = 4e4, a = i(e3);
          return o = 65535, { chars1: a, chars2: i(t3), lineArray: n3 };
        }, t2.prototype.diff_charsToLines_ = function(e3, t3) {
          for (var n3 = 0; n3 < e3.length; n3++) {
            for (var r2 = e3[n3][1], i = [], o = 0; o < r2.length; o++) i[o] = t3[r2.charCodeAt(o)];
            e3[n3][1] = i.join("");
          }
        }, t2.prototype.diff_commonPrefix = function(e3, t3) {
          if (!e3 || !t3 || e3.charAt(0) != t3.charAt(0)) return 0;
          for (var n3 = 0, r2 = Math.min(e3.length, t3.length), i = r2, o = 0; n3 < i; ) e3.substring(o, i) == t3.substring(o, i) ? o = n3 = i : r2 = i, i = Math.floor((r2 - n3) / 2 + n3);
          return i;
        }, t2.prototype.diff_commonSuffix = function(e3, t3) {
          if (!e3 || !t3 || e3.charAt(e3.length - 1) != t3.charAt(t3.length - 1)) return 0;
          for (var n3 = 0, r2 = Math.min(e3.length, t3.length), i = r2, o = 0; n3 < i; ) e3.substring(e3.length - i, e3.length - o) == t3.substring(t3.length - i, t3.length - o) ? o = n3 = i : r2 = i, i = Math.floor((r2 - n3) / 2 + n3);
          return i;
        }, t2.prototype.diff_commonOverlap_ = function(e3, t3) {
          var n3 = e3.length, r2 = t3.length;
          if (0 == n3 || 0 == r2) return 0;
          n3 > r2 ? e3 = e3.substring(n3 - r2) : n3 < r2 && (t3 = t3.substring(0, n3));
          var i = Math.min(n3, r2);
          if (e3 == t3) return i;
          for (var o = 0, a = 1; ; ) {
            var l = e3.substring(i - a), s = t3.indexOf(l);
            if (-1 == s) return o;
            a += s, 0 != s && e3.substring(i - a) != t3.substring(0, a) || (o = a, a++);
          }
        }, t2.prototype.diff_halfMatch_ = function(e3, t3) {
          if (this.Diff_Timeout <= 0) return null;
          var n3 = e3.length > t3.length ? e3 : t3, r2 = e3.length > t3.length ? t3 : e3;
          if (n3.length < 4 || 2 * r2.length < n3.length) return null;
          var i = this;
          function o(e4, t4, n4) {
            for (var r3, o2, a2, l2, s2 = e4.substring(n4, n4 + Math.floor(e4.length / 4)), d2 = -1, c2 = ""; -1 != (d2 = t4.indexOf(s2, d2 + 1)); ) {
              var u2 = i.diff_commonPrefix(e4.substring(n4), t4.substring(d2)), p2 = i.diff_commonSuffix(e4.substring(0, n4), t4.substring(0, d2));
              c2.length < p2 + u2 && (c2 = t4.substring(d2 - p2, d2) + t4.substring(d2, d2 + u2), r3 = e4.substring(0, n4 - p2), o2 = e4.substring(n4 + u2), a2 = t4.substring(0, d2 - p2), l2 = t4.substring(d2 + u2));
            }
            return 2 * c2.length >= e4.length ? [r3, o2, a2, l2, c2] : null;
          }
          var a, l, s, d, c, u = o(n3, r2, Math.ceil(n3.length / 4)), p = o(n3, r2, Math.ceil(n3.length / 2));
          return u || p ? (a = p ? u && u[4].length > p[4].length ? u : p : u, e3.length > t3.length ? (l = a[0], s = a[1], d = a[2], c = a[3]) : (d = a[0], c = a[1], l = a[2], s = a[3]), [l, s, d, c, a[4]]) : null;
        }, t2.prototype.diff_cleanupSemantic = function(e3) {
          for (var r2 = false, i = [], o = 0, a = null, l = 0, s = 0, d = 0, c = 0, u = 0; l < e3.length; ) 0 == e3[l][0] ? (i[o++] = l, s = c, d = u, c = 0, u = 0, a = e3[l][1]) : (1 == e3[l][0] ? c += e3[l][1].length : u += e3[l][1].length, a && a.length <= Math.max(s, d) && a.length <= Math.max(c, u) && (e3.splice(i[o - 1], 0, new t2.Diff(n2, a)), e3[i[o - 1] + 1][0] = 1, o--, l = --o > 0 ? i[o - 1] : -1, s = 0, d = 0, c = 0, u = 0, a = null, r2 = true)), l++;
          for (r2 && this.diff_cleanupMerge(e3), this.diff_cleanupSemanticLossless(e3), l = 1; l < e3.length; ) {
            if (e3[l - 1][0] == n2 && 1 == e3[l][0]) {
              var p = e3[l - 1][1], m = e3[l][1], f = this.diff_commonOverlap_(p, m), h = this.diff_commonOverlap_(m, p);
              f >= h ? (f >= p.length / 2 || f >= m.length / 2) && (e3.splice(l, 0, new t2.Diff(0, m.substring(0, f))), e3[l - 1][1] = p.substring(0, p.length - f), e3[l + 1][1] = m.substring(f), l++) : (h >= p.length / 2 || h >= m.length / 2) && (e3.splice(l, 0, new t2.Diff(0, p.substring(0, h))), e3[l - 1][0] = 1, e3[l - 1][1] = m.substring(0, m.length - h), e3[l + 1][0] = n2, e3[l + 1][1] = p.substring(h), l++), l++;
            }
            l++;
          }
        }, t2.prototype.diff_cleanupSemanticLossless = function(e3) {
          function n3(e4, n4) {
            if (!e4 || !n4) return 6;
            var r3 = e4.charAt(e4.length - 1), i2 = n4.charAt(0), o2 = r3.match(t2.nonAlphaNumericRegex_), a2 = i2.match(t2.nonAlphaNumericRegex_), l2 = o2 && r3.match(t2.whitespaceRegex_), s2 = a2 && i2.match(t2.whitespaceRegex_), d2 = l2 && r3.match(t2.linebreakRegex_), c2 = s2 && i2.match(t2.linebreakRegex_), u2 = d2 && e4.match(t2.blanklineEndRegex_), p2 = c2 && n4.match(t2.blanklineStartRegex_);
            return u2 || p2 ? 5 : d2 || c2 ? 4 : o2 && !l2 && s2 ? 3 : l2 || s2 ? 2 : o2 || a2 ? 1 : 0;
          }
          for (var r2 = 1; r2 < e3.length - 1; ) {
            if (0 == e3[r2 - 1][0] && 0 == e3[r2 + 1][0]) {
              var i = e3[r2 - 1][1], o = e3[r2][1], a = e3[r2 + 1][1], l = this.diff_commonSuffix(i, o);
              if (l) {
                var s = o.substring(o.length - l);
                i = i.substring(0, i.length - l), o = s + o.substring(0, o.length - l), a = s + a;
              }
              for (var d = i, c = o, u = a, p = n3(i, o) + n3(o, a); o.charAt(0) === a.charAt(0); ) {
                i += o.charAt(0), o = o.substring(1) + a.charAt(0), a = a.substring(1);
                var m = n3(i, o) + n3(o, a);
                m >= p && (p = m, d = i, c = o, u = a);
              }
              e3[r2 - 1][1] != d && (d ? e3[r2 - 1][1] = d : (e3.splice(r2 - 1, 1), r2--), e3[r2][1] = c, u ? e3[r2 + 1][1] = u : (e3.splice(r2 + 1, 1), r2--));
            }
            r2++;
          }
        }, t2.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/, t2.whitespaceRegex_ = /\s/, t2.linebreakRegex_ = /[\r\n]/, t2.blanklineEndRegex_ = /\n\r?\n$/, t2.blanklineStartRegex_ = /^\r?\n\r?\n/, t2.prototype.diff_cleanupEfficiency = function(e3) {
          for (var r2 = false, i = [], o = 0, a = null, l = 0, s = false, d = false, c = false, u = false; l < e3.length; ) 0 == e3[l][0] ? (e3[l][1].length < this.Diff_EditCost && (c || u) ? (i[o++] = l, s = c, d = u, a = e3[l][1]) : (o = 0, a = null), c = u = false) : (e3[l][0] == n2 ? u = true : c = true, a && (s && d && c && u || a.length < this.Diff_EditCost / 2 && s + d + c + u == 3) && (e3.splice(i[o - 1], 0, new t2.Diff(n2, a)), e3[i[o - 1] + 1][0] = 1, o--, a = null, s && d ? (c = u = true, o = 0) : (l = --o > 0 ? i[o - 1] : -1, c = u = false), r2 = true)), l++;
          r2 && this.diff_cleanupMerge(e3);
        }, t2.prototype.diff_cleanupMerge = function(e3) {
          e3.push(new t2.Diff(0, ""));
          for (var r2, i = 0, o = 0, a = 0, l = "", s = ""; i < e3.length; ) switch (e3[i][0]) {
            case 1:
              a++, s += e3[i][1], i++;
              break;
            case n2:
              o++, l += e3[i][1], i++;
              break;
            case 0:
              o + a > 1 ? (0 !== o && 0 !== a && (0 !== (r2 = this.diff_commonPrefix(s, l)) && (i - o - a > 0 && 0 == e3[i - o - a - 1][0] ? e3[i - o - a - 1][1] += s.substring(0, r2) : (e3.splice(0, 0, new t2.Diff(0, s.substring(0, r2))), i++), s = s.substring(r2), l = l.substring(r2)), 0 !== (r2 = this.diff_commonSuffix(s, l)) && (e3[i][1] = s.substring(s.length - r2) + e3[i][1], s = s.substring(0, s.length - r2), l = l.substring(0, l.length - r2))), i -= o + a, e3.splice(i, o + a), l.length && (e3.splice(i, 0, new t2.Diff(n2, l)), i++), s.length && (e3.splice(i, 0, new t2.Diff(1, s)), i++), i++) : 0 !== i && 0 == e3[i - 1][0] ? (e3[i - 1][1] += e3[i][1], e3.splice(i, 1)) : i++, a = 0, o = 0, l = "", s = "";
          }
          "" === e3[e3.length - 1][1] && e3.pop();
          var d = false;
          for (i = 1; i < e3.length - 1; ) 0 == e3[i - 1][0] && 0 == e3[i + 1][0] && (e3[i][1].substring(e3[i][1].length - e3[i - 1][1].length) == e3[i - 1][1] ? (e3[i][1] = e3[i - 1][1] + e3[i][1].substring(0, e3[i][1].length - e3[i - 1][1].length), e3[i + 1][1] = e3[i - 1][1] + e3[i + 1][1], e3.splice(i - 1, 1), d = true) : e3[i][1].substring(0, e3[i + 1][1].length) == e3[i + 1][1] && (e3[i - 1][1] += e3[i + 1][1], e3[i][1] = e3[i][1].substring(e3[i + 1][1].length) + e3[i + 1][1], e3.splice(i + 1, 1), d = true)), i++;
          d && this.diff_cleanupMerge(e3);
        }, t2.prototype.diff_xIndex = function(e3, t3) {
          var r2, i = 0, o = 0, a = 0, l = 0;
          for (r2 = 0; r2 < e3.length && (1 !== e3[r2][0] && (i += e3[r2][1].length), e3[r2][0] !== n2 && (o += e3[r2][1].length), !(i > t3)); r2++) a = i, l = o;
          return e3.length != r2 && e3[r2][0] === n2 ? l : l + (t3 - a);
        }, t2.prototype.diff_prettyHtml = function(e3) {
          for (var t3 = [], r2 = /&/g, i = /</g, o = />/g, a = /\n/g, l = 0; l < e3.length; l++) {
            var s = e3[l][0], d = e3[l][1].replace(r2, "&amp;").replace(i, "&lt;").replace(o, "&gt;").replace(a, "&para;<br>");
            switch (s) {
              case 1:
                t3[l] = '<ins style="background:#e6ffe6;">' + d + "</ins>";
                break;
              case n2:
                t3[l] = '<del style="background:#ffe6e6;">' + d + "</del>";
                break;
              case 0:
                t3[l] = "<span>" + d + "</span>";
            }
          }
          return t3.join("");
        }, t2.prototype.diff_text1 = function(e3) {
          for (var t3 = [], n3 = 0; n3 < e3.length; n3++) 1 !== e3[n3][0] && (t3[n3] = e3[n3][1]);
          return t3.join("");
        }, t2.prototype.diff_text2 = function(e3) {
          for (var t3 = [], r2 = 0; r2 < e3.length; r2++) e3[r2][0] !== n2 && (t3[r2] = e3[r2][1]);
          return t3.join("");
        }, t2.prototype.diff_levenshtein = function(e3) {
          for (var t3 = 0, r2 = 0, i = 0, o = 0; o < e3.length; o++) {
            var a = e3[o][0], l = e3[o][1];
            switch (a) {
              case 1:
                r2 += l.length;
                break;
              case n2:
                i += l.length;
                break;
              case 0:
                t3 += Math.max(r2, i), r2 = 0, i = 0;
            }
          }
          return t3 += Math.max(r2, i);
        }, t2.prototype.diff_toDelta = function(e3) {
          for (var t3 = [], r2 = 0; r2 < e3.length; r2++) switch (e3[r2][0]) {
            case 1:
              t3[r2] = "+" + encodeURI(e3[r2][1]);
              break;
            case n2:
              t3[r2] = "-" + e3[r2][1].length;
              break;
            case 0:
              t3[r2] = "=" + e3[r2][1].length;
          }
          return t3.join("	").replace(/%20/g, " ");
        }, t2.prototype.diff_fromDelta = function(e3, r2) {
          for (var i = [], o = 0, a = 0, l = r2.split(/\t/g), s = 0; s < l.length; s++) {
            var d = l[s].substring(1);
            switch (l[s].charAt(0)) {
              case "+":
                try {
                  i[o++] = new t2.Diff(1, decodeURI(d));
                } catch (e4) {
                  throw new Error("Illegal escape in diff_fromDelta: " + d);
                }
                break;
              case "-":
              case "=":
                var c = parseInt(d, 10);
                if (isNaN(c) || c < 0) throw new Error("Invalid number in diff_fromDelta: " + d);
                var u = e3.substring(a, a += c);
                "=" == l[s].charAt(0) ? i[o++] = new t2.Diff(0, u) : i[o++] = new t2.Diff(n2, u);
                break;
              default:
                if (l[s]) throw new Error("Invalid diff operation in diff_fromDelta: " + l[s]);
            }
          }
          if (a != e3.length) throw new Error("Delta length (" + a + ") does not equal source text length (" + e3.length + ").");
          return i;
        }, t2.prototype.match_main = function(e3, t3, n3) {
          if (null == e3 || null == t3 || null == n3) throw new Error("Null input. (match_main)");
          return n3 = Math.max(0, Math.min(n3, e3.length)), e3 == t3 ? 0 : e3.length ? e3.substring(n3, n3 + t3.length) == t3 ? n3 : this.match_bitap_(e3, t3, n3) : -1;
        }, t2.prototype.match_bitap_ = function(e3, t3, n3) {
          if (t3.length > this.Match_MaxBits) throw new Error("Pattern too long for this browser.");
          var r2 = this.match_alphabet_(t3), i = this;
          function o(e4, r3) {
            var o2 = e4 / t3.length, a2 = Math.abs(n3 - r3);
            return i.Match_Distance ? o2 + a2 / i.Match_Distance : a2 ? 1 : o2;
          }
          var a = this.Match_Threshold, l = e3.indexOf(t3, n3);
          -1 != l && (a = Math.min(o(0, l), a), -1 != (l = e3.lastIndexOf(t3, n3 + t3.length)) && (a = Math.min(o(0, l), a)));
          var s, d, c = 1 << t3.length - 1;
          l = -1;
          for (var u, p = t3.length + e3.length, m = 0; m < t3.length; m++) {
            for (s = 0, d = p; s < d; ) o(m, n3 + d) <= a ? s = d : p = d, d = Math.floor((p - s) / 2 + s);
            p = d;
            var f = Math.max(1, n3 - d + 1), h = Math.min(n3 + d, e3.length) + t3.length, v = Array(h + 2);
            v[h + 1] = (1 << m) - 1;
            for (var g = h; g >= f; g--) {
              var y = r2[e3.charAt(g - 1)];
              if (v[g] = 0 === m ? (v[g + 1] << 1 | 1) & y : (v[g + 1] << 1 | 1) & y | (u[g + 1] | u[g]) << 1 | 1 | u[g + 1], v[g] & c) {
                var b = o(m, g - 1);
                if (b <= a) {
                  if (a = b, !((l = g - 1) > n3)) break;
                  f = Math.max(1, 2 * n3 - l);
                }
              }
            }
            if (o(m + 1, n3) > a) break;
            u = v;
          }
          return l;
        }, t2.prototype.match_alphabet_ = function(e3) {
          for (var t3 = {}, n3 = 0; n3 < e3.length; n3++) t3[e3.charAt(n3)] = 0;
          for (n3 = 0; n3 < e3.length; n3++) t3[e3.charAt(n3)] |= 1 << e3.length - n3 - 1;
          return t3;
        }, t2.prototype.patch_addContext_ = function(e3, n3) {
          if (0 != n3.length) {
            if (null === e3.start2) throw Error("patch not initialized");
            for (var r2 = n3.substring(e3.start2, e3.start2 + e3.length1), i = 0; n3.indexOf(r2) != n3.lastIndexOf(r2) && r2.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin; ) i += this.Patch_Margin, r2 = n3.substring(e3.start2 - i, e3.start2 + e3.length1 + i);
            i += this.Patch_Margin;
            var o = n3.substring(e3.start2 - i, e3.start2);
            o && e3.diffs.unshift(new t2.Diff(0, o));
            var a = n3.substring(e3.start2 + e3.length1, e3.start2 + e3.length1 + i);
            a && e3.diffs.push(new t2.Diff(0, a)), e3.start1 -= o.length, e3.start2 -= o.length, e3.length1 += o.length + a.length, e3.length2 += o.length + a.length;
          }
        }, t2.prototype.patch_make = function(e3, r2, i) {
          var o, a;
          if ("string" == typeof e3 && "string" == typeof r2 && void 0 === i) o = e3, (a = this.diff_main(o, r2, true)).length > 2 && (this.diff_cleanupSemantic(a), this.diff_cleanupEfficiency(a));
          else if (e3 && "object" == typeof e3 && void 0 === r2 && void 0 === i) a = e3, o = this.diff_text1(a);
          else if ("string" == typeof e3 && r2 && "object" == typeof r2 && void 0 === i) o = e3, a = r2;
          else {
            if ("string" != typeof e3 || "string" != typeof r2 || !i || "object" != typeof i) throw new Error("Unknown call format to patch_make.");
            o = e3, a = i;
          }
          if (0 === a.length) return [];
          for (var l = [], s = new t2.patch_obj(), d = 0, c = 0, u = 0, p = o, m = o, f = 0; f < a.length; f++) {
            var h = a[f][0], v = a[f][1];
            switch (d || 0 === h || (s.start1 = c, s.start2 = u), h) {
              case 1:
                s.diffs[d++] = a[f], s.length2 += v.length, m = m.substring(0, u) + v + m.substring(u);
                break;
              case n2:
                s.length1 += v.length, s.diffs[d++] = a[f], m = m.substring(0, u) + m.substring(u + v.length);
                break;
              case 0:
                v.length <= 2 * this.Patch_Margin && d && a.length != f + 1 ? (s.diffs[d++] = a[f], s.length1 += v.length, s.length2 += v.length) : v.length >= 2 * this.Patch_Margin && d && (this.patch_addContext_(s, p), l.push(s), s = new t2.patch_obj(), d = 0, p = m, c = u);
            }
            1 !== h && (c += v.length), h !== n2 && (u += v.length);
          }
          return d && (this.patch_addContext_(s, p), l.push(s)), l;
        }, t2.prototype.patch_deepCopy = function(e3) {
          for (var n3 = [], r2 = 0; r2 < e3.length; r2++) {
            var i = e3[r2], o = new t2.patch_obj();
            o.diffs = [];
            for (var a = 0; a < i.diffs.length; a++) o.diffs[a] = new t2.Diff(i.diffs[a][0], i.diffs[a][1]);
            o.start1 = i.start1, o.start2 = i.start2, o.length1 = i.length1, o.length2 = i.length2, n3[r2] = o;
          }
          return n3;
        }, t2.prototype.patch_apply = function(e3, t3) {
          if (0 == e3.length) return [t3, []];
          e3 = this.patch_deepCopy(e3);
          var r2 = this.patch_addPadding(e3);
          t3 = r2 + t3 + r2, this.patch_splitMax(e3);
          for (var i = 0, o = [], a = 0; a < e3.length; a++) {
            var l, s, d = e3[a].start2 + i, c = this.diff_text1(e3[a].diffs), u = -1;
            if (c.length > this.Match_MaxBits ? -1 != (l = this.match_main(t3, c.substring(0, this.Match_MaxBits), d)) && (-1 == (u = this.match_main(t3, c.substring(c.length - this.Match_MaxBits), d + c.length - this.Match_MaxBits)) || l >= u) && (l = -1) : l = this.match_main(t3, c, d), -1 == l) o[a] = false, i -= e3[a].length2 - e3[a].length1;
            else if (o[a] = true, i = l - d, c == (s = -1 == u ? t3.substring(l, l + c.length) : t3.substring(l, u + this.Match_MaxBits))) t3 = t3.substring(0, l) + this.diff_text2(e3[a].diffs) + t3.substring(l + c.length);
            else {
              var p = this.diff_main(c, s, false);
              if (c.length > this.Match_MaxBits && this.diff_levenshtein(p) / c.length > this.Patch_DeleteThreshold) o[a] = false;
              else {
                this.diff_cleanupSemanticLossless(p);
                for (var m, f = 0, h = 0; h < e3[a].diffs.length; h++) {
                  var v = e3[a].diffs[h];
                  0 !== v[0] && (m = this.diff_xIndex(p, f)), 1 === v[0] ? t3 = t3.substring(0, l + m) + v[1] + t3.substring(l + m) : v[0] === n2 && (t3 = t3.substring(0, l + m) + t3.substring(l + this.diff_xIndex(p, f + v[1].length))), v[0] !== n2 && (f += v[1].length);
                }
              }
            }
          }
          return [t3 = t3.substring(r2.length, t3.length - r2.length), o];
        }, t2.prototype.patch_addPadding = function(e3) {
          for (var n3 = this.Patch_Margin, r2 = "", i = 1; i <= n3; i++) r2 += String.fromCharCode(i);
          for (i = 0; i < e3.length; i++) e3[i].start1 += n3, e3[i].start2 += n3;
          var o = e3[0], a = o.diffs;
          if (0 == a.length || 0 != a[0][0]) a.unshift(new t2.Diff(0, r2)), o.start1 -= n3, o.start2 -= n3, o.length1 += n3, o.length2 += n3;
          else if (n3 > a[0][1].length) {
            var l = n3 - a[0][1].length;
            a[0][1] = r2.substring(a[0][1].length) + a[0][1], o.start1 -= l, o.start2 -= l, o.length1 += l, o.length2 += l;
          }
          if (0 == (a = (o = e3[e3.length - 1]).diffs).length || 0 != a[a.length - 1][0]) a.push(new t2.Diff(0, r2)), o.length1 += n3, o.length2 += n3;
          else if (n3 > a[a.length - 1][1].length) {
            l = n3 - a[a.length - 1][1].length;
            a[a.length - 1][1] += r2.substring(0, l), o.length1 += l, o.length2 += l;
          }
          return r2;
        }, t2.prototype.patch_splitMax = function(e3) {
          for (var r2 = this.Match_MaxBits, i = 0; i < e3.length; i++) if (!(e3[i].length1 <= r2)) {
            var o = e3[i];
            e3.splice(i--, 1);
            for (var a = o.start1, l = o.start2, s = ""; 0 !== o.diffs.length; ) {
              var d = new t2.patch_obj(), c = true;
              for (d.start1 = a - s.length, d.start2 = l - s.length, "" !== s && (d.length1 = d.length2 = s.length, d.diffs.push(new t2.Diff(0, s))); 0 !== o.diffs.length && d.length1 < r2 - this.Patch_Margin; ) {
                var u = o.diffs[0][0], p = o.diffs[0][1];
                1 === u ? (d.length2 += p.length, l += p.length, d.diffs.push(o.diffs.shift()), c = false) : u === n2 && 1 == d.diffs.length && 0 == d.diffs[0][0] && p.length > 2 * r2 ? (d.length1 += p.length, a += p.length, c = false, d.diffs.push(new t2.Diff(u, p)), o.diffs.shift()) : (p = p.substring(0, r2 - d.length1 - this.Patch_Margin), d.length1 += p.length, a += p.length, 0 === u ? (d.length2 += p.length, l += p.length) : c = false, d.diffs.push(new t2.Diff(u, p)), p == o.diffs[0][1] ? o.diffs.shift() : o.diffs[0][1] = o.diffs[0][1].substring(p.length));
              }
              s = (s = this.diff_text2(d.diffs)).substring(s.length - this.Patch_Margin);
              var m = this.diff_text1(o.diffs).substring(0, this.Patch_Margin);
              "" !== m && (d.length1 += m.length, d.length2 += m.length, 0 !== d.diffs.length && 0 === d.diffs[d.diffs.length - 1][0] ? d.diffs[d.diffs.length - 1][1] += m : d.diffs.push(new t2.Diff(0, m))), c || e3.splice(++i, 0, d);
            }
          }
        }, t2.prototype.patch_toText = function(e3) {
          for (var t3 = [], n3 = 0; n3 < e3.length; n3++) t3[n3] = e3[n3];
          return t3.join("");
        }, t2.prototype.patch_fromText = function(e3) {
          var r2 = [];
          if (!e3) return r2;
          for (var i = e3.split("\n"), o = 0, a = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; o < i.length; ) {
            var l = i[o].match(a);
            if (!l) throw new Error("Invalid patch string: " + i[o]);
            var s = new t2.patch_obj();
            for (r2.push(s), s.start1 = parseInt(l[1], 10), "" === l[2] ? (s.start1--, s.length1 = 1) : "0" == l[2] ? s.length1 = 0 : (s.start1--, s.length1 = parseInt(l[2], 10)), s.start2 = parseInt(l[3], 10), "" === l[4] ? (s.start2--, s.length2 = 1) : "0" == l[4] ? s.length2 = 0 : (s.start2--, s.length2 = parseInt(l[4], 10)), o++; o < i.length; ) {
              var d = i[o].charAt(0);
              try {
                var c = decodeURI(i[o].substring(1));
              } catch (e4) {
                throw new Error("Illegal escape in patch_fromText: " + c);
              }
              if ("-" == d) s.diffs.push(new t2.Diff(n2, c));
              else if ("+" == d) s.diffs.push(new t2.Diff(1, c));
              else if (" " == d) s.diffs.push(new t2.Diff(0, c));
              else {
                if ("@" == d) break;
                if ("" !== d) throw new Error('Invalid patch mode "' + d + '" in: ' + c);
              }
              o++;
            }
          }
          return r2;
        }, (t2.patch_obj = function() {
          this.diffs = [], this.start1 = null, this.start2 = null, this.length1 = 0, this.length2 = 0;
        }).prototype.toString = function() {
          for (var e3, t3 = ["@@ -" + (0 === this.length1 ? this.start1 + ",0" : 1 == this.length1 ? this.start1 + 1 : this.start1 + 1 + "," + this.length1) + " +" + (0 === this.length2 ? this.start2 + ",0" : 1 == this.length2 ? this.start2 + 1 : this.start2 + 1 + "," + this.length2) + " @@\n"], r2 = 0; r2 < this.diffs.length; r2++) {
            switch (this.diffs[r2][0]) {
              case 1:
                e3 = "+";
                break;
              case n2:
                e3 = "-";
                break;
              case 0:
                e3 = " ";
            }
            t3[r2 + 1] = e3 + encodeURI(this.diffs[r2][1]) + "\n";
          }
          return t3.join("").replace(/%20/g, " ");
        }, e2.exports = t2, e2.exports.diff_match_patch = t2, e2.exports.DIFF_DELETE = n2, e2.exports.DIFF_INSERT = 1, e2.exports.DIFF_EQUAL = 0;
      }, 872: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { default: () => D });
        var r2 = n2(478), i = n2(156), o = n2(314), a = n2(730), l = n2(66), s = n2(218), d = n2(702), c = function(e3) {
          void 0 === e3 && (e3 = document);
          var t3 = function(e4) {
            var t4 = document.createElement("img");
            t4.src = e4.getAttribute("data-src"), t4.addEventListener("load", function() {
              e4.getAttribute("style") || e4.getAttribute("class") || e4.getAttribute("width") || e4.getAttribute("height") || t4.naturalHeight > t4.naturalWidth && t4.naturalWidth / t4.naturalHeight < document.querySelector(".vditor-reset").clientWidth / (window.innerHeight - 40) && t4.naturalHeight > window.innerHeight - 40 && (e4.style.height = window.innerHeight - 40 + "px"), e4.src = t4.src;
            }), e4.removeAttribute("data-src");
          };
          if (!("IntersectionObserver" in window)) return e3.querySelectorAll("img").forEach(function(e4) {
            e4.getAttribute("data-src") && t3(e4);
          }), false;
          window.vditorImageIntersectionObserver ? (window.vditorImageIntersectionObserver.disconnect(), e3.querySelectorAll("img").forEach(function(e4) {
            window.vditorImageIntersectionObserver.observe(e4);
          })) : (window.vditorImageIntersectionObserver = new IntersectionObserver(function(e4) {
            e4.forEach(function(e5) {
              (void 0 === e5.isIntersecting ? 0 !== e5.intersectionRatio : e5.isIntersecting) && e5.target.getAttribute("data-src") && t3(e5.target);
            });
          }), e3.querySelectorAll("img").forEach(function(e4) {
            window.vditorImageIntersectionObserver.observe(e4);
          }));
        }, u = n2(466), p = n2(554), m = n2(40), f = n2(563), h = n2(749), v = n2(818), g = n2(408), y = n2(54), b = n2(227), w = n2(526), E = n2(827), k = n2(640), S = n2(895), L = n2(393), T = function(e3, t3) {
          if (void 0 === t3 && (t3 = "zh_CN"), "undefined" != typeof speechSynthesis && "undefined" != typeof SpeechSynthesisUtterance) {
            var n3 = function() {
              var e4, n4;
              return speechSynthesis.getVoices().forEach(function(r4) {
                r4.lang === t3.replace("_", "-") && (e4 = r4), r4.default && (n4 = r4);
              }), e4 || (e4 = n4), e4;
            }, r3 = '<svg><use xlink:href="#vditor-icon-play"></use></svg>', i2 = '<svg><use xlink:href="#vditor-icon-pause"></use></svg>';
            document.getElementById("vditorIconScript") || (r3 = '<svg viewBox="0 0 32 32"><path d="M3.436 0l25.128 16-25.128 16v-32z"></path></svg>', i2 = '<svg viewBox="0 0 32 32"><path d="M20.617 0h9.128v32h-9.128v-32zM2.255 32v-32h9.128v32h-9.128z"></path></svg>');
            var o2 = document.querySelector(".vditor-speech");
            o2 || ((o2 = document.createElement("button")).className = "vditor-speech", e3.insertAdjacentElement("beforeend", o2), void 0 !== speechSynthesis.onvoiceschanged && (speechSynthesis.onvoiceschanged = n3));
            var a2 = n3(), l2 = new SpeechSynthesisUtterance();
            l2.voice = a2, l2.onend = l2.onerror = function() {
              o2.style.display = "none", speechSynthesis.cancel(), o2.classList.remove("vditor-speech--current"), o2.innerHTML = r3;
            }, e3.addEventListener(void 0 !== window.ontouchstart ? "touchend" : "click", function(t4) {
              var n4 = t4.target;
              if (n4.classList.contains("vditor-speech") || n4.parentElement.classList.contains("vditor-speech")) return o2.classList.contains("vditor-speech--current") ? speechSynthesis.speaking && (speechSynthesis.paused ? (speechSynthesis.resume(), o2.innerHTML = i2) : (speechSynthesis.pause(), o2.innerHTML = r3)) : (l2.text = o2.getAttribute("data-text"), speechSynthesis.speak(l2), o2.classList.add("vditor-speech--current"), o2.innerHTML = i2), (0, L.Hc)(window.vditorSpeechRange), void e3.focus();
              if (o2.style.display = "none", speechSynthesis.cancel(), o2.classList.remove("vditor-speech--current"), o2.innerHTML = r3, 0 !== getSelection().rangeCount) {
                var a3 = getSelection().getRangeAt(0), s2 = a3.toString().trim();
                if (s2) {
                  window.vditorSpeechRange = a3.cloneRange();
                  var d2 = a3.getBoundingClientRect();
                  o2.innerHTML = r3, o2.style.display = "block", o2.style.top = d2.top + d2.height + document.querySelector("html").scrollTop - 20 + "px", void 0 !== window.ontouchstart ? o2.style.left = t4.changedTouches[t4.changedTouches.length - 1].pageX + 2 + "px" : o2.style.left = t4.clientX + 2 + "px", o2.setAttribute("data-text", s2);
                }
              }
            });
          }
        }, M = function(e3, t3, n3, r3) {
          return new (n3 || (n3 = Promise))(function(i2, o2) {
            function a2(e4) {
              try {
                s2(r3.next(e4));
              } catch (e5) {
                o2(e5);
              }
            }
            function l2(e4) {
              try {
                s2(r3.throw(e4));
              } catch (e5) {
                o2(e5);
              }
            }
            function s2(e4) {
              var t4;
              e4.done ? i2(e4.value) : (t4 = e4.value, t4 instanceof n3 ? t4 : new n3(function(e5) {
                e5(t4);
              })).then(a2, l2);
            }
            s2((r3 = r3.apply(e3, t3 || [])).next());
          });
        }, C = function(e3, t3) {
          var n3, r3, i2, o2, a2 = { label: 0, sent: function() {
            if (1 & i2[0]) throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: l2(0), throw: l2(1), return: l2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function l2(o3) {
            return function(l3) {
              return function(o4) {
                if (n3) throw new TypeError("Generator is already executing.");
                for (; a2; ) try {
                  if (n3 = 1, r3 && (i2 = 2 & o4[0] ? r3.return : o4[0] ? r3.throw || ((i2 = r3.return) && i2.call(r3), 0) : r3.next) && !(i2 = i2.call(r3, o4[1])).done) return i2;
                  switch (r3 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                    case 0:
                    case 1:
                      i2 = o4;
                      break;
                    case 4:
                      return a2.label++, { value: o4[1], done: false };
                    case 5:
                      a2.label++, r3 = o4[1], o4 = [0];
                      continue;
                    case 7:
                      o4 = a2.ops.pop(), a2.trys.pop();
                      continue;
                    default:
                      if (!(i2 = a2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                        a2 = 0;
                        continue;
                      }
                      if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                        a2.label = o4[1];
                        break;
                      }
                      if (6 === o4[0] && a2.label < i2[1]) {
                        a2.label = i2[1], i2 = o4;
                        break;
                      }
                      if (i2 && a2.label < i2[2]) {
                        a2.label = i2[2], a2.ops.push(o4);
                        break;
                      }
                      i2[2] && a2.ops.pop(), a2.trys.pop();
                      continue;
                  }
                  o4 = t3.call(e3, a2);
                } catch (e4) {
                  o4 = [6, e4], r3 = 0;
                } finally {
                  n3 = i2 = 0;
                }
                if (5 & o4[0]) throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, l3]);
            };
          }
        }, A = function(e3) {
          var t3, n3 = { anchor: 0, cdn: y.g.CDN, customEmoji: {}, emojiPath: y.g.CDN + "/dist/images/emoji", hljs: y.g.HLJS_OPTIONS, icon: "ant", lang: "zh_CN", markdown: y.g.MARKDOWN_OPTIONS, math: y.g.MATH_OPTIONS, mode: "light", speech: { enable: false }, render: { media: { enable: true } }, theme: y.g.THEME_OPTIONS };
          return e3.cdn && ((null === (t3 = e3.theme) || void 0 === t3 ? void 0 : t3.path) || (n3.theme.path = e3.cdn + "/dist/css/content-theme"), e3.emojiPath || (n3.emojiPath = e3.cdn + "/dist/images/emoji")), (0, k.T)(n3, e3);
        }, _ = function(e3, t3) {
          var n3 = A(t3);
          return (0, w.G)(n3.cdn + "/dist/js/lute/lute.min.js", "vditorLuteScript").then(function() {
            var r3 = (0, S.X)({ autoSpace: n3.markdown.autoSpace, gfmAutoLink: n3.markdown.gfmAutoLink, codeBlockPreview: n3.markdown.codeBlockPreview, emojiSite: n3.emojiPath, emojis: n3.customEmoji, fixTermTypo: n3.markdown.fixTermTypo, footnotes: n3.markdown.footnotes, headingAnchor: 0 !== n3.anchor, inlineMathDigit: n3.math.inlineDigit, lazyLoadImage: n3.lazyLoadImage, linkBase: n3.markdown.linkBase, linkPrefix: n3.markdown.linkPrefix, listStyle: n3.markdown.listStyle, mark: n3.markdown.mark, mathBlockPreview: n3.markdown.mathBlockPreview, paragraphBeginningSpace: n3.markdown.paragraphBeginningSpace, sanitize: n3.markdown.sanitize, toc: n3.markdown.toc });
            return (null == t3 ? void 0 : t3.renderers) && r3.SetJSRenderers({ renderers: { Md2HTML: t3.renderers } }), r3.SetHeadingID(true), r3.Md2HTML(e3);
          });
        }, x = function(e3, t3, n3) {
          return M(void 0, void 0, void 0, function() {
            var i2, v2, y2;
            return C(this, function(k2) {
              switch (k2.label) {
                case 0:
                  return i2 = A(n3), [4, _(t3, i2)];
                case 1:
                  if (v2 = k2.sent(), i2.transform && (v2 = i2.transform(v2)), e3.innerHTML = v2, e3.classList.add("vditor-reset"), i2.i18n) return [3, 5];
                  if (["en_US", "fr_FR", "pt_BR", "ja_JP", "ko_KR", "ru_RU", "sv_SE", "zh_CN", "zh_TW"].includes(i2.lang)) return [3, 2];
                  throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
                case 2:
                  return y2 = "vditorI18nScript" + i2.lang, document.querySelectorAll('head script[id^="vditorI18nScript"]').forEach(function(e4) {
                    e4.id !== y2 && document.head.removeChild(e4);
                  }), [4, (0, w.G)(i2.cdn + "/dist/js/i18n/" + i2.lang + ".js", y2)];
                case 3:
                  k2.sent(), k2.label = 4;
                case 4:
                  return [3, 6];
                case 5:
                  window.VditorI18n = i2.i18n, k2.label = 6;
                case 6:
                  return i2.icon ? [4, (0, w.G)(i2.cdn + "/dist/js/icons/" + i2.icon + ".js", "vditorIconScript")] : [3, 8];
                case 7:
                  k2.sent(), k2.label = 8;
                case 8:
                  return (0, b.Z)(i2.theme.current, i2.theme.path), 1 === i2.anchor && e3.classList.add("vditor-reset--anchor"), (0, a.O)(e3, i2.hljs), (0, d.s)(i2.hljs, e3, i2.cdn), (0, u.H)(e3, { cdn: i2.cdn, math: i2.math }), (0, m.i)(e3, i2.cdn, i2.mode), (0, f.K)(e3, i2.cdn, i2.mode), (0, l.P)(e3, i2.cdn), (0, s.v)(e3, i2.cdn), (0, o.p)(e3, i2.cdn, i2.mode), (0, h.P)(e3, i2.cdn, i2.mode), (0, g.B)(e3, i2.cdn), (0, r2.Q)(e3, i2.cdn), i2.render.media.enable && (0, p.Y)(e3), i2.speech.enable && T(e3), 0 !== i2.anchor && (S2 = i2.anchor, document.querySelectorAll(".vditor-anchor").forEach(function(e4) {
                    1 === S2 && e4.classList.add("vditor-anchor--left"), e4.onclick = function() {
                      var t4 = e4.getAttribute("href").substr(1), n4 = document.getElementById("vditorAnchor-" + t4).offsetTop;
                      document.querySelector("html").scrollTop = n4;
                    };
                  }), window.onhashchange = function() {
                    var e4 = document.getElementById("vditorAnchor-" + decodeURIComponent(window.location.hash.substr(1)));
                    e4 && (document.querySelector("html").scrollTop = e4.offsetTop);
                  }), i2.after && i2.after(), i2.lazyLoadImage && c(e3), e3.addEventListener("click", function(t4) {
                    var n4 = (0, E.lG)(t4.target, "SPAN");
                    if (n4 && (0, E.fb)(n4, "vditor-toc")) {
                      var r3 = e3.querySelector("#" + n4.getAttribute("data-target-id"));
                      r3 && window.scrollTo(window.scrollX, r3.offsetTop);
                    } else ;
                  }), [2];
              }
              var S2;
            });
          });
        }, H = n2(863), N = n2(312);
        const D = function() {
          function e3() {
          }
          return e3.adapterRender = i, e3.previewImage = H.E, e3.codeRender = a.O, e3.graphvizRender = s.v, e3.highlightRender = d.s, e3.mathRender = u.H, e3.mermaidRender = m.i, e3.markmapRender = f.K, e3.flowchartRender = l.P, e3.chartRender = o.p, e3.abcRender = r2.Q, e3.mindmapRender = h.P, e3.plantumlRender = g.B, e3.outlineRender = v.k, e3.mediaRender = p.Y, e3.speechRender = T, e3.lazyLoadImageRender = c, e3.md2html = _, e3.preview = x, e3.setCodeTheme = N.Y, e3.setContentTheme = b.Z, e3;
        }();
      }, 54: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { H: () => r2, g: () => i });
        var r2 = "3.10.4", i = function() {
          function e3() {
          }
          return e3.ZWSP = "​", e3.DROP_EDITOR = "application/editor", e3.MOBILE_WIDTH = 520, e3.CLASS_MENU_DISABLED = "vditor-menu--disabled", e3.EDIT_TOOLBARS = ["emoji", "headings", "bold", "italic", "strike", "link", "list", "ordered-list", "outdent", "indent", "check", "line", "quote", "code", "inline-code", "insert-after", "insert-before", "upload", "record", "table"], e3.CODE_THEME = ["abap", "algol", "algol_nu", "arduino", "autumn", "borland", "bw", "colorful", "dracula", "emacs", "friendly", "fruity", "github", "igor", "lovelace", "manni", "monokai", "monokailight", "murphy", "native", "paraiso-dark", "paraiso-light", "pastie", "perldoc", "pygments", "rainbow_dash", "rrt", "solarized-dark", "solarized-dark256", "solarized-light", "swapoff", "tango", "trac", "vim", "vs", "xcode", "ant-design"], e3.CODE_LANGUAGES = ["mermaid", "echarts", "mindmap", "plantuml", "abc", "graphviz", "flowchart", "apache", "js", "ts", "html", "markmap", "properties", "apache", "bash", "c", "csharp", "cpp", "css", "coffeescript", "diff", "go", "xml", "http", "json", "java", "javascript", "kotlin", "less", "lua", "makefile", "markdown", "nginx", "objectivec", "php", "php-template", "perl", "plaintext", "python", "python-repl", "r", "ruby", "rust", "scss", "sql", "shell", "swift", "ini", "typescript", "vbnet", "yaml", "ada", "clojure", "dart", "erb", "fortran", "gradle", "haskell", "julia", "julia-repl", "lisp", "matlab", "pgsql", "powershell", "sql_more", "stata", "cmake", "mathematica", "solidity", "yul"], e3.CDN = "https://unpkg.com/vditor@3.10.4", e3.MARKDOWN_OPTIONS = { autoSpace: false, gfmAutoLink: true, codeBlockPreview: true, fixTermTypo: false, footnotes: true, linkBase: "", linkPrefix: "", listStyle: false, mark: false, mathBlockPreview: true, paragraphBeginningSpace: false, sanitize: true, toc: false }, e3.HLJS_OPTIONS = { enable: true, lineNumber: false, defaultLang: "", style: "github" }, e3.MATH_OPTIONS = { engine: "KaTeX", inlineDigit: false, macros: {} }, e3.THEME_OPTIONS = { current: "light", list: { "ant-design": "Ant Design", dark: "Dark", light: "Light", wechat: "WeChat" }, path: e3.CDN + "/dist/css/content-theme" }, e3;
        }();
      }, 478: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { Q: () => a });
        var r2 = n2(54), i = n2(526), o = n2(156), a = function(e3, t3) {
          void 0 === e3 && (e3 = document), void 0 === t3 && (t3 = r2.g.CDN);
          var n3 = o.abcRenderAdapter.getElements(e3);
          n3.length > 0 && (0, i.G)(t3 + "/dist/js/abcjs/abcjs_basic.min.js", "vditorAbcjsScript").then(function() {
            n3.forEach(function(e4) {
              e4.parentElement.classList.contains("vditor-wysiwyg__pre") || e4.parentElement.classList.contains("vditor-ir__marker--pre") || "true" !== e4.getAttribute("data-processed") && (ABCJS.renderAbc(e4, o.abcRenderAdapter.getCode(e4).trim()), e4.style.overflowX = "auto", e4.setAttribute("data-processed", "true"));
            });
          });
        };
      }, 156: (e2, t2, n2) => {
        "use strict";
        n2.r(t2), n2.d(t2, { abcRenderAdapter: () => s, chartRenderAdapter: () => l, flowchartRenderAdapter: () => c, graphvizRenderAdapter: () => d, markmapRenderAdapter: () => o, mathRenderAdapter: () => r2, mermaidRenderAdapter: () => i, mindmapRenderAdapter: () => a, plantumlRenderAdapter: () => u });
        var r2 = { getCode: function(e3) {
          return e3.textContent;
        }, getElements: function(e3) {
          return e3.querySelectorAll(".language-math");
        } }, i = { getCode: function(e3) {
          return e3.textContent;
        }, getElements: function(e3) {
          return e3.querySelectorAll(".language-mermaid");
        } }, o = { getCode: function(e3) {
          return e3.textContent;
        }, getElements: function(e3) {
          return e3.querySelectorAll(".language-markmap");
        } }, a = { getCode: function(e3) {
          return e3.getAttribute("data-code");
        }, getElements: function(e3) {
          return e3.querySelectorAll(".language-mindmap");
        } }, l = { getCode: function(e3) {
          return e3.innerText;
        }, getElements: function(e3) {
          return e3.querySelectorAll(".language-echarts");
        } }, s = { getCode: function(e3) {
          return e3.textContent;
        }, getElements: function(e3) {
          return e3.querySelectorAll(".language-abc");
        } }, d = { getCode: function(e3) {
          return e3.textContent;
        }, getElements: function(e3) {
          return e3.querySelectorAll(".language-graphviz");
        } }, c = { getCode: function(e3) {
          return e3.textContent;
        }, getElements: function(e3) {
          return e3.querySelectorAll(".language-flowchart");
        } }, u = { getCode: function(e3) {
          return e3.textContent;
        }, getElements: function(e3) {
          return e3.querySelectorAll(".language-plantuml");
        } };
      }, 314: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { p: () => a });
        var r2 = n2(54), i = n2(526), o = n2(156), a = function(e3, t3, n3) {
          void 0 === e3 && (e3 = document), void 0 === t3 && (t3 = r2.g.CDN);
          var a2 = o.chartRenderAdapter.getElements(e3);
          a2.length > 0 && (0, i.G)(t3 + "/dist/js/echarts/echarts.min.js", "vditorEchartsScript").then(function() {
            a2.forEach(function(e4) {
              if (!e4.parentElement.classList.contains("vditor-wysiwyg__pre") && !e4.parentElement.classList.contains("vditor-ir__marker--pre")) {
                var t4 = o.chartRenderAdapter.getCode(e4).trim();
                if (t4) try {
                  if ("true" === e4.getAttribute("data-processed")) return;
                  var r3 = JSON.parse(t4);
                  echarts.init(e4, "dark" === n3 ? "dark" : void 0).setOption(r3), e4.setAttribute("data-processed", "true");
                } catch (t5) {
                  e4.className = "vditor-reset--error", e4.innerHTML = "echarts render error: <br>" + t5;
                }
              }
            });
          });
        };
      }, 730: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { O: () => o });
        var r2 = n2(51), i = n2(54), o = function(e3, t3) {
          Array.from(e3.querySelectorAll("pre > code")).filter(function(t4, n3) {
            return !t4.parentElement.classList.contains("vditor-wysiwyg__pre") && !t4.parentElement.classList.contains("vditor-ir__marker--pre") && (!(t4.classList.contains("language-mermaid") || t4.classList.contains("language-flowchart") || t4.classList.contains("language-echarts") || t4.classList.contains("language-mindmap") || t4.classList.contains("language-plantuml") || t4.classList.contains("language-markmap") || t4.classList.contains("language-abc") || t4.classList.contains("language-graphviz") || t4.classList.contains("language-math")) && (!(t4.style.maxHeight.indexOf("px") > -1) && !(e3.classList.contains("vditor-preview") && n3 > 5)));
          }).forEach(function(e4) {
            var n3, o2, a, l = e4.innerText;
            if (e4.classList.contains("highlight-chroma")) {
              var s = e4.cloneNode(true);
              s.querySelectorAll(".highlight-ln").forEach(function(e5) {
                e5.remove();
              }), l = s.innerText;
            } else l.endsWith("\n") && (l = l.substr(0, l.length - 1));
            var d = '<svg><use xlink:href="#vditor-icon-copy"></use></svg>';
            document.getElementById("vditorIconScript") || (d = '<svg viewBox="0 0 32 32"><path d="M22.545-0h-17.455c-1.6 0-2.909 1.309-2.909 2.909v20.364h2.909v-20.364h17.455v-2.909zM26.909 5.818h-16c-1.6 0-2.909 1.309-2.909 2.909v20.364c0 1.6 1.309 2.909 2.909 2.909h16c1.6 0 2.909-1.309 2.909-2.909v-20.364c0-1.6-1.309-2.909-2.909-2.909zM26.909 29.091h-16v-20.364h16v20.364z"></path></svg>');
            var c = document.createElement("div");
            c.className = "vditor-copy", c.innerHTML = '<span aria-label="' + ((null === (n3 = window.VditorI18n) || void 0 === n3 ? void 0 : n3.copy) || "复制") + `"
onmouseover="this.setAttribute('aria-label', '` + ((null === (o2 = window.VditorI18n) || void 0 === o2 ? void 0 : o2.copy) || "复制") + `')"
class="vditor-tooltipped vditor-tooltipped__w"
onclick="this.previousElementSibling.select();document.execCommand('copy');this.setAttribute('aria-label', '` + ((null === (a = window.VditorI18n) || void 0 === a ? void 0 : a.copied) || "已复制") + `');this.previousElementSibling.blur()">` + d + "</span>";
            var u = document.createElement("textarea");
            u.value = (0, r2.X)(l), c.insertAdjacentElement("afterbegin", u), t3 && t3.renderMenu && t3.renderMenu(e4, c), e4.before(c), e4.style.maxHeight = window.outerHeight - 40 + "px", e4.insertAdjacentHTML("afterend", '<span style="position: absolute">' + i.g.ZWSP + "</span>");
          });
        };
      }, 66: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { P: () => a });
        var r2 = n2(54), i = n2(526), o = n2(156), a = function(e3, t3) {
          void 0 === t3 && (t3 = r2.g.CDN);
          var n3 = o.flowchartRenderAdapter.getElements(e3);
          0 !== n3.length && (0, i.G)(t3 + "/dist/js/flowchart.js/flowchart.min.js", "vditorFlowchartScript").then(function() {
            n3.forEach(function(e4) {
              if ("true" !== e4.getAttribute("data-processed")) {
                var t4 = flowchart.parse(o.flowchartRenderAdapter.getCode(e4));
                e4.innerHTML = "", t4.drawSVG(e4), e4.setAttribute("data-processed", "true");
              }
            });
          });
        };
      }, 218: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { v: () => a });
        var r2 = n2(54), i = n2(526), o = n2(156), a = function(e3, t3) {
          void 0 === t3 && (t3 = r2.g.CDN);
          var n3 = o.graphvizRenderAdapter.getElements(e3);
          0 !== n3.length && (0, i.G)(t3 + "/dist/js/graphviz/viz.js", "vditorGraphVizScript").then(function() {
            n3.forEach(function(e4) {
              var t4 = o.graphvizRenderAdapter.getCode(e4);
              if (!e4.parentElement.classList.contains("vditor-wysiwyg__pre") && !e4.parentElement.classList.contains("vditor-ir__marker--pre") && "true" !== e4.getAttribute("data-processed") && "" !== t4.trim()) {
                try {
                  var n4 = new Blob(["importScripts('" + document.getElementById("vditorGraphVizScript").src.replace("viz.js", "full.render.js") + "');"], { type: "application/javascript" }), r3 = (window.URL || window.webkitURL).createObjectURL(n4), i2 = new Worker(r3);
                  new Viz({ worker: i2 }).renderSVGElement(t4).then(function(t5) {
                    e4.innerHTML = t5.outerHTML;
                  }).catch(function(t5) {
                    e4.innerHTML = "graphviz render error: <br>" + t5, e4.className = "vditor-reset--error";
                  });
                } catch (e5) {
                  console.error("graphviz error", e5);
                }
                e4.setAttribute("data-processed", "true");
              }
            });
          });
        };
      }, 702: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { s: () => a });
        var r2 = n2(54), i = n2(526), o = n2(578), a = function(e3, t3, n3) {
          void 0 === t3 && (t3 = document), void 0 === n3 && (n3 = r2.g.CDN);
          var a2 = e3.style;
          r2.g.CODE_THEME.includes(a2) || (a2 = "github");
          var l = document.getElementById("vditorHljsStyle"), s = n3 + "/dist/js/highlight.js/styles/" + a2 + ".css";
          (l && l.getAttribute("href") !== s && l.remove(), (0, o.c)(n3 + "/dist/js/highlight.js/styles/" + a2 + ".css", "vditorHljsStyle"), false !== e3.enable) && (0 !== t3.querySelectorAll("pre > code").length && (0, i.G)(n3 + "/dist/js/highlight.js/highlight.pack.js", "vditorHljsScript").then(function() {
            (0, i.G)(n3 + "/dist/js/highlight.js/solidity.min.js", "vditorHljsSolidityScript").then(function() {
              (0, i.G)(n3 + "/dist/js/highlight.js/yul.min.js", "vditorHljsYulScript").then(function() {
                t3.querySelectorAll("pre > code").forEach(function(t4) {
                  if (!t4.parentElement.classList.contains("vditor-ir__marker--pre") && !t4.parentElement.classList.contains("vditor-wysiwyg__pre") && !(t4.classList.contains("language-mermaid") || t4.classList.contains("language-flowchart") || t4.classList.contains("language-echarts") || t4.classList.contains("language-mindmap") || t4.classList.contains("language-plantuml") || t4.classList.contains("language-abc") || t4.classList.contains("language-graphviz") || t4.classList.contains("language-math")) && ("" !== e3.defaultLang && -1 === t4.className.indexOf("language-") && t4.classList.add("language-" + e3.defaultLang), hljs.highlightElement(t4), e3.lineNumber)) {
                    t4.classList.add("vditor-linenumber");
                    var n4 = t4.querySelector(".vditor-linenumber__temp");
                    n4 || ((n4 = document.createElement("div")).className = "vditor-linenumber__temp", t4.insertAdjacentElement("beforeend", n4));
                    var r3 = getComputedStyle(t4).whiteSpace, i2 = false;
                    "pre-wrap" !== r3 && "pre-line" !== r3 || (i2 = true);
                    var o2 = "", a3 = t4.textContent.split(/\r\n|\r|\n/g);
                    a3.pop(), a3.map(function(e4) {
                      var t5 = "";
                      i2 && (n4.textContent = e4 || "\n", t5 = ' style="height:' + n4.getBoundingClientRect().height + 'px"'), o2 += "<span" + t5 + "></span>";
                    }), n4.style.display = "none", o2 = '<span class="vditor-linenumber__rows">' + o2 + "</span>", t4.insertAdjacentHTML("beforeend", o2);
                  }
                });
              });
            });
          }));
        };
      }, 563: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { K: () => s });
        var r2 = n2(54), i = n2(526), o = n2(156), a = {}, l = function(e3, t3) {
          var n3 = window.markmap, r3 = n3.Transformer, i2 = n3.Markmap, o2 = n3.deriveOptions, l2 = (n3.globalCSS, new r3());
          e3.innerHTML = '<svg style="width:100%"></svg>';
          var s2 = e3.firstChild, d = i2.create(s2, null), c = function(e4, t4) {
            var n4 = e4.transform(t4), r4 = Object.keys(n4.features).filter(function(e5) {
              return !a[e5];
            });
            r4.forEach(function(e5) {
              a[e5] = true;
            });
            var i3 = e4.getAssets(r4), o3 = i3.styles, l3 = i3.scripts, s3 = window.markmap;
            return o3 && s3.loadCSS(o3), l3 && s3.loadJS(l3), n4;
          }(l2, t3), u = c.root, p = c.frontmatter, m = o2(null == p ? void 0 : p.markmap);
          d.setData(u, m), d.fit();
        }, s = function(e3, t3, n3) {
          void 0 === t3 && (t3 = r2.g.CDN);
          var a2 = o.markmapRenderAdapter.getElements(e3);
          0 !== a2.length && (0, i.G)(t3 + "/dist/js/markmap/markmap.min.js", "vditorMermaidScript").then(function() {
            a2.forEach(function(e4) {
              var t4 = o.markmapRenderAdapter.getCode(e4);
              if ("true" !== e4.getAttribute("data-processed") && "" !== t4.trim()) {
                var n4 = document.createElement("div");
                n4.className = "language-markmap", e4.parentNode.appendChild(n4), l(n4, t4), "CODE" == e4.parentNode.childNodes[0].nodeName && e4.parentNode.removeChild(e4.parentNode.childNodes[0]);
              }
            });
          });
        };
      }, 466: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { H: () => s });
        var r2 = n2(54), i = n2(526), o = n2(578), a = n2(51), l = n2(156), s = function(e3, t3) {
          var n3 = l.mathRenderAdapter.getElements(e3);
          if (0 !== n3.length) {
            var s2 = { cdn: r2.g.CDN, math: { engine: "KaTeX", inlineDigit: false, macros: {} } };
            if (t3 && t3.math && (t3.math = Object.assign({}, s2.math, t3.math)), "KaTeX" === (t3 = Object.assign({}, s2, t3)).math.engine) (0, o.c)(t3.cdn + "/dist/js/katex/katex.min.css?v=0.16.9", "vditorKatexStyle"), (0, i.G)(t3.cdn + "/dist/js/katex/katex.min.js?v=0.16.9", "vditorKatexScript").then(function() {
              (0, i.G)(t3.cdn + "/dist/js/katex/mhchem.min.js?v=0.16.9", "vditorKatexChemScript").then(function() {
                n3.forEach(function(e4) {
                  if (!e4.parentElement.classList.contains("vditor-wysiwyg__pre") && !e4.parentElement.classList.contains("vditor-ir__marker--pre") && !e4.getAttribute("data-math")) {
                    var n4 = (0, a.X)(l.mathRenderAdapter.getCode(e4));
                    e4.setAttribute("data-math", n4);
                    try {
                      e4.innerHTML = katex.renderToString(n4, { displayMode: "DIV" === e4.tagName, output: "html", macros: t3.math.macros });
                    } catch (t4) {
                      e4.innerHTML = t4.message, e4.className = "language-math vditor-reset--error";
                    }
                    e4.addEventListener("copy", function(e5) {
                      e5.stopPropagation(), e5.preventDefault();
                      var t4 = e5.currentTarget.closest(".language-math");
                      e5.clipboardData.setData("text/html", t4.innerHTML), e5.clipboardData.setData("text/plain", t4.getAttribute("data-math"));
                    });
                  }
                });
              });
            });
            else if ("MathJax" === t3.math.engine) {
              window.MathJax || (window.MathJax = { loader: { paths: { mathjax: t3.cdn + "/dist/js/mathjax" } }, startup: { typeset: false }, tex: { macros: t3.math.macros } }, Object.assign(window.MathJax, t3.math.mathJaxOptions)), (0, i.J)(t3.cdn + "/dist/js/mathjax/tex-svg-full.js", "protyleMathJaxScript");
              var d = function(e4, t4) {
                var n4 = (0, a.X)(e4.textContent).trim(), r3 = window.MathJax.getMetricsFor(e4);
                r3.display = "DIV" === e4.tagName, window.MathJax.tex2svgPromise(n4, r3).then(function(r4) {
                  e4.innerHTML = "", e4.setAttribute("data-math", n4), e4.append(r4), window.MathJax.startup.document.clear(), window.MathJax.startup.document.updateDocument();
                  var i2 = r4.querySelector('[data-mml-node="merror"]');
                  i2 && "" !== i2.textContent.trim() && (e4.innerHTML = i2.textContent.trim(), e4.className = "vditor-reset--error"), t4 && t4();
                });
              };
              window.MathJax.startup.promise.then(function() {
                for (var e4 = [], t4 = function(t5) {
                  var r4 = n3[t5];
                  r4.parentElement.classList.contains("vditor-wysiwyg__pre") || r4.parentElement.classList.contains("vditor-ir__marker--pre") || r4.getAttribute("data-math") || !(0, a.X)(r4.textContent).trim() || e4.push(function(e5) {
                    t5 === n3.length - 1 ? d(r4) : d(r4, e5);
                  });
                }, r3 = 0; r3 < n3.length; r3++) t4(r3);
                !function(e5) {
                  if (0 !== e5.length) {
                    var t5 = 0, n4 = e5[e5.length - 1], r4 = function() {
                      var i2 = e5[t5++];
                      i2 === n4 ? i2() : i2(r4);
                    };
                    r4();
                  }
                }(e4);
              });
            }
          }
        };
      }, 554: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { Y: () => i });
        var r2 = n2(835), i = function(e3) {
          e3 && e3.querySelectorAll("a").forEach(function(e4) {
            var t3 = e4.getAttribute("href");
            t3 && (t3.match(/^.+.(mp4|m4v|ogg|ogv|webm)$/) ? function(e5, t4) {
              e5.insertAdjacentHTML("afterend", '<video controls="controls" src="' + t4 + '"></video>'), e5.remove();
            }(e4, t3) : t3.match(/^.+.(mp3|wav|flac)$/) ? function(e5, t4) {
              e5.insertAdjacentHTML("afterend", '<audio controls="controls" src="' + t4 + '"></audio>'), e5.remove();
            }(e4, t3) : function(e5, t4) {
              var n3 = t4.match(/\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?/), i2 = t4.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/), o = t4.match(/\/\/v\.qq\.com\/x\/cover\/.*\/([^\/]+)\.html\??.*/), a = t4.match(/(?:www\.|\/\/)coub\.com\/view\/(\w+)/), l = t4.match(/(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/), s = t4.match(/.+dailymotion.com\/(video|hub)\/(\w+)\?/), d = t4.match(/(?:www\.|\/\/)bilibili\.com\/video\/(\w+)/), c = t4.match(/(?:www\.|\/\/)ted\.com\/talks\/(\w+)/);
              if (n3 && 11 === n3[1].length) e5.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//www.youtube.com/embed/' + n3[1] + (n3[2] ? "?start=" + n3[2] : "") + '"></iframe>'), e5.remove();
              else if (i2 && i2[1]) e5.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//player.youku.com/embed/' + i2[1] + '"></iframe>'), e5.remove();
              else if (o && o[1]) e5.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="https://v.qq.com/txp/iframe/player.html?vid=' + o[1] + '"></iframe>'), e5.remove();
              else if (a && a[1]) e5.insertAdjacentHTML("afterend", '<iframe class="iframe__video"\n src="//coub.com/embed/' + a[1] + '?muted=false&autostart=false&originalSize=true&startWithHD=true"></iframe>'), e5.remove();
              else if (l && l[0]) e5.insertAdjacentHTML("afterend", '<iframe class="iframe__video"\n src="https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(l[0]) + '"></iframe>'), e5.remove();
              else if (s && s[2]) e5.insertAdjacentHTML("afterend", '<iframe class="iframe__video"\n src="https://www.dailymotion.com/embed/video/' + s[2] + '"></iframe>'), e5.remove();
              else if (t4.indexOf("bilibili.com") > -1 && (t4.indexOf("bvid=") > -1 || d && d[1])) {
                var u = { bvid: (0, r2.o)("bvid", t4) || d && d[1], page: "1", high_quality: "1", as_wide: "1", allowfullscreen: "true", autoplay: "0" };
                new URL(t4.startsWith("http") ? t4 : "https:" + t4).search.split("&").forEach(function(e6, t5) {
                  if (e6) {
                    0 === t5 && (e6 = e6.substr(1));
                    var n4 = e6.split("=");
                    u[n4[0]] = n4[1];
                  }
                });
                var p = "https://player.bilibili.com/player.html?", m = Object.keys(u);
                m.forEach(function(e6, t5) {
                  p += e6 + "=" + u[e6], t5 < m.length - 1 && (p += "&");
                }), e5.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="' + p + '"></iframe>'), e5.remove();
              } else c && c[1] && (e5.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//embed.ted.com/talks/' + c[1] + '"></iframe>'), e5.remove());
            }(e4, t3));
          });
        };
      }, 40: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { i: () => d });
        var r2 = n2(54), i = n2(526), o = n2(156), a = n2(835), l = function(e3, t3, n3, r3) {
          return new (n3 || (n3 = Promise))(function(i2, o2) {
            function a2(e4) {
              try {
                s2(r3.next(e4));
              } catch (e5) {
                o2(e5);
              }
            }
            function l2(e4) {
              try {
                s2(r3.throw(e4));
              } catch (e5) {
                o2(e5);
              }
            }
            function s2(e4) {
              var t4;
              e4.done ? i2(e4.value) : (t4 = e4.value, t4 instanceof n3 ? t4 : new n3(function(e5) {
                e5(t4);
              })).then(a2, l2);
            }
            s2((r3 = r3.apply(e3, t3 || [])).next());
          });
        }, s = function(e3, t3) {
          var n3, r3, i2, o2, a2 = { label: 0, sent: function() {
            if (1 & i2[0]) throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: l2(0), throw: l2(1), return: l2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function l2(o3) {
            return function(l3) {
              return function(o4) {
                if (n3) throw new TypeError("Generator is already executing.");
                for (; a2; ) try {
                  if (n3 = 1, r3 && (i2 = 2 & o4[0] ? r3.return : o4[0] ? r3.throw || ((i2 = r3.return) && i2.call(r3), 0) : r3.next) && !(i2 = i2.call(r3, o4[1])).done) return i2;
                  switch (r3 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                    case 0:
                    case 1:
                      i2 = o4;
                      break;
                    case 4:
                      return a2.label++, { value: o4[1], done: false };
                    case 5:
                      a2.label++, r3 = o4[1], o4 = [0];
                      continue;
                    case 7:
                      o4 = a2.ops.pop(), a2.trys.pop();
                      continue;
                    default:
                      if (!(i2 = a2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                        a2 = 0;
                        continue;
                      }
                      if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                        a2.label = o4[1];
                        break;
                      }
                      if (6 === o4[0] && a2.label < i2[1]) {
                        a2.label = i2[1], i2 = o4;
                        break;
                      }
                      if (i2 && a2.label < i2[2]) {
                        a2.label = i2[2], a2.ops.push(o4);
                        break;
                      }
                      i2[2] && a2.ops.pop(), a2.trys.pop();
                      continue;
                  }
                  o4 = t3.call(e3, a2);
                } catch (e4) {
                  o4 = [6, e4], r3 = 0;
                } finally {
                  n3 = i2 = 0;
                }
                if (5 & o4[0]) throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, l3]);
            };
          }
        }, d = function(e3, t3, n3) {
          void 0 === t3 && (t3 = r2.g.CDN);
          var d2 = o.mermaidRenderAdapter.getElements(e3);
          0 !== d2.length && (0, i.G)(t3 + "/dist/js/mermaid/mermaid.min.js", "vditorMermaidScript").then(function() {
            var e4 = { securityLevel: "loose", altFontFamily: "sans-serif", fontFamily: "sans-serif", startOnLoad: false, flowchart: { htmlLabels: true, useMaxWidth: true }, sequence: { useMaxWidth: true, diagramMarginX: 8, diagramMarginY: 8, boxMargin: 8, showSequenceNumbers: true }, gantt: { leftPadding: 75, rightPadding: 20 } };
            "dark" === n3 && (e4.theme = "dark"), mermaid.initialize(e4), d2.forEach(function(e5) {
              return l(void 0, void 0, void 0, function() {
                var t4, n4, r3, i2, l2;
                return s(this, function(s2) {
                  switch (s2.label) {
                    case 0:
                      if (t4 = o.mermaidRenderAdapter.getCode(e5), "true" === e5.getAttribute("data-processed") || "" === t4.trim()) return [2];
                      n4 = "mermaid" + (0, a.W)(), s2.label = 1;
                    case 1:
                      return s2.trys.push([1, 3, , 4]), [4, mermaid.render(n4, e5.textContent)];
                    case 2:
                      return r3 = s2.sent(), e5.innerHTML = r3.svg, [3, 4];
                    case 3:
                      return i2 = s2.sent(), l2 = document.querySelector("#" + n4), e5.innerHTML = l2.outerHTML + '<br>\n<div style="text-align: left"><small>' + i2.message.replace(/\n/, "<br>") + "</small></div>", l2.parentElement.remove(), [3, 4];
                    case 4:
                      return e5.setAttribute("data-processed", "true"), [2];
                  }
                });
              });
            });
          });
        };
      }, 749: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { P: () => a });
        var r2 = n2(54), i = n2(526), o = n2(156), a = function(e3, t3, n3) {
          void 0 === e3 && (e3 = document), void 0 === t3 && (t3 = r2.g.CDN);
          var a2 = o.mindmapRenderAdapter.getElements(e3);
          a2.length > 0 && (0, i.G)(t3 + "/dist/js/echarts/echarts.min.js", "vditorEchartsScript").then(function() {
            a2.forEach(function(e4) {
              if (!e4.parentElement.classList.contains("vditor-wysiwyg__pre") && !e4.parentElement.classList.contains("vditor-ir__marker--pre")) {
                var t4 = o.mindmapRenderAdapter.getCode(e4);
                if (t4) try {
                  if ("true" === e4.getAttribute("data-processed")) return;
                  echarts.init(e4, "dark" === n3 ? "dark" : void 0).setOption({ series: [{ data: [JSON.parse(decodeURIComponent(t4))], initialTreeDepth: -1, itemStyle: { borderWidth: 0, color: "#4285f4" }, label: { backgroundColor: "#f6f8fa", borderColor: "#d1d5da", borderRadius: 5, borderWidth: 0.5, color: "#586069", lineHeight: 20, offset: [-5, 0], padding: [0, 5], position: "insideRight" }, lineStyle: { color: "#d1d5da", width: 1 }, roam: true, symbol: function(e5, t5) {
                    var n4;
                    return (null === (n4 = null == t5 ? void 0 : t5.data) || void 0 === n4 ? void 0 : n4.children) ? "circle" : "path://";
                  }, type: "tree" }], tooltip: { trigger: "item", triggerOn: "mousemove" } }), e4.setAttribute("data-processed", "true");
                } catch (t5) {
                  e4.className = "vditor-reset--error", e4.innerHTML = "mindmap render error: <br>" + t5;
                }
              }
            });
          });
        };
      }, 818: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { k: () => o });
        var r2 = n2(64), i = n2(466), o = function(e3, t3, n3) {
          var o2 = "", a = [];
          if (Array.from(e3.children).forEach(function(e4, t4) {
            if ((0, r2.W)(e4)) {
              if (n3) {
                var i2 = e4.id.lastIndexOf("_");
                e4.id = e4.id.substring(0, -1 === i2 ? void 0 : i2) + "_" + t4;
              }
              a.push(e4.id), o2 += e4.outerHTML.replace("<wbr>", "");
            }
          }), "" === o2) return t3.innerHTML = "", "";
          var l = document.createElement("div");
          if (n3) n3.lute.SetToC(true), "wysiwyg" !== n3.currentMode || n3.preview.element.contains(e3) ? "ir" !== n3.currentMode || n3.preview.element.contains(e3) ? l.innerHTML = n3.lute.HTML2VditorDOM("<p>[ToC]</p>" + o2) : l.innerHTML = n3.lute.SpinVditorIRDOM("<p>[ToC]</p>" + o2) : l.innerHTML = n3.lute.SpinVditorDOM("<p>[ToC]</p>" + o2), n3.lute.SetToC(n3.options.preview.markdown.toc);
          else {
            t3.classList.add("vditor-outline");
            var s = Lute.New();
            s.SetToC(true), l.innerHTML = s.HTML2VditorDOM("<p>[ToC]</p>" + o2);
          }
          var d = l.firstElementChild.querySelectorAll("li > span[data-target-id]");
          return d.forEach(function(e4, t4) {
            if (e4.nextElementSibling && "UL" === e4.nextElementSibling.tagName) {
              var n4 = "<svg class='vditor-outline__action'><use xlink:href='#vditor-icon-down'></use></svg>";
              document.getElementById("vditorIconScript") || (n4 = '<svg class="vditor-outline__action" viewBox="0 0 32 32"><path d="M3.76 6.12l12.24 12.213 12.24-12.213 3.76 3.76-16 16-16-16 3.76-3.76z"></path></svg>'), e4.innerHTML = n4 + "<span>" + e4.innerHTML + "</span>";
            } else e4.innerHTML = "<svg></svg><span>" + e4.innerHTML + "</span>";
            e4.setAttribute("data-target-id", a[t4]);
          }), o2 = l.firstElementChild.innerHTML, 0 === d.length ? (t3.innerHTML = "", o2) : (t3.innerHTML = o2, n3 && (0, i.H)(t3, { cdn: n3.options.cdn, math: n3.options.preview.math }), t3.firstElementChild.addEventListener("click", function(r3) {
            for (var i2 = r3.target; i2 && !i2.isEqualNode(t3); ) {
              if (i2.classList.contains("vditor-outline__action")) {
                i2.classList.contains("vditor-outline__action--close") ? (i2.classList.remove("vditor-outline__action--close"), i2.parentElement.nextElementSibling.setAttribute("style", "display:block")) : (i2.classList.add("vditor-outline__action--close"), i2.parentElement.nextElementSibling.setAttribute("style", "display:none")), r3.preventDefault(), r3.stopPropagation();
                break;
              }
              if (i2.getAttribute("data-target-id")) {
                r3.preventDefault(), r3.stopPropagation();
                var o3 = document.getElementById(i2.getAttribute("data-target-id"));
                if (!o3) return;
                if (n3) if ("auto" === n3.options.height) {
                  var a2 = o3.offsetTop + n3.element.offsetTop;
                  n3.options.toolbarConfig.pin || (a2 += n3.toolbar.element.offsetHeight), window.scrollTo(window.scrollX, a2);
                } else n3.element.offsetTop < window.scrollY && window.scrollTo(window.scrollX, n3.element.offsetTop), n3.preview.element.contains(e3) ? e3.parentElement.scrollTop = o3.offsetTop : e3.scrollTop = o3.offsetTop;
                else window.scrollTo(window.scrollX, o3.offsetTop);
                break;
              }
              i2 = i2.parentElement;
            }
          }), o2);
        };
      }, 408: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { B: () => a });
        var r2 = n2(54), i = n2(526), o = n2(156), a = function(e3, t3) {
          void 0 === e3 && (e3 = document), void 0 === t3 && (t3 = r2.g.CDN);
          var n3 = o.plantumlRenderAdapter.getElements(e3);
          0 !== n3.length && (0, i.G)(t3 + "/dist/js/plantuml/plantuml-encoder.min.js", "vditorPlantumlScript").then(function() {
            n3.forEach(function(e4) {
              if (!e4.parentElement.classList.contains("vditor-wysiwyg__pre") && !e4.parentElement.classList.contains("vditor-ir__marker--pre")) {
                var t4 = o.plantumlRenderAdapter.getCode(e4).trim();
                if (t4) try {
                  e4.innerHTML = '<object type="image/svg+xml" data="https://www.plantuml.com/plantuml/svg/~1' + plantumlEncoder.encode(t4) + '"/>';
                } catch (t5) {
                  e4.className = "vditor-reset--error", e4.innerHTML = "plantuml render error: <br>" + t5;
                }
              }
            });
          });
        };
      }, 895: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { X: () => r2 });
        var r2 = function(e3) {
          var t3 = Lute.New();
          return t3.PutEmojis(e3.emojis), t3.SetEmojiSite(e3.emojiSite), t3.SetHeadingAnchor(e3.headingAnchor), t3.SetInlineMathAllowDigitAfterOpenMarker(e3.inlineMathDigit), t3.SetAutoSpace(e3.autoSpace), t3.SetToC(e3.toc), t3.SetFootnotes(e3.footnotes), t3.SetFixTermTypo(e3.fixTermTypo), t3.SetVditorCodeBlockPreview(e3.codeBlockPreview), t3.SetVditorMathBlockPreview(e3.mathBlockPreview), t3.SetSanitize(e3.sanitize), t3.SetChineseParagraphBeginningSpace(e3.paragraphBeginningSpace), t3.SetRenderListStyle(e3.listStyle), t3.SetLinkBase(e3.linkBase), t3.SetLinkPrefix(e3.linkPrefix), t3.SetMark(e3.mark), t3.SetGFMAutoLink(e3.gfmAutoLink), e3.lazyLoadImage && t3.SetImageLazyLoading(e3.lazyLoadImage), t3;
        };
      }, 863: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { E: () => r2 });
        var r2 = function(e3, t3, n3) {
          void 0 === t3 && (t3 = "zh_CN"), void 0 === n3 && (n3 = "classic");
          var r3 = e3.getBoundingClientRect();
          document.body.insertAdjacentHTML("beforeend", '<div class="vditor vditor-img' + ("dark" === n3 ? " vditor--dark" : "") + '">\n    <div class="vditor-img__bar">\n      <span class="vditor-img__btn" data-deg="0">\n        <svg><use xlink:href="#vditor-icon-redo"></use></svg>\n        ' + window.VditorI18n.spin + `
      </span>
      <span class="vditor-img__btn"  onclick="this.parentElement.parentElement.outerHTML = '';document.body.style.overflow = ''">
        X &nbsp;` + window.VditorI18n.close + `
      </span>
    </div>
    <div class="vditor-img__img" onclick="this.parentElement.outerHTML = '';document.body.style.overflow = ''">
      <img style="width: ` + e3.width + "px;height:" + e3.height + "px;transform: translate3d(" + r3.left + "px, " + (r3.top - 36) + 'px, 0)" src="' + e3.getAttribute("src") + '">\n    </div>\n</div>'), document.body.style.overflow = "hidden";
          var i = document.querySelector(".vditor-img img"), o = "translate3d(" + Math.max(0, window.innerWidth - e3.naturalWidth) / 2 + "px, " + Math.max(0, window.innerHeight - 36 - e3.naturalHeight) / 2 + "px, 0)";
          setTimeout(function() {
            i.setAttribute("style", "transition: transform .3s ease-in-out;transform: " + o), setTimeout(function() {
              i.parentElement.scrollTo((i.parentElement.scrollWidth - i.parentElement.clientWidth) / 2, (i.parentElement.scrollHeight - i.parentElement.clientHeight) / 2);
            }, 400);
          });
          var a = document.querySelector(".vditor-img__btn");
          a.addEventListener("click", function() {
            var t4 = parseInt(a.getAttribute("data-deg"), 10) + 90;
            t4 / 90 % 2 == 1 && e3.naturalWidth > i.parentElement.clientHeight ? i.style.transform = "translate3d(" + Math.max(0, window.innerWidth - e3.naturalWidth) / 2 + "px, " + (e3.naturalWidth / 2 - e3.naturalHeight / 2) + "px, 0) rotateZ(" + t4 + "deg)" : i.style.transform = o + " rotateZ(" + t4 + "deg)", a.setAttribute("data-deg", t4.toString()), setTimeout(function() {
              i.parentElement.scrollTo((i.parentElement.scrollWidth - i.parentElement.clientWidth) / 2, (i.parentElement.scrollHeight - i.parentElement.clientHeight) / 2);
            }, 400);
          });
        };
      }, 312: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { Y: () => o });
        var r2 = n2(54), i = n2(578), o = function(e3, t3) {
          void 0 === t3 && (t3 = r2.g.CDN), r2.g.CODE_THEME.includes(e3) || (e3 = "github");
          var n3 = document.getElementById("vditorHljsStyle"), o2 = t3 + "/dist/js/highlight.js/styles/" + e3 + ".css";
          n3 ? n3.getAttribute("href") !== o2 && (n3.remove(), (0, i.c)(o2, "vditorHljsStyle")) : (0, i.c)(o2, "vditorHljsStyle");
        };
      }, 227: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { Z: () => i });
        var r2 = n2(578), i = function(e3, t3) {
          if (e3 && t3) {
            var n3 = document.getElementById("vditorContentTheme"), i2 = t3 + "/" + e3 + ".css";
            n3 ? n3.getAttribute("href") !== i2 && (n3.remove(), (0, r2.c)(i2, "vditorContentTheme")) : (0, r2.c)(i2, "vditorContentTheme");
          }
        };
      }, 526: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { G: () => i, J: () => r2 });
        var r2 = function(e3, t3) {
          if (document.getElementById(t3)) return false;
          var n3 = new XMLHttpRequest();
          n3.open("GET", e3, false), n3.setRequestHeader("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01"), n3.send("");
          var r3 = document.createElement("script");
          r3.type = "text/javascript", r3.text = n3.responseText, r3.id = t3, document.head.appendChild(r3);
        }, i = function(e3, t3) {
          return new Promise(function(n3, r3) {
            if (document.getElementById(t3)) return n3(), false;
            var i2 = document.createElement("script");
            i2.src = e3, i2.async = true, document.head.appendChild(i2), i2.onerror = function(e4) {
              r3(e4);
            }, i2.onload = function() {
              if (document.getElementById(t3)) return i2.remove(), n3(), false;
              i2.id = t3, n3();
            };
          });
        };
      }, 578: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { c: () => r2 });
        var r2 = function(e3, t3) {
          if (!document.getElementById(t3)) {
            var n3 = document.createElement("link");
            n3.id = t3, n3.rel = "stylesheet", n3.type = "text/css", n3.href = e3, document.getElementsByTagName("head")[0].appendChild(n3);
          }
        };
      }, 51: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { X: () => r2 });
        var r2 = function(e3) {
          return e3.replace(/\u00a0/g, " ");
        };
      }, 794: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { G6: () => r2, Le: () => a, i7: () => d, ns: () => s, pK: () => o, vU: () => i, yl: () => l });
        var r2 = function() {
          return navigator.userAgent.indexOf("Safari") > -1 && -1 === navigator.userAgent.indexOf("Chrome");
        }, i = function() {
          return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
        }, o = function() {
          try {
            return "undefined" != typeof localStorage;
          } catch (e3) {
            return false;
          }
        }, a = function() {
          return navigator.userAgent.indexOf("iPhone") > -1 ? "touchstart" : "click";
        }, l = function(e3) {
          return navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? !(!e3.metaKey || e3.ctrlKey) : !(e3.metaKey || !e3.ctrlKey);
        }, s = function(e3) {
          return /Mac/.test(navigator.platform) || "iPhone" === navigator.platform ? e3.indexOf("⇧") > -1 && i() && (e3 = e3.replace(";", ":").replace("=", "+").replace("-", "_")) : (e3 = (e3 = e3.startsWith("⌘") ? e3.replace("⌘", "⌘+") : e3.startsWith("⌥") && "⌘" !== e3.substr(1, 1) ? e3.replace("⌥", "⌥+") : e3.replace("⇧⌘", "⌘+⇧+").replace("⌥⌘", "⌥+⌘+")).replace("⌘", "Ctrl").replace("⇧", "Shift").replace("⌥", "Alt")).indexOf("Shift") > -1 && (e3 = e3.replace(";", ":").replace("=", "+").replace("-", "_")), e3;
        }, d = function() {
          return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        };
      }, 835: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { W: () => r2, o: () => i });
        var r2 = function() {
          return ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(e3) {
            return (parseInt(e3, 10) ^ window.crypto.getRandomValues(new Uint32Array(1))[0] & 15 >> parseInt(e3, 10) / 4).toString(16);
          });
        }, i = function(e3, t3) {
          void 0 === t3 && (t3 = window.location.search);
          var n3 = t3.substring(t3.indexOf("?")), r3 = n3.indexOf("#");
          return new URLSearchParams(n3.substring(0, r3 >= 0 ? r3 : void 0)).get(e3);
        };
      }, 827: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { DX: () => u, E2: () => o, F9: () => s, JQ: () => i, O9: () => a, a1: () => l, fb: () => c, lG: () => d });
        var r2 = n2(64), i = function(e3, t3) {
          for (var n3 = c(e3, t3), r3 = false, i2 = false; n3 && !n3.classList.contains("vditor-reset") && !i2; ) (r3 = c(n3.parentElement, t3)) ? n3 = r3 : i2 = true;
          return n3 || false;
        }, o = function(e3, t3) {
          for (var n3 = (0, r2.S)(e3, t3), i2 = false, o2 = false; n3 && !n3.classList.contains("vditor-reset") && !o2; ) (i2 = (0, r2.S)(n3.parentElement, t3)) ? n3 = i2 : o2 = true;
          return n3 || false;
        }, a = function(e3) {
          var t3 = o(e3, "UL"), n3 = o(e3, "OL"), r3 = t3;
          return n3 && (!t3 || t3 && n3.contains(t3)) && (r3 = n3), r3;
        }, l = function(e3, t3, n3) {
          if (!e3) return false;
          3 === e3.nodeType && (e3 = e3.parentElement);
          for (var r3 = e3, i2 = false; r3 && !i2 && !r3.classList.contains("vditor-reset"); ) r3.getAttribute(t3) === n3 ? i2 = true : r3 = r3.parentElement;
          return i2 && r3;
        }, s = function(e3) {
          if (!e3) return false;
          3 === e3.nodeType && (e3 = e3.parentElement);
          var t3 = e3, n3 = false, r3 = l(e3, "data-block", "0");
          if (r3) return r3;
          for (; t3 && !n3 && !t3.classList.contains("vditor-reset"); ) "H1" === t3.tagName || "H2" === t3.tagName || "H3" === t3.tagName || "H4" === t3.tagName || "H5" === t3.tagName || "H6" === t3.tagName || "P" === t3.tagName || "BLOCKQUOTE" === t3.tagName || "OL" === t3.tagName || "UL" === t3.tagName ? n3 = true : t3 = t3.parentElement;
          return n3 && t3;
        }, d = function(e3, t3) {
          if (!e3) return false;
          3 === e3.nodeType && (e3 = e3.parentElement);
          for (var n3 = e3, r3 = false; n3 && !r3 && !n3.classList.contains("vditor-reset"); ) n3.nodeName === t3 ? r3 = true : n3 = n3.parentElement;
          return r3 && n3;
        }, c = function(e3, t3) {
          if (!e3) return false;
          3 === e3.nodeType && (e3 = e3.parentElement);
          for (var n3 = e3, r3 = false; n3 && !r3 && !n3.classList.contains("vditor-reset"); ) n3.classList.contains(t3) ? r3 = true : n3 = n3.parentElement;
          return r3 && n3;
        }, u = function(e3) {
          for (; e3 && e3.lastChild; ) e3 = e3.lastChild;
          return e3;
        };
      }, 64: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { S: () => r2, W: () => i });
        var r2 = function(e3, t3) {
          if (!e3) return false;
          3 === e3.nodeType && (e3 = e3.parentElement);
          for (var n3 = e3, r3 = false; n3 && !r3 && !n3.classList.contains("vditor-reset"); ) 0 === n3.nodeName.indexOf(t3) ? r3 = true : n3 = n3.parentElement;
          return r3 && n3;
        }, i = function(e3) {
          var t3 = r2(e3, "H");
          return !(!t3 || 2 !== t3.tagName.length || "HR" === t3.tagName) && t3;
        };
      }, 640: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { T: () => r2 });
        var r2 = function() {
          for (var e3 = [], t3 = 0; t3 < arguments.length; t3++) e3[t3] = arguments[t3];
          for (var n3 = {}, i = function(e4) {
            for (var t4 in e4) e4.hasOwnProperty(t4) && ("[object Object]" === Object.prototype.toString.call(e4[t4]) ? n3[t4] = r2(n3[t4], e4[t4]) : n3[t4] = e4[t4]);
          }, o = 0; o < e3.length; o++) i(e3[o]);
          return n3;
        };
      }, 393: (e2, t2, n2) => {
        "use strict";
        n2.d(t2, { $j: () => u, Gb: () => s, Hc: () => d, Ny: () => l, ib: () => p, im: () => c, oC: () => m, zh: () => a });
        var r2 = n2(54), i = n2(794), o = n2(827), a = function(e3) {
          var t3, n3 = e3[e3.currentMode].element;
          return getSelection().rangeCount > 0 && (t3 = getSelection().getRangeAt(0), n3.isEqualNode(t3.startContainer) || n3.contains(t3.startContainer)) ? t3 : e3[e3.currentMode].range ? e3[e3.currentMode].range : (n3.focus(), (t3 = n3.ownerDocument.createRange()).setStart(n3, 0), t3.collapse(true), t3);
        }, l = function(e3) {
          var t3 = window.getSelection().getRangeAt(0);
          if (!e3.contains(t3.startContainer) && !(0, o.fb)(t3.startContainer, "vditor-panel--none")) return { left: 0, top: 0 };
          var n3, r3 = e3.parentElement.getBoundingClientRect();
          if (0 === t3.getClientRects().length) if (3 === t3.startContainer.nodeType) {
            var i2 = t3.startContainer.parentElement;
            if (!(i2 && i2.getClientRects().length > 0)) return { left: 0, top: 0 };
            n3 = i2.getClientRects()[0];
          } else {
            var a2 = t3.startContainer.children;
            if (a2[t3.startOffset] && a2[t3.startOffset].getClientRects().length > 0) n3 = a2[t3.startOffset].getClientRects()[0];
            else if (t3.startContainer.childNodes.length > 0) {
              var l2 = t3.cloneRange();
              t3.selectNode(t3.startContainer.childNodes[Math.max(0, t3.startOffset - 1)]), n3 = t3.getClientRects()[0], t3.setEnd(l2.endContainer, l2.endOffset), t3.setStart(l2.startContainer, l2.startOffset);
            } else n3 = t3.startContainer.getClientRects()[0];
            if (!n3) {
              for (var s2 = t3.startContainer.childNodes[t3.startOffset]; !s2.getClientRects || s2.getClientRects && 0 === s2.getClientRects().length; ) s2 = s2.parentElement;
              n3 = s2.getClientRects()[0];
            }
          }
          else n3 = t3.getClientRects()[0];
          return { left: n3.left - r3.left, top: n3.top - r3.top };
        }, s = function(e3, t3) {
          if (!t3) {
            if (0 === getSelection().rangeCount) return false;
            t3 = getSelection().getRangeAt(0);
          }
          var n3 = t3.commonAncestorContainer;
          return e3.isEqualNode(n3) || e3.contains(n3);
        }, d = function(e3) {
          var t3 = window.getSelection();
          t3.removeAllRanges(), t3.addRange(e3);
        }, c = function(e3, t3, n3) {
          var r3 = { end: 0, start: 0 };
          if (!n3) {
            if (0 === getSelection().rangeCount) return r3;
            n3 = window.getSelection().getRangeAt(0);
          }
          if (s(t3, n3)) {
            var i2 = n3.cloneRange();
            e3.childNodes[0] && e3.childNodes[0].childNodes[0] ? i2.setStart(e3.childNodes[0].childNodes[0], 0) : i2.selectNodeContents(e3), i2.setEnd(n3.startContainer, n3.startOffset), r3.start = i2.toString().length, r3.end = r3.start + n3.toString().length;
          }
          return r3;
        }, u = function(e3, t3, n3) {
          var r3 = 0, i2 = 0, o2 = n3.childNodes[i2], a2 = false, l2 = false;
          e3 = Math.max(0, e3), t3 = Math.max(0, t3);
          var s2 = n3.ownerDocument.createRange();
          for (s2.setStart(o2 || n3, 0), s2.collapse(true); !l2 && o2; ) {
            var c2 = r3 + o2.textContent.length;
            if (!a2 && e3 >= r3 && e3 <= c2 && (0 === e3 ? s2.setStart(o2, 0) : 3 === o2.childNodes[0].nodeType ? s2.setStart(o2.childNodes[0], e3 - r3) : o2.nextSibling ? s2.setStartBefore(o2.nextSibling) : s2.setStartAfter(o2), a2 = true, e3 === t3)) {
              l2 = true;
              break;
            }
            a2 && t3 >= r3 && t3 <= c2 && (0 === t3 ? s2.setEnd(o2, 0) : 3 === o2.childNodes[0].nodeType ? s2.setEnd(o2.childNodes[0], t3 - r3) : o2.nextSibling ? s2.setEndBefore(o2.nextSibling) : s2.setEndAfter(o2), l2 = true), r3 = c2, o2 = n3.childNodes[++i2];
          }
          return !l2 && n3.childNodes[i2 - 1] && s2.setStartBefore(n3.childNodes[i2 - 1]), d(s2), s2;
        }, p = function(e3, t3) {
          var n3 = e3.querySelector("wbr");
          if (n3) {
            if (n3.previousElementSibling) if (n3.previousElementSibling.isSameNode(n3.previousSibling)) {
              if (n3.previousElementSibling.lastChild) return t3.setStartBefore(n3), t3.collapse(true), d(t3), !(0, i.i7)() || "EM" !== n3.previousElementSibling.tagName && "STRONG" !== n3.previousElementSibling.tagName && "S" !== n3.previousElementSibling.tagName || (t3.insertNode(document.createTextNode(r2.g.ZWSP)), t3.collapse(false)), void n3.remove();
              t3.setStartAfter(n3.previousElementSibling);
            } else t3.setStart(n3.previousSibling, n3.previousSibling.textContent.length);
            else n3.previousSibling ? t3.setStart(n3.previousSibling, n3.previousSibling.textContent.length) : n3.nextSibling ? 3 === n3.nextSibling.nodeType ? t3.setStart(n3.nextSibling, 0) : t3.setStartBefore(n3.nextSibling) : t3.setStart(n3.parentElement, 0);
            t3.collapse(true), n3.remove(), d(t3);
          }
        }, m = function(e3, t3) {
          var n3 = document.createElement("div");
          n3.innerHTML = e3;
          var r3 = n3.querySelectorAll("p");
          1 === r3.length && !r3[0].previousSibling && !r3[0].nextSibling && t3[t3.currentMode].element.children.length > 0 && "P" === n3.firstElementChild.tagName && (e3 = r3[0].innerHTML.trim());
          var i2 = document.createElement("div");
          i2.innerHTML = e3;
          var l2 = a(t3);
          if ("" !== l2.toString() && (t3[t3.currentMode].preventInput = true, document.execCommand("delete", false, "")), i2.firstElementChild && "0" === i2.firstElementChild.getAttribute("data-block")) {
            i2.lastElementChild.insertAdjacentHTML("beforeend", "<wbr>");
            var s2 = (0, o.F9)(l2.startContainer);
            s2 ? s2.insertAdjacentHTML("afterend", i2.innerHTML) : t3[t3.currentMode].element.insertAdjacentHTML("beforeend", i2.innerHTML), p(t3[t3.currentMode].element, l2);
          } else {
            var c2 = document.createElement("template");
            c2.innerHTML = e3, l2.insertNode(c2.content.cloneNode(true)), l2.collapse(false), d(l2);
          }
        };
      } }, t = {};
      function n(r2) {
        var i = t[r2];
        if (void 0 !== i) return i.exports;
        var o = t[r2] = { exports: {} };
        return e[r2](o, o.exports, n), o.exports;
      }
      n.d = (e2, t2) => {
        for (var r2 in t2) n.o(t2, r2) && !n.o(e2, r2) && Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }, n.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), n.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      };
      var r = {};
      return (() => {
        "use strict";
        n.d(r, { default: () => Zn });
        var e2, t2 = n(872), i = n(54), o = n(51), a = function(e3) {
          return "sv" === e3.currentMode ? (0, o.X)((e3.sv.element.textContent + "\n").replace(/\n\n$/, "\n")) : "wysiwyg" === e3.currentMode ? e3.lute.VditorDOM2Md(e3.wysiwyg.element.innerHTML) : "ir" === e3.currentMode ? e3.lute.VditorIRDOM2Md(e3.ir.element.innerHTML) : "";
        }, l = n(526), s = function() {
          function e3() {
            this.element = document.createElement("div"), this.element.className = "vditor-devtools", this.element.innerHTML = '<div class="vditor-reset--error"></div><div style="height: 100%;"></div>';
          }
          return e3.prototype.renderEchart = function(e4) {
            var t3 = this;
            "block" === e4.devtools.element.style.display && (0, l.G)(e4.options.cdn + "/dist/js/echarts/echarts.min.js", "vditorEchartsScript").then(function() {
              t3.ASTChart || (t3.ASTChart = echarts.init(e4.devtools.element.lastElementChild));
              try {
                t3.element.lastElementChild.style.display = "block", t3.element.firstElementChild.innerHTML = "", t3.ASTChart.setOption({ series: [{ data: JSON.parse(e4.lute.RenderEChartsJSON(a(e4))), initialTreeDepth: -1, label: { align: "left", backgroundColor: "rgba(68, 77, 86, .68)", borderRadius: 3, color: "#d1d5da", fontSize: 12, lineHeight: 12, offset: [9, 12], padding: [2, 4, 2, 4], position: "top", verticalAlign: "middle" }, lineStyle: { color: "#4285f4", type: "curve", width: 1 }, orient: "vertical", roam: true, type: "tree" }], toolbox: { bottom: 25, emphasis: { iconStyle: { color: "#4285f4" } }, feature: { restore: { show: true }, saveAsImage: { show: true } }, right: 15, show: true } }), t3.ASTChart.resize();
              } catch (e5) {
                t3.element.lastElementChild.style.display = "none", t3.element.firstElementChild.innerHTML = e5;
              }
            });
          }, e3;
        }(), d = n(794), c = function(e3, t3) {
          t3.forEach(function(t4) {
            if (e3[t4]) {
              var n2 = e3[t4].children[0];
              n2 && n2.classList.contains("vditor-menu--current") && n2.classList.remove("vditor-menu--current");
            }
          });
        }, u = function(e3, t3) {
          t3.forEach(function(t4) {
            if (e3[t4]) {
              var n2 = e3[t4].children[0];
              n2 && !n2.classList.contains("vditor-menu--current") && n2.classList.add("vditor-menu--current");
            }
          });
        }, p = function(e3, t3) {
          t3.forEach(function(t4) {
            if (e3[t4]) {
              var n2 = e3[t4].children[0];
              n2 && n2.classList.contains(i.g.CLASS_MENU_DISABLED) && n2.classList.remove(i.g.CLASS_MENU_DISABLED);
            }
          });
        }, m = function(e3, t3) {
          t3.forEach(function(t4) {
            if (e3[t4]) {
              var n2 = e3[t4].children[0];
              n2 && !n2.classList.contains(i.g.CLASS_MENU_DISABLED) && n2.classList.add(i.g.CLASS_MENU_DISABLED);
            }
          });
        }, f = function(e3, t3) {
          t3.forEach(function(t4) {
            e3[t4] && e3[t4] && (e3[t4].style.display = "none");
          });
        }, h = function(e3, t3) {
          t3.forEach(function(t4) {
            e3[t4] && e3[t4] && (e3[t4].style.display = "block");
          });
        }, v = function(e3, t3, n2) {
          t3.includes("subToolbar") && (e3.toolbar.element.querySelectorAll(".vditor-hint").forEach(function(e4) {
            n2 && e4.isEqualNode(n2) || (e4.style.display = "none");
          }), e3.toolbar.elements.emoji && (e3.toolbar.elements.emoji.lastElementChild.style.display = "none")), t3.includes("hint") && (e3.hint.element.style.display = "none"), e3.wysiwyg.popover && t3.includes("popover") && (e3.wysiwyg.popover.style.display = "none");
        }, g = function(e3, t3, n2, r2) {
          n2.addEventListener((0, d.Le)(), function(r3) {
            r3.preventDefault(), r3.stopPropagation(), n2.classList.contains(i.g.CLASS_MENU_DISABLED) || (e3.toolbar.element.querySelectorAll(".vditor-hint--current").forEach(function(e4) {
              e4.classList.remove("vditor-hint--current");
            }), "block" === t3.style.display ? t3.style.display = "none" : (v(e3, ["subToolbar", "hint", "popover"], n2.parentElement.parentElement), n2.classList.contains("vditor-tooltipped") || n2.classList.add("vditor-hint--current"), t3.style.display = "block", e3.toolbar.element.getBoundingClientRect().right - n2.getBoundingClientRect().right < 250 ? t3.classList.add("vditor-panel--left") : t3.classList.remove("vditor-panel--left")));
          });
        }, y = n(827), b = n(64), w = function(e3, t3, n2, r2) {
          r2 && console.log(e3 + " - " + n2 + ": " + t3);
        }, E = n(478), k = n(314), S = n(730), L = n(66), T = n(218), M = n(702), C = n(466), A = n(40), _ = n(563), x = n(749), H = n(408), N = function(e3, t3) {
          if (e3) if ("html-block" !== e3.parentElement.getAttribute("data-type")) {
            var n2 = e3.firstElementChild.className.replace("language-", "");
            if ("abc" === n2) (0, E.Q)(e3, t3.options.cdn);
            else if ("mermaid" === n2) (0, A.i)(e3, t3.options.cdn, t3.options.theme);
            else if ("markmap" === n2) (0, _.K)(e3, t3.options.cdn, t3.options.theme);
            else if ("flowchart" === n2) (0, L.P)(e3, t3.options.cdn);
            else if ("echarts" === n2) (0, k.p)(e3, t3.options.cdn, t3.options.theme);
            else if ("mindmap" === n2) (0, x.P)(e3, t3.options.cdn, t3.options.theme);
            else if ("plantuml" === n2) (0, H.B)(e3, t3.options.cdn);
            else if ("graphviz" === n2) (0, T.v)(e3, t3.options.cdn);
            else if ("math" === n2) (0, C.H)(e3, { cdn: t3.options.cdn, math: t3.options.preview.math });
            else {
              t3.options.customRenders.find(function(r2) {
                if (r2.language === n2) return r2.render(e3, t3), true;
              }) || ((0, M.s)(Object.assign({}, t3.options.preview.hljs), e3, t3.options.cdn), (0, S.O)(e3, t3.options.preview.hljs));
            }
            e3.setAttribute("data-render", "1");
          } else e3.setAttribute("data-render", "1");
        }, D = n(393), O = function(e3) {
          if ("sv" !== e3.currentMode) {
            var t3 = e3[e3.currentMode].element, n2 = e3.outline.render(e3);
            "" === n2 && (n2 = "[ToC]"), t3.querySelectorAll('[data-type="toc-block"]').forEach(function(t4) {
              t4.innerHTML = n2, (0, C.H)(t4, { cdn: e3.options.cdn, math: e3.options.preview.math });
            });
          }
        }, I = function(e3, t3) {
          var n2 = (0, y.lG)(e3.target, "SPAN");
          if (n2 && (0, y.fb)(n2, "vditor-toc")) {
            var r2 = t3[t3.currentMode].element.querySelector("#" + n2.getAttribute("data-target-id"));
            if (r2) if ("auto" === t3.options.height) {
              var i2 = r2.offsetTop + t3.element.offsetTop;
              t3.options.toolbarConfig.pin || (i2 += t3.toolbar.element.offsetHeight), window.scrollTo(window.scrollX, i2);
            } else t3.element.offsetTop < window.scrollY && window.scrollTo(window.scrollX, t3.element.offsetTop), t3[t3.currentMode].element.scrollTop = r2.offsetTop;
          } else ;
        }, j = function(e3, t3, n2, r2) {
          if (e3.previousElementSibling && e3.previousElementSibling.classList.contains("vditor-toc")) {
            if ("Backspace" === n2.key && 0 === (0, D.im)(e3, t3[t3.currentMode].element, r2).start) return e3.previousElementSibling.remove(), ct(t3), true;
            if (rt(t3, n2, r2, e3, e3.previousElementSibling)) return true;
          }
          if (e3.nextElementSibling && e3.nextElementSibling.classList.contains("vditor-toc")) {
            if ("Delete" === n2.key && (0, D.im)(e3, t3[t3.currentMode].element, r2).start >= e3.textContent.trimRight().length) return e3.nextElementSibling.remove(), ct(t3), true;
            if (nt(t3, n2, r2, e3, e3.nextElementSibling)) return true;
          }
          if ("Backspace" === n2.key || "Delete" === n2.key) {
            var i2 = (0, y.fb)(r2.startContainer, "vditor-toc");
            if (i2) return i2.remove(), ct(t3), true;
          }
        }, R = function(e3, t3, n2, r2) {
          void 0 === n2 && (n2 = false);
          var o2 = (0, y.F9)(t3.startContainer);
          if (o2 && !n2 && "code-block" !== o2.getAttribute("data-type")) {
            if (st(o2.innerHTML) && o2.previousElementSibling || dt(o2.innerHTML)) return;
            for (var l2 = (0, D.im)(o2, e3.ir.element, t3).start, s2 = true, d2 = l2 - 1; d2 > o2.textContent.substr(0, l2).lastIndexOf("\n"); d2--) if (" " !== o2.textContent.charAt(d2) && "	" !== o2.textContent.charAt(d2)) {
              s2 = false;
              break;
            }
            0 === l2 && (s2 = false);
            var c2 = true;
            for (d2 = l2 - 1; d2 < o2.textContent.length; d2++) if (" " !== o2.textContent.charAt(d2) && "\n" !== o2.textContent.charAt(d2)) {
              c2 = false;
              break;
            }
            if (s2) return void ("function" == typeof e3.options.input && e3.options.input(a(e3)));
            if (c2) {
              if (!(0, y.fb)(t3.startContainer, "vditor-ir__marker")) {
                var u2 = t3.startContainer.previousSibling;
                return u2 && 3 !== u2.nodeType && u2.classList.contains("vditor-ir__node--expand") && u2.classList.remove("vditor-ir__node--expand"), void ("function" == typeof e3.options.input && e3.options.input(a(e3)));
              }
            }
          }
          if (e3.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach(function(e4) {
            e4.classList.remove("vditor-ir__node--expand");
          }), o2 || (o2 = e3.ir.element), !o2.querySelector("wbr")) {
            var p2 = (0, y.fb)(t3.startContainer, "vditor-ir__preview");
            p2 ? p2.previousElementSibling.insertAdjacentHTML("beforeend", "<wbr>") : t3.insertNode(document.createElement("wbr"));
          }
          o2.querySelectorAll("[style]").forEach(function(e4) {
            e4.removeAttribute("style");
          }), "link-ref-defs-block" === o2.getAttribute("data-type") && (o2 = e3.ir.element);
          var m2, f2 = o2.isEqualNode(e3.ir.element), h2 = (0, y.a1)(o2, "data-type", "footnotes-block"), v2 = "";
          if (f2) v2 = o2.innerHTML;
          else {
            var g2 = (0, b.S)(t3.startContainer, "BLOCKQUOTE"), E2 = (0, y.O9)(t3.startContainer);
            if (E2 && (o2 = E2), g2 && (!E2 || E2 && !g2.contains(E2)) && (o2 = g2), h2 && (o2 = h2), v2 = o2.outerHTML, "UL" === o2.tagName || "OL" === o2.tagName) {
              var k2 = o2.previousElementSibling, S2 = o2.nextElementSibling;
              !k2 || "UL" !== k2.tagName && "OL" !== k2.tagName || (v2 = k2.outerHTML + v2, k2.remove()), !S2 || "UL" !== S2.tagName && "OL" !== S2.tagName || (v2 += S2.outerHTML, S2.remove()), v2 = v2.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
            } else o2.previousElementSibling && "" !== o2.previousElementSibling.textContent.replace(i.g.ZWSP, "") && r2 && "insertParagraph" === r2.inputType && (v2 = o2.previousElementSibling.outerHTML + v2, o2.previousElementSibling.remove());
            o2.innerText.startsWith("```") || (e3.ir.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(e4) {
              e4 && !o2.isEqualNode(e4) && (v2 += e4.outerHTML, e4.remove());
            }), e3.ir.element.querySelectorAll("[data-type='footnotes-block']").forEach(function(e4) {
              e4 && !o2.isEqualNode(e4) && (v2 += e4.outerHTML, e4.remove());
            }));
          }
          if (w("SpinVditorIRDOM", v2, "argument", e3.options.debugger), v2 = e3.lute.SpinVditorIRDOM(v2), w("SpinVditorIRDOM", v2, "result", e3.options.debugger), f2) o2.innerHTML = v2;
          else if (o2.outerHTML = v2, h2) {
            var L2 = (0, y.a1)(e3.ir.element.querySelector("wbr"), "data-type", "footnotes-def");
            if (L2) {
              var T2 = L2.textContent, M2 = T2.substring(1, T2.indexOf("]:")), C2 = e3.ir.element.querySelector('sup[data-type="footnotes-ref"][data-footnotes-label="' + M2 + '"]');
              C2 && C2.setAttribute("aria-label", T2.substr(M2.length + 3).trim().substr(0, 24));
            }
          }
          var A2, _2 = e3.ir.element.querySelectorAll("[data-type='link-ref-defs-block']");
          _2.forEach(function(e4, t4) {
            0 === t4 ? m2 = e4 : (m2.insertAdjacentHTML("beforeend", e4.innerHTML), e4.remove());
          }), _2.length > 0 && e3.ir.element.insertAdjacentElement("beforeend", _2[0]);
          var x2 = e3.ir.element.querySelectorAll("[data-type='footnotes-block']");
          x2.forEach(function(e4, t4) {
            0 === t4 ? A2 = e4 : (A2.insertAdjacentHTML("beforeend", e4.innerHTML), e4.remove());
          }), x2.length > 0 && e3.ir.element.insertAdjacentElement("beforeend", x2[0]), (0, D.ib)(e3.ir.element, t3), e3.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(t4) {
            N(t4, e3);
          }), O(e3), At(e3, { enableAddUndoStack: true, enableHint: true, enableInput: true });
        }, P = function(e3, t3) {
          if ("" === e3) return false;
          if (-1 === e3.indexOf("⇧") && -1 === e3.indexOf("⌘") && -1 === e3.indexOf("⌥")) return !((0, d.yl)(t3) || t3.altKey || t3.shiftKey || t3.code !== e3);
          if ("⇧Tab" === e3) return !((0, d.yl)(t3) || t3.altKey || !t3.shiftKey || "Tab" !== t3.code);
          var n2 = e3.split("");
          if (e3.startsWith("⌥")) {
            var r2 = 3 === n2.length ? n2[2] : n2[1];
            return !((3 === n2.length ? !(0, d.yl)(t3) : (0, d.yl)(t3)) || !t3.altKey || t3.shiftKey || t3.code !== (/^[0-9]$/.test(r2) ? "Digit" : "Key") + r2);
          }
          "⌘Enter" === e3 && (n2 = ["⌘", "Enter"]);
          var i2 = n2.length > 2 && "⇧" === n2[0], o2 = i2 ? n2[2] : n2[1];
          return !i2 || !(0, d.vU)() && /Mac/.test(navigator.platform) || ("-" === o2 ? o2 = "_" : "=" === o2 && (o2 = "+")), !(!(0, d.yl)(t3) || t3.key.toLowerCase() !== o2.toLowerCase() || t3.altKey || !(!i2 && !t3.shiftKey || i2 && t3.shiftKey));
        }, q = function(e3, t3) {
          t3.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach(function(e4) {
            e4.classList.remove("vditor-ir__node--expand");
          });
          var n2 = (0, y.JQ)(e3.startContainer, "vditor-ir__node"), r2 = !e3.collapsed && (0, y.JQ)(e3.endContainer, "vditor-ir__node");
          if (e3.collapsed || n2 && n2 === r2) {
            n2 && (n2.classList.add("vditor-ir__node--expand"), n2.classList.remove("vditor-ir__node--hidden"), (0, D.Hc)(e3));
            var i2 = function(e4) {
              var t4 = e4.startContainer;
              if (3 === t4.nodeType && t4.nodeValue.length !== e4.startOffset) return false;
              for (var n3 = t4.nextSibling; n3 && "" === n3.textContent; ) n3 = n3.nextSibling;
              if (!n3) {
                var r3 = (0, y.fb)(t4, "vditor-ir__marker");
                if (r3 && !r3.nextSibling) {
                  var i3 = t4.parentElement.parentElement.nextSibling;
                  if (i3 && 3 !== i3.nodeType && i3.classList.contains("vditor-ir__node")) return i3;
                }
                return false;
              }
              return !(!n3 || 3 === n3.nodeType || !n3.classList.contains("vditor-ir__node") || n3.getAttribute("data-block")) && n3;
            }(e3);
            if (i2) return i2.classList.add("vditor-ir__node--expand"), void i2.classList.remove("vditor-ir__node--hidden");
            var o2 = function(e4) {
              var t4 = e4.startContainer, n3 = t4.previousSibling;
              return !(3 !== t4.nodeType || 0 !== e4.startOffset || !n3 || 3 === n3.nodeType || !n3.classList.contains("vditor-ir__node") || n3.getAttribute("data-block")) && n3;
            }(e3);
            return o2 ? (o2.classList.add("vditor-ir__node--expand"), void o2.classList.remove("vditor-ir__node--hidden")) : void 0;
          }
        }, B = n(863), V = function(e3, t3) {
          e3.querySelectorAll("[data-type=footnotes-link]").forEach(function(e4) {
            for (var n2 = e4.parentElement, r2 = n2.nextSibling; r2 && r2.textContent.startsWith("    "); ) {
              var i2 = r2;
              i2.childNodes.forEach(function(e5) {
                n2.append(e5.cloneNode(true));
              }), r2 = r2.nextSibling, i2.remove();
            }
            t3 && t3(n2);
          });
        }, U = function(e3, t3) {
          var n2, r2 = getSelection().getRangeAt(0).cloneRange(), i2 = r2.startContainer;
          3 !== r2.startContainer.nodeType && "DIV" === r2.startContainer.tagName && (i2 = r2.startContainer.childNodes[r2.startOffset - 1]);
          var o2 = (0, y.a1)(i2, "data-block", "0");
          if (o2 && t3 && ("deleteContentBackward" === t3.inputType || " " === t3.data)) {
            for (var a2 = (0, D.im)(o2, e3.sv.element, r2).start, l2 = true, s2 = a2 - 1; s2 > o2.textContent.substr(0, a2).lastIndexOf("\n"); s2--) if (" " !== o2.textContent.charAt(s2) && "	" !== o2.textContent.charAt(s2)) {
              l2 = false;
              break;
            }
            if (0 === a2 && (l2 = false), l2) return void je(e3);
            if ("deleteContentBackward" === t3.inputType) {
              var d2 = (0, y.a1)(i2, "data-type", "code-block-open-marker") || (0, y.a1)(i2, "data-type", "code-block-close-marker");
              if (d2) {
                var c2;
                if ("code-block-close-marker" === d2.getAttribute("data-type")) {
                  if (c2 = De(i2, "code-block-open-marker")) return c2.textContent = d2.textContent, void je(e3);
                }
                if ("code-block-open-marker" === d2.getAttribute("data-type")) {
                  if (c2 = De(i2, "code-block-close-marker", false)) return c2.textContent = d2.textContent, void je(e3);
                }
              }
              var u2 = (0, y.a1)(i2, "data-type", "math-block-open-marker");
              if (u2) {
                var p2 = u2.nextElementSibling.nextElementSibling;
                return void (p2 && "math-block-close-marker" === p2.getAttribute("data-type") && (p2.remove(), je(e3)));
              }
              o2.querySelectorAll('[data-type="code-block-open-marker"]').forEach(function(e4) {
                1 === e4.textContent.length && e4.remove();
              }), o2.querySelectorAll('[data-type="code-block-close-marker"]').forEach(function(e4) {
                1 === e4.textContent.length && e4.remove();
              });
              var m2 = (0, y.a1)(i2, "data-type", "heading-marker");
              if (m2 && -1 === m2.textContent.indexOf("#")) return void je(e3);
            }
            if ((" " === t3.data || "deleteContentBackward" === t3.inputType) && ((0, y.a1)(i2, "data-type", "padding") || (0, y.a1)(i2, "data-type", "li-marker") || (0, y.a1)(i2, "data-type", "task-marker") || (0, y.a1)(i2, "data-type", "blockquote-marker"))) return void je(e3);
          }
          if (o2 && "$$" === o2.textContent.trimRight()) je(e3);
          else {
            o2 || (o2 = e3.sv.element), "link-ref-defs-block" === (null === (n2 = o2.firstElementChild) || void 0 === n2 ? void 0 : n2.getAttribute("data-type")) && (o2 = e3.sv.element), (0, y.a1)(i2, "data-type", "footnotes-link") && (o2 = e3.sv.element), -1 === o2.textContent.indexOf(Lute.Caret) && r2.insertNode(document.createTextNode(Lute.Caret)), o2.querySelectorAll("[style]").forEach(function(e4) {
              e4.removeAttribute("style");
            }), o2.querySelectorAll("font").forEach(function(e4) {
              e4.outerHTML = e4.innerHTML;
            });
            var f2 = o2.textContent, h2 = o2.isEqualNode(e3.sv.element);
            if (h2) f2 = o2.textContent;
            else {
              o2.previousElementSibling && (f2 = o2.previousElementSibling.textContent + f2, o2.previousElementSibling.remove()), o2.previousElementSibling && 0 === f2.indexOf("---\n") && (f2 = o2.previousElementSibling.textContent + f2, o2.previousElementSibling.remove());
              var v2 = "";
              e3.sv.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(e4, t4) {
                e4 && !o2.isEqualNode(e4.parentElement) && (v2 += e4.parentElement.textContent + "\n", e4.parentElement.remove());
              }), e3.sv.element.querySelectorAll("[data-type='footnotes-link']").forEach(function(e4, t4) {
                e4 && !o2.isEqualNode(e4.parentElement) && (v2 += e4.parentElement.textContent + "\n", e4.parentElement.remove());
              }), f2 = v2 + f2;
            }
            f2 = Oe(f2, e3), h2 ? o2.innerHTML = f2 : o2.outerHTML = f2, e3.sv.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(t4) {
              e3.sv.element.insertAdjacentElement("beforeend", t4.parentElement);
            }), V(e3.sv.element, function(t4) {
              e3.sv.element.insertAdjacentElement("beforeend", t4);
            }), (0, D.ib)(e3.sv.element, r2), _e(e3), je(e3, { enableAddUndoStack: true, enableHint: true, enableInput: true });
          }
        }, W = n(227), G = function(e3) {
          "dark" === e3.options.theme ? e3.element.classList.add("vditor--dark") : e3.element.classList.remove("vditor--dark");
        }, z = function(e3) {
          var t3 = window.innerWidth <= i.g.MOBILE_WIDTH ? 10 : 35;
          if ("none" !== e3.wysiwyg.element.parentElement.style.display) {
            var n2 = (e3.wysiwyg.element.parentElement.clientWidth - e3.options.preview.maxWidth) / 2;
            e3.wysiwyg.element.style.padding = "10px " + Math.max(t3, n2) + "px";
          }
          if ("none" !== e3.ir.element.parentElement.style.display) {
            n2 = (e3.ir.element.parentElement.clientWidth - e3.options.preview.maxWidth) / 2;
            e3.ir.element.style.padding = "10px " + Math.max(t3, n2) + "px";
          }
          "block" !== e3.preview.element.style.display ? e3.toolbar.element.style.paddingLeft = Math.max(5, parseInt(e3[e3.currentMode].element.style.paddingLeft || "0", 10) + ("left" === e3.options.outline.position ? e3.outline.element.offsetWidth : 0)) + "px" : e3.toolbar.element.style.paddingLeft = 5 + ("left" === e3.options.outline.position ? e3.outline.element.offsetWidth : 0) + "px";
        }, K = function(e3) {
          if (e3.options.typewriterMode) {
            var t3 = window.innerHeight;
            "number" == typeof e3.options.height ? (t3 = e3.options.height, "number" == typeof e3.options.minHeight && (t3 = Math.max(t3, e3.options.minHeight)), t3 = Math.min(window.innerHeight, t3)) : t3 = e3.element.clientHeight, e3.element.classList.contains("vditor--fullscreen") && (t3 = window.innerHeight), e3[e3.currentMode].element.style.setProperty("--editor-bottom", (t3 - e3.toolbar.element.offsetHeight) / 2 + "px");
          }
        };
        function F() {
          window.removeEventListener("resize", e2);
        }
        var Z, J, X = function(t3) {
          K(t3), F(), window.addEventListener("resize", e2 = function() {
            z(t3), K(t3);
          });
          var n2 = (0, d.pK)() && localStorage.getItem(t3.options.cache.id);
          return t3.options.cache.enable && n2 || (t3.options.value ? n2 = t3.options.value : t3.originalInnerHTML ? n2 = t3.lute.HTML2Md(t3.originalInnerHTML) : t3.options.cache.enable || (n2 = "")), n2 || "";
        }, Y = function(e3) {
          clearTimeout(e3[e3.currentMode].hlToolbarTimeoutId), e3[e3.currentMode].hlToolbarTimeoutId = window.setTimeout(function() {
            if ("false" !== e3[e3.currentMode].element.getAttribute("contenteditable") && (0, D.Gb)(e3[e3.currentMode].element)) {
              c(e3.toolbar.elements, i.g.EDIT_TOOLBARS), p(e3.toolbar.elements, i.g.EDIT_TOOLBARS);
              var t3 = (0, D.zh)(e3), n2 = t3.startContainer;
              3 === t3.startContainer.nodeType && (n2 = t3.startContainer.parentElement), n2.classList.contains("vditor-reset") && (n2 = n2.childNodes[t3.startOffset]), ("sv" === e3.currentMode ? (0, y.a1)(n2, "data-type", "heading") : (0, b.W)(n2)) && u(e3.toolbar.elements, ["headings"]), ("sv" === e3.currentMode ? (0, y.a1)(n2, "data-type", "blockquote") : (0, y.lG)(n2, "BLOCKQUOTE")) && u(e3.toolbar.elements, ["quote"]), (0, y.a1)(n2, "data-type", "strong") && u(e3.toolbar.elements, ["bold"]), (0, y.a1)(n2, "data-type", "em") && u(e3.toolbar.elements, ["italic"]), (0, y.a1)(n2, "data-type", "s") && u(e3.toolbar.elements, ["strike"]), (0, y.a1)(n2, "data-type", "a") && u(e3.toolbar.elements, ["link"]);
              var r2 = (0, y.lG)(n2, "LI");
              r2 ? (r2.classList.contains("vditor-task") ? u(e3.toolbar.elements, ["check"]) : "OL" === r2.parentElement.tagName ? u(e3.toolbar.elements, ["ordered-list"]) : "UL" === r2.parentElement.tagName && u(e3.toolbar.elements, ["list"]), p(e3.toolbar.elements, ["outdent", "indent"])) : m(e3.toolbar.elements, ["outdent", "indent"]), (0, y.a1)(n2, "data-type", "code-block") && (m(e3.toolbar.elements, ["headings", "bold", "italic", "strike", "line", "quote", "list", "ordered-list", "check", "code", "inline-code", "upload", "link", "table", "record"]), u(e3.toolbar.elements, ["code"])), (0, y.a1)(n2, "data-type", "code") && (m(e3.toolbar.elements, ["headings", "bold", "italic", "strike", "line", "quote", "list", "ordered-list", "check", "code", "upload", "link", "table", "record"]), u(e3.toolbar.elements, ["inline-code"])), (0, y.a1)(n2, "data-type", "table") && m(e3.toolbar.elements, ["headings", "list", "ordered-list", "check", "line", "quote", "code", "table"]);
            }
          }, 200);
        }, Q = function(e3, t3) {
          void 0 === t3 && (t3 = { enableAddUndoStack: true, enableHint: false, enableInput: true }), t3.enableHint && e3.hint.render(e3), clearTimeout(e3.wysiwyg.afterRenderTimeoutId), e3.wysiwyg.afterRenderTimeoutId = window.setTimeout(function() {
            if (!e3.wysiwyg.composingLock) {
              var n2 = a(e3);
              "function" == typeof e3.options.input && t3.enableInput && e3.options.input(n2), e3.options.counter.enable && e3.counter.render(e3, n2), e3.options.cache.enable && (0, d.pK)() && (localStorage.setItem(e3.options.cache.id, n2), e3.options.cache.after && e3.options.cache.after(n2)), e3.devtools && e3.devtools.renderEchart(e3), t3.enableAddUndoStack && e3.undo.addToUndoStack(e3);
            }
          }, e3.options.undoDelay);
        }, $ = function(e3) {
          for (var t3 = "", n2 = e3.nextSibling; n2; ) 3 === n2.nodeType ? t3 += n2.textContent : t3 += n2.outerHTML, n2 = n2.nextSibling;
          return t3;
        }, ee = function(e3) {
          for (var t3 = "", n2 = e3.previousSibling; n2; ) t3 = 3 === n2.nodeType ? n2.textContent + t3 : n2.outerHTML + t3, n2 = n2.previousSibling;
          return t3;
        }, te = function(e3, t3) {
          Array.from(e3.wysiwyg.element.childNodes).find(function(n2) {
            if (3 === n2.nodeType) {
              var r2 = document.createElement("p");
              r2.setAttribute("data-block", "0"), r2.textContent = n2.textContent;
              var i2 = 3 === t3.startContainer.nodeType ? t3.startOffset : n2.textContent.length;
              return n2.parentNode.insertBefore(r2, n2), n2.remove(), t3.setStart(r2.firstChild, Math.min(r2.firstChild.textContent.length, i2)), t3.collapse(true), (0, D.Hc)(t3), true;
            }
            if (!n2.getAttribute("data-block")) return "P" === n2.tagName ? n2.remove() : ("DIV" === n2.tagName ? (t3.insertNode(document.createElement("wbr")), n2.outerHTML = '<p data-block="0">' + n2.innerHTML + "</p>") : "BR" === n2.tagName ? n2.outerHTML = '<p data-block="0">' + n2.outerHTML + "<wbr></p>" : (t3.insertNode(document.createElement("wbr")), n2.outerHTML = '<p data-block="0">' + n2.outerHTML + "</p>"), (0, D.ib)(e3.wysiwyg.element, t3), t3 = getSelection().getRangeAt(0)), true;
          });
        }, ne = function(e3, t3) {
          var n2 = (0, D.zh)(e3), r2 = (0, y.F9)(n2.startContainer);
          r2 || (r2 = n2.startContainer.childNodes[n2.startOffset]), r2 || 0 !== e3.wysiwyg.element.children.length || (r2 = e3.wysiwyg.element), r2 && !r2.classList.contains("vditor-wysiwyg__block") && (n2.insertNode(document.createElement("wbr")), "<wbr>" === r2.innerHTML.trim() && (r2.innerHTML = "<wbr><br>"), "BLOCKQUOTE" === r2.tagName || r2.classList.contains("vditor-reset") ? r2.innerHTML = "<" + t3 + ' data-block="0">' + r2.innerHTML.trim() + "</" + t3 + ">" : r2.outerHTML = "<" + t3 + ' data-block="0">' + r2.innerHTML.trim() + "</" + t3 + ">", (0, D.ib)(e3.wysiwyg.element, n2), O(e3));
        }, re = function(e3) {
          var t3 = getSelection().getRangeAt(0), n2 = (0, y.F9)(t3.startContainer);
          n2 || (n2 = t3.startContainer.childNodes[t3.startOffset]), n2 && (t3.insertNode(document.createElement("wbr")), n2.outerHTML = '<p data-block="0">' + n2.innerHTML + "</p>", (0, D.ib)(e3.wysiwyg.element, t3)), e3.wysiwyg.popover.style.display = "none";
        }, ie = function(e3, t3, n2) {
          void 0 === n2 && (n2 = true);
          var r2 = e3.previousElementSibling, i2 = r2.ownerDocument.createRange();
          "CODE" === r2.tagName ? (r2.style.display = "inline-block", n2 ? i2.setStart(r2.firstChild, 1) : i2.selectNodeContents(r2)) : (r2.style.display = "block", r2.firstChild.firstChild || r2.firstChild.appendChild(document.createTextNode("")), i2.selectNodeContents(r2.firstChild)), n2 ? i2.collapse(true) : i2.collapse(false), (0, D.Hc)(i2), e3.firstElementChild.classList.contains("language-mindmap") || _e(t3);
        }, oe = function(e3, t3) {
          if (P("⇧⌘X", t3)) {
            var n2 = e3.wysiwyg.popover.querySelector('[data-type="remove"]');
            return n2 && n2.click(), t3.preventDefault(), true;
          }
        }, ae = function(e3) {
          clearTimeout(e3.wysiwyg.hlToolbarTimeoutId), e3.wysiwyg.hlToolbarTimeoutId = window.setTimeout(function() {
            if ("false" !== e3.wysiwyg.element.getAttribute("contenteditable") && (0, D.Gb)(e3.wysiwyg.element)) {
              c(e3.toolbar.elements, i.g.EDIT_TOOLBARS), p(e3.toolbar.elements, i.g.EDIT_TOOLBARS);
              var t3 = getSelection().getRangeAt(0), n2 = t3.startContainer;
              n2 = 3 === t3.startContainer.nodeType ? t3.startContainer.parentElement : n2.childNodes[t3.startOffset >= n2.childNodes.length ? n2.childNodes.length - 1 : t3.startOffset];
              var r2 = (0, y.a1)(n2, "data-type", "footnotes-block");
              if (r2) return e3.wysiwyg.popover.innerHTML = "", ue(r2, e3), void le(e3, r2);
              var o2 = (0, y.lG)(n2, "LI");
              o2 ? (o2.classList.contains("vditor-task") ? u(e3.toolbar.elements, ["check"]) : "OL" === o2.parentElement.tagName ? u(e3.toolbar.elements, ["ordered-list"]) : "UL" === o2.parentElement.tagName && u(e3.toolbar.elements, ["list"]), p(e3.toolbar.elements, ["outdent", "indent"])) : m(e3.toolbar.elements, ["outdent", "indent"]), (0, y.lG)(n2, "BLOCKQUOTE") && u(e3.toolbar.elements, ["quote"]), ((0, y.lG)(n2, "B") || (0, y.lG)(n2, "STRONG")) && u(e3.toolbar.elements, ["bold"]), ((0, y.lG)(n2, "I") || (0, y.lG)(n2, "EM")) && u(e3.toolbar.elements, ["italic"]), ((0, y.lG)(n2, "STRIKE") || (0, y.lG)(n2, "S")) && u(e3.toolbar.elements, ["strike"]), e3.wysiwyg.element.querySelectorAll(".vditor-comment--focus").forEach(function(e4) {
                e4.classList.remove("vditor-comment--focus");
              });
              var l2 = (0, y.fb)(n2, "vditor-comment");
              if (l2) {
                var s2 = l2.getAttribute("data-cmtids").split(" ");
                if (s2.length > 1 && l2.nextSibling.isSameNode(l2.nextElementSibling)) {
                  var f2 = l2.nextElementSibling.getAttribute("data-cmtids").split(" ");
                  s2.find(function(e4) {
                    if (f2.includes(e4)) return s2 = [e4], true;
                  });
                }
                e3.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(e4) {
                  e4.getAttribute("data-cmtids").indexOf(s2[0]) > -1 && e4.classList.add("vditor-comment--focus");
                });
              }
              var h2 = (0, y.lG)(n2, "A");
              h2 && u(e3.toolbar.elements, ["link"]);
              var v2 = (0, y.lG)(n2, "TABLE"), g2 = (0, b.W)(n2);
              (0, y.lG)(n2, "CODE") ? (0, y.lG)(n2, "PRE") ? (m(e3.toolbar.elements, ["headings", "bold", "italic", "strike", "line", "quote", "list", "ordered-list", "check", "code", "inline-code", "upload", "link", "table", "record"]), u(e3.toolbar.elements, ["code"])) : (m(e3.toolbar.elements, ["headings", "bold", "italic", "strike", "line", "quote", "list", "ordered-list", "check", "code", "upload", "link", "table", "record"]), u(e3.toolbar.elements, ["inline-code"])) : g2 ? (m(e3.toolbar.elements, ["bold"]), u(e3.toolbar.elements, ["headings"])) : v2 && m(e3.toolbar.elements, ["table"]);
              var w2 = (0, y.fb)(n2, "vditor-toc");
              if (w2) return e3.wysiwyg.popover.innerHTML = "", ue(w2, e3), void le(e3, w2);
              var E2 = (0, b.S)(n2, "BLOCKQUOTE");
              if (E2 && (e3.wysiwyg.popover.innerHTML = "", de(t3, E2, e3), ce(t3, E2, e3), ue(E2, e3), le(e3, E2)), o2 && (e3.wysiwyg.popover.innerHTML = "", de(t3, o2, e3), ce(t3, o2, e3), ue(o2, e3), le(e3, o2)), v2) {
                e3.options.lang, e3.options;
                e3.wysiwyg.popover.innerHTML = "";
                var k2 = function() {
                  var t4 = v2.rows.length, n3 = v2.rows[0].cells.length, r3 = parseInt(P2.value, 10) || t4, i2 = parseInt(B2.value, 10) || n3;
                  if (r3 !== t4 || n3 !== i2) {
                    if (n3 !== i2) for (var o3 = i2 - n3, l3 = 0; l3 < v2.rows.length; l3++) if (o3 > 0) for (var s3 = 0; s3 < o3; s3++) 0 === l3 ? v2.rows[l3].lastElementChild.insertAdjacentHTML("afterend", "<th> </th>") : v2.rows[l3].lastElementChild.insertAdjacentHTML("afterend", "<td> </td>");
                    else for (var d2 = n3 - 1; d2 >= i2; d2--) v2.rows[l3].cells[d2].remove();
                    if (t4 !== r3) {
                      var c2 = r3 - t4;
                      if (c2 > 0) {
                        for (var u2 = "<tr>", p2 = 0; p2 < i2; p2++) u2 += "<td> </td>";
                        for (var m2 = 0; m2 < c2; m2++) v2.querySelector("tbody") ? v2.querySelector("tbody").insertAdjacentHTML("beforeend", u2) : v2.querySelector("thead").insertAdjacentHTML("afterend", u2 + "</tr>");
                      } else for (p2 = t4 - 1; p2 >= r3; p2--) v2.rows[p2].remove(), 1 === v2.rows.length && v2.querySelector("tbody").remove();
                    }
                    "function" == typeof e3.options.input && e3.options.input(a(e3));
                  }
                }, S2 = function(n3) {
                  lt(v2, n3), "right" === n3 ? (C2.classList.remove("vditor-icon--current"), A2.classList.remove("vditor-icon--current"), _2.classList.add("vditor-icon--current")) : "center" === n3 ? (C2.classList.remove("vditor-icon--current"), _2.classList.remove("vditor-icon--current"), A2.classList.add("vditor-icon--current")) : (A2.classList.remove("vditor-icon--current"), _2.classList.remove("vditor-icon--current"), C2.classList.add("vditor-icon--current")), (0, D.Hc)(t3), Q(e3);
                }, L2 = (0, y.lG)(n2, "TD"), T2 = (0, y.lG)(n2, "TH"), M2 = "left";
                L2 ? M2 = L2.getAttribute("align") || "left" : T2 && (M2 = T2.getAttribute("align") || "center");
                var C2 = document.createElement("button");
                C2.setAttribute("type", "button"), C2.setAttribute("aria-label", window.VditorI18n.alignLeft + "<" + (0, d.ns)("⇧⌘L") + ">"), C2.setAttribute("data-type", "left"), C2.innerHTML = '<svg><use xlink:href="#vditor-icon-align-left"></use></svg>', C2.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + ("left" === M2 ? " vditor-icon--current" : ""), C2.onclick = function() {
                  S2("left");
                };
                var A2 = document.createElement("button");
                A2.setAttribute("type", "button"), A2.setAttribute("aria-label", window.VditorI18n.alignCenter + "<" + (0, d.ns)("⇧⌘C") + ">"), A2.setAttribute("data-type", "center"), A2.innerHTML = '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>', A2.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + ("center" === M2 ? " vditor-icon--current" : ""), A2.onclick = function() {
                  S2("center");
                };
                var _2 = document.createElement("button");
                _2.setAttribute("type", "button"), _2.setAttribute("aria-label", window.VditorI18n.alignRight + "<" + (0, d.ns)("⇧⌘R") + ">"), _2.setAttribute("data-type", "right"), _2.innerHTML = '<svg><use xlink:href="#vditor-icon-align-right"></use></svg>', _2.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + ("right" === M2 ? " vditor-icon--current" : ""), _2.onclick = function() {
                  S2("right");
                };
                var x2 = document.createElement("button");
                x2.setAttribute("type", "button"), x2.setAttribute("aria-label", window.VditorI18n.insertRowBelow + "<" + (0, d.ns)("⌘=") + ">"), x2.setAttribute("data-type", "insertRow"), x2.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-row"></use></svg>', x2.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", x2.onclick = function() {
                  var n3 = getSelection().getRangeAt(0).startContainer, r3 = (0, y.lG)(n3, "TD") || (0, y.lG)(n3, "TH");
                  r3 && ft(e3, t3, r3);
                };
                var H2 = document.createElement("button");
                H2.setAttribute("type", "button"), H2.setAttribute("aria-label", window.VditorI18n.insertRowAbove + "<" + (0, d.ns)("⇧⌘F") + ">"), H2.setAttribute("data-type", "insertRow"), H2.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-rowb"></use></svg>', H2.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", H2.onclick = function() {
                  var n3 = getSelection().getRangeAt(0).startContainer, r3 = (0, y.lG)(n3, "TD") || (0, y.lG)(n3, "TH");
                  r3 && ht(e3, t3, r3);
                };
                var O2 = document.createElement("button");
                O2.setAttribute("type", "button"), O2.setAttribute("aria-label", window.VditorI18n.insertColumnRight + "<" + (0, d.ns)("⇧⌘=") + ">"), O2.setAttribute("data-type", "insertColumn"), O2.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-column"></use></svg>', O2.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", O2.onclick = function() {
                  var t4 = getSelection().getRangeAt(0).startContainer, n3 = (0, y.lG)(t4, "TD") || (0, y.lG)(t4, "TH");
                  n3 && vt(e3, v2, n3);
                };
                var I2 = document.createElement("button");
                I2.setAttribute("type", "button"), I2.setAttribute("aria-label", window.VditorI18n.insertColumnLeft + "<" + (0, d.ns)("⇧⌘G") + ">"), I2.setAttribute("data-type", "insertColumn"), I2.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-columnb"></use></svg>', I2.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", I2.onclick = function() {
                  var t4 = getSelection().getRangeAt(0).startContainer, n3 = (0, y.lG)(t4, "TD") || (0, y.lG)(t4, "TH");
                  n3 && vt(e3, v2, n3, "beforebegin");
                };
                var j2 = document.createElement("button");
                j2.setAttribute("type", "button"), j2.setAttribute("aria-label", window.VditorI18n["delete-row"] + "<" + (0, d.ns)("⌘-") + ">"), j2.setAttribute("data-type", "deleteRow"), j2.innerHTML = '<svg><use xlink:href="#vditor-icon-delete-row"></use></svg>', j2.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", j2.onclick = function() {
                  var n3 = getSelection().getRangeAt(0).startContainer, r3 = (0, y.lG)(n3, "TD") || (0, y.lG)(n3, "TH");
                  r3 && gt(e3, t3, r3);
                };
                var R2 = document.createElement("button");
                R2.setAttribute("type", "button"), R2.setAttribute("aria-label", window.VditorI18n["delete-column"] + "<" + (0, d.ns)("⇧⌘-") + ">"), R2.setAttribute("data-type", "deleteColumn"), R2.innerHTML = '<svg><use xlink:href="#vditor-icon-delete-column"></use></svg>', R2.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", R2.onclick = function() {
                  var n3 = getSelection().getRangeAt(0).startContainer, r3 = (0, y.lG)(n3, "TD") || (0, y.lG)(n3, "TH");
                  r3 && yt(e3, t3, v2, r3);
                }, (J2 = document.createElement("span")).setAttribute("aria-label", window.VditorI18n.row), J2.className = "vditor-tooltipped vditor-tooltipped__n";
                var P2 = document.createElement("input");
                J2.appendChild(P2), P2.type = "number", P2.min = "1", P2.className = "vditor-input", P2.style.width = "42px", P2.style.textAlign = "center", P2.setAttribute("placeholder", window.VditorI18n.row), P2.value = v2.rows.length.toString(), P2.oninput = function() {
                  k2();
                }, P2.onkeydown = function(n3) {
                  if (!n3.isComposing) return "Tab" === n3.key ? (B2.focus(), B2.select(), void n3.preventDefault()) : void (oe(e3, n3) || fe(n3, t3));
                };
                var q2 = document.createElement("span");
                q2.setAttribute("aria-label", window.VditorI18n.column), q2.className = "vditor-tooltipped vditor-tooltipped__n";
                var B2 = document.createElement("input");
                q2.appendChild(B2), B2.type = "number", B2.min = "1", B2.className = "vditor-input", B2.style.width = "42px", B2.style.textAlign = "center", B2.setAttribute("placeholder", window.VditorI18n.column), B2.value = v2.rows[0].cells.length.toString(), B2.oninput = function() {
                  k2();
                }, B2.onkeydown = function(n3) {
                  if (!n3.isComposing) return "Tab" === n3.key ? (P2.focus(), P2.select(), void n3.preventDefault()) : void (oe(e3, n3) || fe(n3, t3));
                }, de(t3, v2, e3), ce(t3, v2, e3), ue(v2, e3), e3.wysiwyg.popover.insertAdjacentElement("beforeend", C2), e3.wysiwyg.popover.insertAdjacentElement("beforeend", A2), e3.wysiwyg.popover.insertAdjacentElement("beforeend", _2), e3.wysiwyg.popover.insertAdjacentElement("beforeend", H2), e3.wysiwyg.popover.insertAdjacentElement("beforeend", x2), e3.wysiwyg.popover.insertAdjacentElement("beforeend", I2), e3.wysiwyg.popover.insertAdjacentElement("beforeend", O2), e3.wysiwyg.popover.insertAdjacentElement("beforeend", j2), e3.wysiwyg.popover.insertAdjacentElement("beforeend", R2), e3.wysiwyg.popover.insertAdjacentElement("beforeend", J2), e3.wysiwyg.popover.insertAdjacentHTML("beforeend", " x "), e3.wysiwyg.popover.insertAdjacentElement("beforeend", q2), le(e3, v2);
              }
              var V2 = (0, y.a1)(n2, "data-type", "link-ref");
              V2 && se(e3, V2, t3);
              var U2 = (0, y.a1)(n2, "data-type", "footnotes-ref");
              if (U2) {
                e3.options.lang, e3.options;
                e3.wysiwyg.popover.innerHTML = "", (J2 = document.createElement("span")).setAttribute("aria-label", window.VditorI18n.footnoteRef + "<" + (0, d.ns)("⌥Enter") + ">"), J2.className = "vditor-tooltipped vditor-tooltipped__n";
                var W2 = document.createElement("input");
                J2.appendChild(W2), W2.className = "vditor-input", W2.setAttribute("placeholder", window.VditorI18n.footnoteRef + "<" + (0, d.ns)("⌥Enter") + ">"), W2.style.width = "120px", W2.value = U2.getAttribute("data-footnotes-label"), W2.oninput = function() {
                  "" !== W2.value.trim() && U2.setAttribute("data-footnotes-label", W2.value), "function" == typeof e3.options.input && e3.options.input(a(e3));
                }, W2.onkeydown = function(n3) {
                  n3.isComposing || oe(e3, n3) || fe(n3, t3);
                }, ue(U2, e3), e3.wysiwyg.popover.insertAdjacentElement("beforeend", J2), le(e3, U2);
              }
              var G2 = (0, y.fb)(n2, "vditor-wysiwyg__block"), z2 = !!G2 && G2.getAttribute("data-type").indexOf("block") > -1;
              if (e3.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview").forEach(function(e4) {
                (!G2 || G2 && z2 && !G2.contains(e4)) && (e4.previousElementSibling.style.display = "none");
              }), G2 && z2) {
                if (e3.wysiwyg.popover.innerHTML = "", de(t3, G2, e3), ce(t3, G2, e3), ue(G2, e3), "code-block" === G2.getAttribute("data-type")) {
                  var K2 = document.createElement("span");
                  K2.setAttribute("aria-label", window.VditorI18n.language + "<" + (0, d.ns)("⌥Enter") + ">"), K2.className = "vditor-tooltipped vditor-tooltipped__n";
                  var F2 = document.createElement("input");
                  K2.appendChild(F2);
                  var Z2 = G2.firstElementChild.firstElementChild;
                  F2.className = "vditor-input", F2.setAttribute("placeholder", window.VditorI18n.language + "<" + (0, d.ns)("⌥Enter") + ">"), F2.value = Z2.className.indexOf("language-") > -1 ? Z2.className.split("-")[1].split(" ")[0] : "", F2.oninput = function(n3) {
                    "" !== F2.value.trim() ? Z2.className = "language-" + F2.value : (Z2.className = "", e3.hint.recentLanguage = ""), G2.lastElementChild.classList.contains("vditor-wysiwyg__preview") && (G2.lastElementChild.innerHTML = G2.firstElementChild.innerHTML, N(G2.lastElementChild, e3)), Q(e3), 1 === n3.detail && (t3.setStart(Z2.firstChild, 0), t3.collapse(true), (0, D.Hc)(t3));
                  }, F2.onkeydown = function(n3) {
                    if (!n3.isComposing && !oe(e3, n3)) {
                      if ("Escape" === n3.key && "block" === e3.hint.element.style.display) return e3.hint.element.style.display = "none", void n3.preventDefault();
                      e3.hint.select(n3, e3), fe(n3, t3);
                    }
                  }, F2.onkeyup = function(t4) {
                    if (!t4.isComposing && "Enter" !== t4.key && "ArrowUp" !== t4.key && "Escape" !== t4.key && "ArrowDown" !== t4.key) {
                      var n3 = [], r3 = F2.value.substring(0, F2.selectionStart);
                      (e3.options.preview.hljs.langs || i.g.CODE_LANGUAGES).forEach(function(e4) {
                        e4.indexOf(r3.toLowerCase()) > -1 && n3.push({ html: e4, value: e4 });
                      }), e3.hint.genHTML(n3, r3, e3), t4.preventDefault();
                    }
                  }, e3.wysiwyg.popover.insertAdjacentElement("beforeend", K2);
                }
                le(e3, G2);
              } else G2 = void 0;
              if (g2) {
                var J2;
                e3.wysiwyg.popover.innerHTML = "", (J2 = document.createElement("span")).setAttribute("aria-label", "ID<" + (0, d.ns)("⌥Enter") + ">"), J2.className = "vditor-tooltipped vditor-tooltipped__n";
                var X2 = document.createElement("input");
                J2.appendChild(X2), X2.className = "vditor-input", X2.setAttribute("placeholder", "ID<" + (0, d.ns)("⌥Enter") + ">"), X2.style.width = "120px", X2.value = g2.getAttribute("data-id") || "", X2.oninput = function() {
                  g2.setAttribute("data-id", X2.value), "function" == typeof e3.options.input && e3.options.input(a(e3));
                }, X2.onkeydown = function(n3) {
                  n3.isComposing || oe(e3, n3) || fe(n3, t3);
                }, de(t3, g2, e3), ce(t3, g2, e3), ue(g2, e3), e3.wysiwyg.popover.insertAdjacentElement("beforeend", J2), le(e3, g2);
              }
              if (h2 && me(e3, h2, t3), !(E2 || o2 || v2 || G2 || h2 || V2 || U2 || g2 || w2)) {
                var Y2 = (0, y.a1)(n2, "data-block", "0");
                Y2 && Y2.parentElement.isEqualNode(e3.wysiwyg.element) ? (e3.wysiwyg.popover.innerHTML = "", de(t3, Y2, e3), ce(t3, Y2, e3), ue(Y2, e3), le(e3, Y2)) : e3.wysiwyg.popover.style.display = "none";
              }
              e3.wysiwyg.element.querySelectorAll('span[data-type="backslash"] > span').forEach(function(e4) {
                e4.style.display = "none";
              });
              var $2 = (0, y.a1)(t3.startContainer, "data-type", "backslash");
              $2 && ($2.querySelector("span").style.display = "inline");
            }
          }, 200);
        }, le = function(e3, t3) {
          var n2 = t3, r2 = (0, y.lG)(t3, "TABLE");
          r2 && (n2 = r2), e3.wysiwyg.popover.style.left = "0", e3.wysiwyg.popover.style.display = "block", e3.wysiwyg.popover.style.top = Math.max(-8, n2.offsetTop - 21 - e3.wysiwyg.element.scrollTop) + "px", e3.wysiwyg.popover.style.left = Math.min(n2.offsetLeft, e3.wysiwyg.element.clientWidth - e3.wysiwyg.popover.clientWidth) + "px", e3.wysiwyg.popover.setAttribute("data-top", (n2.offsetTop - 21).toString());
        }, se = function(e3, t3, n2) {
          void 0 === n2 && (n2 = getSelection().getRangeAt(0)), e3.wysiwyg.popover.innerHTML = "";
          var r2 = function() {
            "" !== o2.value.trim() && ("IMG" === t3.tagName ? t3.setAttribute("alt", o2.value) : t3.textContent = o2.value), "" !== s2.value.trim() && t3.setAttribute("data-link-label", s2.value), "function" == typeof e3.options.input && e3.options.input(a(e3));
          }, i2 = document.createElement("span");
          i2.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty), i2.className = "vditor-tooltipped vditor-tooltipped__n";
          var o2 = document.createElement("input");
          i2.appendChild(o2), o2.className = "vditor-input", o2.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty), o2.style.width = "120px", o2.value = t3.getAttribute("alt") || t3.textContent, o2.oninput = function() {
            r2();
          }, o2.onkeydown = function(r3) {
            oe(e3, r3) || fe(r3, n2) || pe(e3, t3, r3, s2);
          };
          var l2 = document.createElement("span");
          l2.setAttribute("aria-label", window.VditorI18n.linkRef), l2.className = "vditor-tooltipped vditor-tooltipped__n";
          var s2 = document.createElement("input");
          l2.appendChild(s2), s2.className = "vditor-input", s2.setAttribute("placeholder", window.VditorI18n.linkRef), s2.value = t3.getAttribute("data-link-label"), s2.oninput = function() {
            r2();
          }, s2.onkeydown = function(r3) {
            oe(e3, r3) || fe(r3, n2) || pe(e3, t3, r3, o2);
          }, ue(t3, e3), e3.wysiwyg.popover.insertAdjacentElement("beforeend", i2), e3.wysiwyg.popover.insertAdjacentElement("beforeend", l2), le(e3, t3);
        }, de = function(e3, t3, n2) {
          var r2 = t3.previousElementSibling;
          if (r2 && (t3.parentElement.isEqualNode(n2.wysiwyg.element) || "LI" === t3.tagName)) {
            var i2 = document.createElement("button");
            i2.setAttribute("type", "button"), i2.setAttribute("data-type", "up"), i2.setAttribute("aria-label", window.VditorI18n.up + "<" + (0, d.ns)("⇧⌘U") + ">"), i2.innerHTML = '<svg><use xlink:href="#vditor-icon-up"></use></svg>', i2.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", i2.onclick = function() {
              e3.insertNode(document.createElement("wbr")), r2.insertAdjacentElement("beforebegin", t3), (0, D.ib)(n2.wysiwyg.element, e3), Q(n2), ae(n2), _e(n2);
            }, n2.wysiwyg.popover.insertAdjacentElement("beforeend", i2);
          }
        }, ce = function(e3, t3, n2) {
          var r2 = t3.nextElementSibling;
          if (r2 && (t3.parentElement.isEqualNode(n2.wysiwyg.element) || "LI" === t3.tagName)) {
            var i2 = document.createElement("button");
            i2.setAttribute("type", "button"), i2.setAttribute("data-type", "down"), i2.setAttribute("aria-label", window.VditorI18n.down + "<" + (0, d.ns)("⇧⌘D") + ">"), i2.innerHTML = '<svg><use xlink:href="#vditor-icon-down"></use></svg>', i2.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", i2.onclick = function() {
              e3.insertNode(document.createElement("wbr")), r2.insertAdjacentElement("afterend", t3), (0, D.ib)(n2.wysiwyg.element, e3), Q(n2), ae(n2), _e(n2);
            }, n2.wysiwyg.popover.insertAdjacentElement("beforeend", i2);
          }
        }, ue = function(e3, t3) {
          var n2 = document.createElement("button");
          n2.setAttribute("type", "button"), n2.setAttribute("data-type", "remove"), n2.setAttribute("aria-label", window.VditorI18n.remove + "<" + (0, d.ns)("⇧⌘X") + ">"), n2.innerHTML = '<svg><use xlink:href="#vditor-icon-trashcan"></use></svg>', n2.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", n2.onclick = function() {
            var n3 = (0, D.zh)(t3);
            n3.setStartAfter(e3), (0, D.Hc)(n3), e3.remove(), Q(t3), ae(t3), ["H1", "H2", "H3", "H4", "H5", "H6"].includes(e3.tagName) && O(t3);
          }, t3.wysiwyg.popover.insertAdjacentElement("beforeend", n2);
        }, pe = function(e3, t3, n2, r2) {
          if (!n2.isComposing) {
            if ("Tab" === n2.key) return r2.focus(), r2.select(), void n2.preventDefault();
            if (!(0, d.yl)(n2) && !n2.shiftKey && n2.altKey && "Enter" === n2.key) {
              var o2 = (0, D.zh)(e3);
              t3.insertAdjacentHTML("afterend", i.g.ZWSP), o2.setStartAfter(t3.nextSibling), o2.collapse(true), (0, D.Hc)(o2), n2.preventDefault();
            }
          }
        }, me = function(e3, t3, n2) {
          e3.wysiwyg.popover.innerHTML = "";
          var r2 = function() {
            "" !== o2.value.trim() && (t3.innerHTML = o2.value), t3.setAttribute("href", l2.value), t3.setAttribute("title", d2.value), Q(e3);
          };
          t3.querySelectorAll("[data-marker]").forEach(function(e4) {
            e4.removeAttribute("data-marker");
          });
          var i2 = document.createElement("span");
          i2.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty), i2.className = "vditor-tooltipped vditor-tooltipped__n";
          var o2 = document.createElement("input");
          i2.appendChild(o2), o2.className = "vditor-input", o2.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty), o2.style.width = "120px", o2.value = t3.innerHTML || "", o2.oninput = function() {
            r2();
          }, o2.onkeydown = function(r3) {
            oe(e3, r3) || fe(r3, n2) || pe(e3, t3, r3, l2);
          };
          var a2 = document.createElement("span");
          a2.setAttribute("aria-label", window.VditorI18n.link), a2.className = "vditor-tooltipped vditor-tooltipped__n";
          var l2 = document.createElement("input");
          a2.appendChild(l2), l2.className = "vditor-input", l2.setAttribute("placeholder", window.VditorI18n.link), l2.value = t3.getAttribute("href") || "", l2.oninput = function() {
            r2();
          }, l2.onkeydown = function(r3) {
            oe(e3, r3) || fe(r3, n2) || pe(e3, t3, r3, d2);
          };
          var s2 = document.createElement("span");
          s2.setAttribute("aria-label", window.VditorI18n.tooltipText), s2.className = "vditor-tooltipped vditor-tooltipped__n";
          var d2 = document.createElement("input");
          s2.appendChild(d2), d2.className = "vditor-input", d2.setAttribute("placeholder", window.VditorI18n.tooltipText), d2.style.width = "60px", d2.value = t3.getAttribute("title") || "", d2.oninput = function() {
            r2();
          }, d2.onkeydown = function(r3) {
            oe(e3, r3) || fe(r3, n2) || pe(e3, t3, r3, o2);
          }, ue(t3, e3), e3.wysiwyg.popover.insertAdjacentElement("beforeend", i2), e3.wysiwyg.popover.insertAdjacentElement("beforeend", a2), e3.wysiwyg.popover.insertAdjacentElement("beforeend", s2), le(e3, t3);
        }, fe = function(e3, t3) {
          if (!(0, d.yl)(e3) && !e3.shiftKey && "Enter" === e3.key || "Escape" === e3.key) return t3 && (0, D.Hc)(t3), e3.preventDefault(), e3.stopPropagation(), true;
        }, he = function(e3) {
          "wysiwyg" === e3.currentMode ? ae(e3) : "ir" === e3.currentMode && Y(e3);
        }, ve = function(e3, t3, n2) {
          void 0 === n2 && (n2 = { enableAddUndoStack: true, enableHint: false, enableInput: true });
          var r2 = e3.wysiwyg.element;
          r2.innerHTML = e3.lute.Md2VditorDOM(t3), r2.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(t4) {
            N(t4, e3), t4.previousElementSibling.setAttribute("style", "display:none");
          }), Q(e3, n2);
        }, ge = function(e3, t3, n2) {
          for (var r2 = e3.startContainer.parentElement, o2 = false, a2 = "", l2 = "", s2 = function(e4) {
            var t4 = ee(e4.startContainer), n3 = $(e4.startContainer), r3 = e4.startContainer.textContent, o3 = e4.startOffset, a3 = "", l3 = "";
            return ("" !== r3.substr(0, o3) && r3.substr(0, o3) !== i.g.ZWSP || t4) && (a3 = "" + t4 + r3.substr(0, o3)), ("" !== r3.substr(o3) && r3.substr(o3) !== i.g.ZWSP || n3) && (l3 = "" + r3.substr(o3) + n3), { afterHTML: l3, beforeHTML: a3 };
          }(e3), d2 = s2.beforeHTML, c2 = s2.afterHTML; r2 && !o2; ) {
            var u2 = r2.tagName;
            if ("STRIKE" === u2 && (u2 = "S"), "I" === u2 && (u2 = "EM"), "B" === u2 && (u2 = "STRONG"), "S" === u2 || "STRONG" === u2 || "EM" === u2) {
              var p2 = "", m2 = "", f2 = "";
              "0" !== r2.parentElement.getAttribute("data-block") && (m2 = ee(r2), f2 = $(r2)), (d2 || m2) && (d2 = p2 = m2 + "<" + u2 + ">" + d2 + "</" + u2 + ">"), ("bold" === n2 && "STRONG" === u2 || "italic" === n2 && "EM" === u2 || "strikeThrough" === n2 && "S" === u2) && (p2 += "" + a2 + i.g.ZWSP + "<wbr>" + l2, o2 = true), (c2 || f2) && (p2 += c2 = "<" + u2 + ">" + c2 + "</" + u2 + ">" + f2), "0" !== r2.parentElement.getAttribute("data-block") ? (r2 = r2.parentElement).innerHTML = p2 : (r2.outerHTML = p2, r2 = r2.parentElement), a2 = "<" + u2 + ">" + a2, l2 = "</" + u2 + ">" + l2;
            } else o2 = true;
          }
          (0, D.ib)(t3.wysiwyg.element, e3);
        }, ye = function(e3, t3) {
          var n2, r2 = this;
          this.element = document.createElement("div"), t3.className && (n2 = this.element.classList).add.apply(n2, t3.className.split(" "));
          var o2 = t3.hotkey ? " <" + (0, d.ns)(t3.hotkey) + ">" : "";
          2 === t3.level && (o2 = t3.hotkey ? " &lt;" + (0, d.ns)(t3.hotkey) + "&gt;" : "");
          var a2 = t3.tip ? t3.tip + o2 : "" + window.VditorI18n[t3.name] + o2, l2 = "upload" === t3.name ? "div" : "button";
          if (2 === t3.level) this.element.innerHTML = "<" + l2 + ' data-type="' + t3.name + '">' + a2 + "</" + l2 + ">";
          else {
            this.element.classList.add("vditor-toolbar__item");
            var s2 = document.createElement(l2);
            s2.setAttribute("data-type", t3.name), s2.className = "vditor-tooltipped vditor-tooltipped__" + t3.tipPosition, s2.setAttribute("aria-label", a2), s2.innerHTML = t3.icon, this.element.appendChild(s2);
          }
          t3.prefix && this.element.children[0].addEventListener((0, d.Le)(), function(n3) {
            n3.preventDefault(), r2.element.firstElementChild.classList.contains(i.g.CLASS_MENU_DISABLED) || ("wysiwyg" === e3.currentMode ? function(e4, t4, n4) {
              if (!(e4.wysiwyg.composingLock && n4 instanceof CustomEvent)) {
                var r3 = true, o3 = true;
                e4.wysiwyg.element.querySelector("wbr") && e4.wysiwyg.element.querySelector("wbr").remove();
                var a3 = (0, D.zh)(e4), l3 = t4.getAttribute("data-type");
                if (t4.classList.contains("vditor-menu--current")) if ("strike" === l3 && (l3 = "strikeThrough"), "quote" === l3) {
                  var s3 = (0, y.lG)(a3.startContainer, "BLOCKQUOTE");
                  s3 || (s3 = a3.startContainer.childNodes[a3.startOffset]), s3 && (r3 = false, t4.classList.remove("vditor-menu--current"), a3.insertNode(document.createElement("wbr")), s3.outerHTML = "" === s3.innerHTML.trim() ? '<p data-block="0">' + s3.innerHTML + "</p>" : s3.innerHTML, (0, D.ib)(e4.wysiwyg.element, a3));
                } else if ("inline-code" === l3) {
                  var d2 = (0, y.lG)(a3.startContainer, "CODE");
                  d2 || (d2 = a3.startContainer.childNodes[a3.startOffset]), d2 && (d2.outerHTML = d2.innerHTML.replace(i.g.ZWSP, "") + "<wbr>", (0, D.ib)(e4.wysiwyg.element, a3));
                } else "link" === l3 ? a3.collapsed ? (a3.selectNode(a3.startContainer.parentElement), document.execCommand("unlink", false, "")) : document.execCommand("unlink", false, "") : "check" === l3 || "list" === l3 || "ordered-list" === l3 ? (it(e4, a3, l3), (0, D.ib)(e4.wysiwyg.element, a3), r3 = false, t4.classList.remove("vditor-menu--current")) : (r3 = false, t4.classList.remove("vditor-menu--current"), "" === a3.toString() ? ge(a3, e4, l3) : document.execCommand(l3, false, ""));
                else {
                  0 === e4.wysiwyg.element.childNodes.length && (e4.wysiwyg.element.innerHTML = '<p data-block="0"><wbr></p>', (0, D.ib)(e4.wysiwyg.element, a3));
                  var u2 = (0, y.F9)(a3.startContainer);
                  if ("quote" === l3) {
                    if (u2 || (u2 = a3.startContainer.childNodes[a3.startOffset]), u2) {
                      r3 = false, t4.classList.add("vditor-menu--current"), a3.insertNode(document.createElement("wbr"));
                      var p2 = (0, y.lG)(a3.startContainer, "LI");
                      p2 && u2.contains(p2) ? p2.innerHTML = '<blockquote data-block="0">' + p2.innerHTML + "</blockquote>" : u2.outerHTML = '<blockquote data-block="0">' + u2.outerHTML + "</blockquote>", (0, D.ib)(e4.wysiwyg.element, a3);
                    }
                  } else if ("check" === l3 || "list" === l3 || "ordered-list" === l3) it(e4, a3, l3, false), (0, D.ib)(e4.wysiwyg.element, a3), r3 = false, c(e4.toolbar.elements, ["check", "list", "ordered-list"]), t4.classList.add("vditor-menu--current");
                  else if ("inline-code" === l3) {
                    if ("" === a3.toString()) (m2 = document.createElement("code")).textContent = i.g.ZWSP, a3.insertNode(m2), a3.setStart(m2.firstChild, 1), a3.collapse(true), (0, D.Hc)(a3);
                    else if (3 === a3.startContainer.nodeType) {
                      var m2 = document.createElement("code");
                      a3.surroundContents(m2), a3.insertNode(m2), (0, D.Hc)(a3);
                    }
                    t4.classList.add("vditor-menu--current");
                  } else if ("code" === l3) (m2 = document.createElement("div")).className = "vditor-wysiwyg__block", m2.setAttribute("data-type", "code-block"), m2.setAttribute("data-block", "0"), m2.setAttribute("data-marker", "```"), "" === a3.toString() ? m2.innerHTML = "<pre><code><wbr>\n</code></pre>" : (m2.innerHTML = "<pre><code>" + a3.toString() + "<wbr></code></pre>", a3.deleteContents()), a3.insertNode(m2), u2 && (u2.outerHTML = e4.lute.SpinVditorDOM(u2.outerHTML)), (0, D.ib)(e4.wysiwyg.element, a3), e4.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(t5) {
                    N(t5, e4);
                  }), t4.classList.add("vditor-menu--disabled");
                  else if ("link" === l3) {
                    if ("" === a3.toString()) {
                      var f2 = document.createElement("a");
                      f2.innerText = i.g.ZWSP, a3.insertNode(f2), a3.setStart(f2.firstChild, 1), a3.collapse(true), me(e4, f2, a3);
                      var h2 = e4.wysiwyg.popover.querySelector("input");
                      h2.value = "", h2.focus(), o3 = false;
                    } else {
                      (m2 = document.createElement("a")).setAttribute("href", ""), m2.innerHTML = a3.toString(), a3.surroundContents(m2), a3.insertNode(m2), (0, D.Hc)(a3), me(e4, m2, a3);
                      var v2 = e4.wysiwyg.popover.querySelectorAll("input");
                      v2[0].value = m2.innerText, v2[1].focus();
                    }
                    r3 = false, t4.classList.add("vditor-menu--current");
                  } else if ("table" === l3) {
                    var g2 = '<table data-block="0"><thead><tr><th>col1<wbr></th><th>col2</th><th>col3</th></tr></thead><tbody><tr><td> </td><td> </td><td> </td></tr><tr><td> </td><td> </td><td> </td></tr></tbody></table>';
                    if ("" === a3.toString().trim()) u2 && "" === u2.innerHTML.trim().replace(i.g.ZWSP, "") ? u2.outerHTML = g2 : document.execCommand("insertHTML", false, g2), a3.selectNode(e4.wysiwyg.element.querySelector("wbr").previousSibling), e4.wysiwyg.element.querySelector("wbr").remove(), (0, D.Hc)(a3);
                    else {
                      g2 = '<table data-block="0"><thead><tr>';
                      var b2 = a3.toString().split("\n"), w2 = b2[0].split(",").length > b2[0].split("	").length ? "," : "	";
                      b2.forEach(function(e5, t5) {
                        0 === t5 ? (e5.split(w2).forEach(function(e6, t6) {
                          g2 += 0 === t6 ? "<th>" + e6 + "<wbr></th>" : "<th>" + e6 + "</th>";
                        }), g2 += "</tr></thead>") : (g2 += 1 === t5 ? "<tbody><tr>" : "<tr>", e5.split(w2).forEach(function(e6) {
                          g2 += "<td>" + e6 + "</td>";
                        }), g2 += "</tr>");
                      }), g2 += "</tbody></table>", document.execCommand("insertHTML", false, g2), (0, D.ib)(e4.wysiwyg.element, a3);
                    }
                    r3 = false, t4.classList.add("vditor-menu--disabled");
                  } else if ("line" === l3) {
                    if (u2) {
                      var E2 = '<hr data-block="0"><p data-block="0"><wbr>\n</p>';
                      "" === u2.innerHTML.trim() ? u2.outerHTML = E2 : u2.insertAdjacentHTML("afterend", E2), (0, D.ib)(e4.wysiwyg.element, a3);
                    }
                  } else if (r3 = false, t4.classList.add("vditor-menu--current"), "strike" === l3 && (l3 = "strikeThrough"), "" !== a3.toString() || "bold" !== l3 && "italic" !== l3 && "strikeThrough" !== l3) document.execCommand(l3, false, "");
                  else {
                    var k2 = "strong";
                    "italic" === l3 ? k2 = "em" : "strikeThrough" === l3 && (k2 = "s"), (m2 = document.createElement(k2)).textContent = i.g.ZWSP, a3.insertNode(m2), m2.previousSibling && m2.previousSibling.textContent === i.g.ZWSP && (m2.previousSibling.textContent = ""), a3.setStart(m2.firstChild, 1), a3.collapse(true), (0, D.Hc)(a3);
                  }
                }
                r3 && ae(e4), o3 && Q(e4);
              }
            }(e3, r2.element.children[0], n3) : "ir" === e3.currentMode ? Ht(e3, r2.element.children[0], t3.prefix || "", t3.suffix || "") : Pe(e3, r2.element.children[0], t3.prefix || "", t3.suffix || ""));
          });
        }, be = (Z = function(e3, t3) {
          return Z = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
            e4.__proto__ = t4;
          } || function(e4, t4) {
            for (var n2 in t4) t4.hasOwnProperty(n2) && (e4[n2] = t4[n2]);
          }, Z(e3, t3);
        }, function(e3, t3) {
          function n2() {
            this.constructor = e3;
          }
          Z(e3, t3), e3.prototype = null === t3 ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
        }), we = function(e3, t3, n2) {
          var r2;
          if ("string" != typeof n2 ? (v(e3, ["subToolbar", "hint"]), n2.preventDefault(), r2 = a(e3)) : r2 = n2, e3.currentMode !== t3 || "string" == typeof n2) {
            if (e3.devtools && e3.devtools.renderEchart(e3), "both" === e3.options.preview.mode && "sv" === t3 ? e3.preview.element.style.display = "block" : e3.preview.element.style.display = "none", p(e3.toolbar.elements, i.g.EDIT_TOOLBARS), c(e3.toolbar.elements, i.g.EDIT_TOOLBARS), m(e3.toolbar.elements, ["outdent", "indent"]), "ir" === t3) f(e3.toolbar.elements, ["both"]), h(e3.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e3.sv.element.style.display = "none", e3.wysiwyg.element.parentElement.style.display = "none", e3.ir.element.parentElement.style.display = "block", e3.lute.SetVditorIR(true), e3.lute.SetVditorWYSIWYG(false), e3.lute.SetVditorSV(false), e3.currentMode = "ir", e3.ir.element.innerHTML = e3.lute.Md2VditorIRDOM(r2), At(e3, { enableAddUndoStack: true, enableHint: false, enableInput: false }), z(e3), e3.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(t4) {
              N(t4, e3);
            }), e3.ir.element.querySelectorAll(".vditor-toc").forEach(function(t4) {
              (0, C.H)(t4, { cdn: e3.options.cdn, math: e3.options.preview.math });
            });
            else if ("wysiwyg" === t3) f(e3.toolbar.elements, ["both"]), h(e3.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e3.sv.element.style.display = "none", e3.wysiwyg.element.parentElement.style.display = "block", e3.ir.element.parentElement.style.display = "none", e3.lute.SetVditorIR(false), e3.lute.SetVditorWYSIWYG(true), e3.lute.SetVditorSV(false), e3.currentMode = "wysiwyg", z(e3), ve(e3, r2, { enableAddUndoStack: true, enableHint: false, enableInput: false }), e3.wysiwyg.element.querySelectorAll(".vditor-toc").forEach(function(t4) {
              (0, C.H)(t4, { cdn: e3.options.cdn, math: e3.options.preview.math });
            }), e3.wysiwyg.popover.style.display = "none";
            else if ("sv" === t3) {
              h(e3.toolbar.elements, ["both"]), f(e3.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e3.wysiwyg.element.parentElement.style.display = "none", e3.ir.element.parentElement.style.display = "none", ("both" === e3.options.preview.mode || "editor" === e3.options.preview.mode) && (e3.sv.element.style.display = "block"), e3.lute.SetVditorIR(false), e3.lute.SetVditorWYSIWYG(false), e3.lute.SetVditorSV(true), e3.currentMode = "sv";
              var o2 = Oe(r2, e3);
              "<div data-block='0'></div>" === o2 && (o2 = ""), e3.sv.element.innerHTML = o2, V(e3.sv.element), je(e3, { enableAddUndoStack: true, enableHint: false, enableInput: false }), z(e3);
            }
            e3.undo.resetIcon(e3), "string" != typeof n2 && (e3[e3.currentMode].element.focus(), he(e3)), O(e3), K(e3), e3.toolbar.elements["edit-mode"] && (e3.toolbar.elements["edit-mode"].querySelectorAll("button").forEach(function(e4) {
              e4.classList.remove("vditor-menu--current");
            }), e3.toolbar.elements["edit-mode"].querySelector('button[data-mode="' + e3.currentMode + '"]').classList.add("vditor-menu--current")), e3.outline.toggle(e3, "sv" !== e3.currentMode && e3.options.outline.enable, "string" != typeof n2);
          }
        }, Ee = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this, i2 = document.createElement("div");
            return i2.className = "vditor-hint" + (2 === n2.level ? "" : " vditor-panel--arrow"), i2.innerHTML = '<button data-mode="wysiwyg">' + window.VditorI18n.wysiwyg + " &lt;" + (0, d.ns)("⌥⌘7") + '></button>\n<button data-mode="ir">' + window.VditorI18n.instantRendering + " &lt;" + (0, d.ns)("⌥⌘8") + '></button>\n<button data-mode="sv">' + window.VditorI18n.splitView + " &lt;" + (0, d.ns)("⌥⌘9") + "></button>", r2.element.appendChild(i2), r2._bindEvent(t4, i2, n2), r2;
          }
          return be(t3, e3), t3.prototype._bindEvent = function(e4, t4, n2) {
            var r2 = this.element.children[0];
            g(e4, t4, r2, n2.level), t4.children.item(0).addEventListener((0, d.Le)(), function(t5) {
              we(e4, "wysiwyg", t5), t5.preventDefault(), t5.stopPropagation();
            }), t4.children.item(1).addEventListener((0, d.Le)(), function(t5) {
              we(e4, "ir", t5), t5.preventDefault(), t5.stopPropagation();
            }), t4.children.item(2).addEventListener((0, d.Le)(), function(t5) {
              we(e4, "sv", t5), t5.preventDefault(), t5.stopPropagation();
            });
          }, t3;
        }(ye), ke = function(e3, t3) {
          return (0, D.Gb)(e3, t3) ? getSelection().toString() : "";
        }, Se = function(e3, t3) {
          t3.addEventListener("focus", function() {
            e3.options.focus && e3.options.focus(a(e3)), v(e3, ["subToolbar", "hint"]);
          });
        }, Le = function(e3, t3) {
          t3.addEventListener("dblclick", function(t4) {
            "IMG" === t4.target.tagName && (e3.options.image.preview ? e3.options.image.preview(t4.target) : e3.options.image.isPreview && (0, B.E)(t4.target, e3.options.lang, e3.options.theme));
          });
        }, Te = function(e3, t3) {
          t3.addEventListener("blur", function(t4) {
            if ("ir" === e3.currentMode) {
              var n2 = e3.ir.element.querySelector(".vditor-ir__node--expand");
              n2 && n2.classList.remove("vditor-ir__node--expand");
            } else "wysiwyg" !== e3.currentMode || e3.wysiwyg.selectPopover.contains(t4.relatedTarget) || e3.wysiwyg.hideComment();
            e3[e3.currentMode].range = (0, D.zh)(e3), e3.options.blur && e3.options.blur(a(e3));
          });
        }, Me = function(e3, t3) {
          t3.addEventListener("dragstart", function(e4) {
            e4.dataTransfer.setData(i.g.DROP_EDITOR, i.g.DROP_EDITOR);
          }), t3.addEventListener("drop", function(t4) {
            t4.dataTransfer.getData(i.g.DROP_EDITOR) ? ct(e3) : (t4.dataTransfer.types.includes("Files") || t4.dataTransfer.types.includes("text/html")) && Mt(e3, t4, { pasteCode: function(e4) {
              document.execCommand("insertHTML", false, e4);
            } });
          });
        }, Ce = function(e3, t3, n2) {
          t3.addEventListener("copy", function(t4) {
            return n2(t4, e3);
          });
        }, Ae = function(e3, t3, n2) {
          t3.addEventListener("cut", function(t4) {
            n2(t4, e3), e3.options.comment.enable && "wysiwyg" === e3.currentMode && e3.wysiwyg.getComments(e3), document.execCommand("delete");
          });
        }, _e = function(e3) {
          if ("wysiwyg" === e3.currentMode && e3.options.comment.enable && e3.options.comment.adjustTop(e3.wysiwyg.getComments(e3, true)), e3.options.typewriterMode) {
            var t3 = e3[e3.currentMode].element, n2 = (0, D.Ny)(t3).top;
            "auto" !== e3.options.height || e3.element.classList.contains("vditor--fullscreen") || window.scrollTo(window.scrollX, n2 + e3.element.offsetTop + e3.toolbar.element.offsetHeight - window.innerHeight / 2 + 10), ("auto" !== e3.options.height || e3.element.classList.contains("vditor--fullscreen")) && (t3.scrollTop = n2 + t3.scrollTop - t3.clientHeight / 2 + 10);
          }
        }, xe = function(e3, t3) {
          t3.addEventListener("keydown", function(t4) {
            if (!t4.isComposing && e3.options.keydown && e3.options.keydown(t4), !(e3.options.hint.extend.length > 1 || e3.toolbar.elements.emoji) || !e3.hint.select(t4, e3)) {
              if (e3.options.comment.enable && "wysiwyg" === e3.currentMode && ("Backspace" === t4.key || P("⌘X", t4)) && e3.wysiwyg.getComments(e3), "sv" === e3.currentMode) {
                if (function(e4, t5) {
                  var n3, r2, i2, o2, a2;
                  if (e4.sv.composingLock = t5.isComposing, t5.isComposing) return false;
                  if (-1 !== t5.key.indexOf("Arrow") || "Meta" === t5.key || "Control" === t5.key || "Alt" === t5.key || "Shift" === t5.key || "CapsLock" === t5.key || "Escape" === t5.key || /^F\d{1,2}$/.test(t5.key) || e4.undo.recordFirstPosition(e4, t5), "Enter" !== t5.key && "Tab" !== t5.key && "Backspace" !== t5.key && -1 === t5.key.indexOf("Arrow") && !(0, d.yl)(t5) && "Escape" !== t5.key) return false;
                  var l2 = (0, D.zh)(e4), s2 = l2.startContainer;
                  3 !== l2.startContainer.nodeType && "DIV" === l2.startContainer.tagName && (s2 = l2.startContainer.childNodes[l2.startOffset - 1]);
                  var c2 = (0, y.a1)(s2, "data-type", "text"), u2 = (0, y.a1)(s2, "data-type", "blockquote-marker");
                  if (!u2 && 0 === l2.startOffset && c2 && c2.previousElementSibling && "blockquote-marker" === c2.previousElementSibling.getAttribute("data-type") && (u2 = c2.previousElementSibling), u2 && "Enter" === t5.key && !(0, d.yl)(t5) && !t5.altKey && "" === u2.nextElementSibling.textContent.trim() && (0, D.im)(u2, e4.sv.element, l2).start === u2.textContent.length) return "padding" === (null === (n3 = u2.previousElementSibling) || void 0 === n3 ? void 0 : n3.getAttribute("data-type")) && u2.previousElementSibling.setAttribute("data-action", "enter-remove"), u2.remove(), je(e4), t5.preventDefault(), true;
                  var p2 = (0, y.a1)(s2, "data-type", "li-marker"), m2 = (0, y.a1)(s2, "data-type", "task-marker"), f2 = p2;
                  if (f2 || m2 && "task-marker" !== m2.nextElementSibling.getAttribute("data-type") && (f2 = m2), f2 || 0 !== l2.startOffset || !c2 || !c2.previousElementSibling || "li-marker" !== c2.previousElementSibling.getAttribute("data-type") && "task-marker" !== c2.previousElementSibling.getAttribute("data-type") || (f2 = c2.previousElementSibling), f2) {
                    var h2 = (0, D.im)(f2, e4.sv.element, l2).start, v2 = "task-marker" === f2.getAttribute("data-type"), g2 = f2;
                    if (v2 && (g2 = f2.previousElementSibling.previousElementSibling.previousElementSibling), h2 === f2.textContent.length) {
                      if ("Enter" === t5.key && !(0, d.yl)(t5) && !t5.altKey && !t5.shiftKey && "" === f2.nextElementSibling.textContent.trim()) return "padding" === (null === (r2 = g2.previousElementSibling) || void 0 === r2 ? void 0 : r2.getAttribute("data-type")) ? (g2.previousElementSibling.remove(), U(e4)) : (v2 && (g2.remove(), f2.previousElementSibling.previousElementSibling.remove(), f2.previousElementSibling.remove()), f2.nextElementSibling.remove(), f2.remove(), je(e4)), t5.preventDefault(), true;
                      if ("Tab" === t5.key) return g2.insertAdjacentHTML("beforebegin", '<span data-type="padding">' + g2.textContent.replace(/\S/g, " ") + "</span>"), /^\d/.test(g2.textContent) && (g2.textContent = g2.textContent.replace(/^\d{1,}/, "1"), l2.selectNodeContents(f2.firstChild), l2.collapse(false)), U(e4), t5.preventDefault(), true;
                    }
                  }
                  if (pt(e4, l2, t5)) return true;
                  var w2 = (0, y.a1)(s2, "data-block", "0"), E2 = (0, b.S)(s2, "SPAN");
                  if ("Enter" === t5.key && !(0, d.yl)(t5) && !t5.altKey && !t5.shiftKey && w2) {
                    var k2 = false, S2 = w2.textContent.match(/^\n+/);
                    (0, D.im)(w2, e4.sv.element).start <= (S2 ? S2[0].length : 0) && (k2 = true);
                    var L2 = "\n";
                    if (E2) {
                      if ("enter-remove" === (null === (i2 = E2.previousElementSibling) || void 0 === i2 ? void 0 : i2.getAttribute("data-action"))) return E2.previousElementSibling.remove(), je(e4), t5.preventDefault(), true;
                      L2 += Ie(E2);
                    }
                    return l2.insertNode(document.createTextNode(L2)), l2.collapse(false), w2 && "" !== w2.textContent.trim() && !k2 ? U(e4) : je(e4), t5.preventDefault(), true;
                  }
                  if ("Backspace" === t5.key && !(0, d.yl)(t5) && !t5.altKey && !t5.shiftKey) {
                    if (E2 && "newline" === (null === (o2 = E2.previousElementSibling) || void 0 === o2 ? void 0 : o2.getAttribute("data-type")) && 1 === (0, D.im)(E2, e4.sv.element, l2).start && -1 === E2.getAttribute("data-type").indexOf("code-block-")) return l2.setStart(E2, 0), l2.extractContents(), "" !== E2.textContent.trim() ? U(e4) : je(e4), t5.preventDefault(), true;
                    if (w2 && 0 === (0, D.im)(w2, e4.sv.element, l2).start && w2.previousElementSibling) {
                      l2.extractContents();
                      var T2 = w2.previousElementSibling.lastElementChild;
                      return "newline" === T2.getAttribute("data-type") && (T2.remove(), T2 = w2.previousElementSibling.lastElementChild), "newline" !== T2.getAttribute("data-type") && (T2.insertAdjacentHTML("afterend", w2.innerHTML), w2.remove()), "" === w2.textContent.trim() || (null === (a2 = w2.previousElementSibling) || void 0 === a2 ? void 0 : a2.querySelector('[data-type="code-block-open-marker"]')) ? ("newline" !== T2.getAttribute("data-type") && (l2.selectNodeContents(T2.lastChild), l2.collapse(false)), je(e4)) : U(e4), t5.preventDefault(), true;
                    }
                  }
                  return false;
                }(e3, t4)) return;
              } else if ("wysiwyg" === e3.currentMode) {
                if (function(e4, t5) {
                  if (e4.wysiwyg.composingLock = t5.isComposing, t5.isComposing) return false;
                  -1 !== t5.key.indexOf("Arrow") || "Meta" === t5.key || "Control" === t5.key || "Alt" === t5.key || "Shift" === t5.key || "CapsLock" === t5.key || "Escape" === t5.key || /^F\d{1,2}$/.test(t5.key) || e4.undo.recordFirstPosition(e4, t5);
                  var n3 = (0, D.zh)(e4), r2 = n3.startContainer;
                  if (!Je(t5, e4, r2)) return false;
                  if (Xe(n3, e4, t5), Lt(n3), "Enter" !== t5.key && "Tab" !== t5.key && "Backspace" !== t5.key && -1 === t5.key.indexOf("Arrow") && !(0, d.yl)(t5) && "Escape" !== t5.key && "Delete" !== t5.key) return false;
                  var o2 = (0, y.F9)(r2), a2 = (0, y.lG)(r2, "P");
                  if (mt(t5, e4, a2, n3)) return true;
                  if (ut(n3, e4, a2, t5)) return true;
                  if (bt(e4, t5, n3)) return true;
                  var l2 = (0, y.fb)(r2, "vditor-wysiwyg__block");
                  if (l2) {
                    if ("Escape" === t5.key && 2 === l2.children.length) return e4.wysiwyg.popover.style.display = "none", l2.firstElementChild.style.display = "none", e4.wysiwyg.element.blur(), t5.preventDefault(), true;
                    if (!(0, d.yl)(t5) && !t5.shiftKey && t5.altKey && "Enter" === t5.key && "code-block" === l2.getAttribute("data-type")) {
                      var s2 = e4.wysiwyg.popover.querySelector(".vditor-input");
                      return s2.focus(), s2.select(), t5.preventDefault(), true;
                    }
                    if ("0" === l2.getAttribute("data-block")) {
                      if (wt(e4, t5, l2.firstElementChild, n3)) return true;
                      if (nt(e4, t5, n3, l2.firstElementChild, l2)) return true;
                      if ("yaml-front-matter" !== l2.getAttribute("data-type") && rt(e4, t5, n3, l2.firstElementChild, l2)) return true;
                    }
                  }
                  if (Et(e4, n3, t5, a2)) return true;
                  var c2 = (0, y.E2)(r2, "BLOCKQUOTE");
                  if (c2 && !t5.shiftKey && t5.altKey && "Enter" === t5.key) {
                    (0, d.yl)(t5) ? n3.setStartBefore(c2) : n3.setStartAfter(c2), (0, D.Hc)(n3);
                    var u2 = document.createElement("p");
                    return u2.setAttribute("data-block", "0"), u2.innerHTML = "\n", n3.insertNode(u2), n3.collapse(true), (0, D.Hc)(n3), Q(e4), _e(e4), t5.preventDefault(), true;
                  }
                  var p2, m2 = (0, b.W)(r2);
                  if (m2) {
                    if ("H6" === m2.tagName && r2.textContent.length === n3.startOffset && !(0, d.yl)(t5) && !t5.shiftKey && !t5.altKey && "Enter" === t5.key) {
                      var f2 = document.createElement("p");
                      return f2.textContent = "\n", f2.setAttribute("data-block", "0"), r2.parentElement.insertAdjacentElement("afterend", f2), n3.setStart(f2, 0), (0, D.Hc)(n3), Q(e4), _e(e4), t5.preventDefault(), true;
                    }
                    var h2;
                    if (P("⌘=", t5)) return (h2 = parseInt(m2.tagName.substr(1), 10) - 1) > 0 && (ne(e4, "h" + h2), Q(e4)), t5.preventDefault(), true;
                    if (P("⌘-", t5)) return (h2 = parseInt(m2.tagName.substr(1), 10) + 1) < 7 && (ne(e4, "h" + h2), Q(e4)), t5.preventDefault(), true;
                    "Backspace" !== t5.key || (0, d.yl)(t5) || t5.shiftKey || t5.altKey || 1 !== m2.textContent.length || re(e4);
                  }
                  if (kt(e4, n3, t5)) return true;
                  if (t5.altKey && "Enter" === t5.key && !(0, d.yl)(t5) && !t5.shiftKey) {
                    var v2 = (0, y.lG)(r2, "A"), g2 = (0, y.a1)(r2, "data-type", "link-ref"), w2 = (0, y.a1)(r2, "data-type", "footnotes-ref");
                    if (v2 || g2 || w2 || m2 && 2 === m2.tagName.length) {
                      var E2 = e4.wysiwyg.popover.querySelector("input");
                      E2.focus(), E2.select();
                    }
                  }
                  if (oe(e4, t5)) return true;
                  if (P("⇧⌘U", t5) && (p2 = e4.wysiwyg.popover.querySelector('[data-type="up"]'))) return p2.click(), t5.preventDefault(), true;
                  if (P("⇧⌘D", t5) && (p2 = e4.wysiwyg.popover.querySelector('[data-type="down"]'))) return p2.click(), t5.preventDefault(), true;
                  if (pt(e4, n3, t5)) return true;
                  if (!(0, d.yl)(t5) && t5.shiftKey && !t5.altKey && "Enter" === t5.key && "LI" !== r2.parentElement.tagName && "P" !== r2.parentElement.tagName) return ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(r2.parentElement.tagName) ? n3.insertNode(document.createTextNode("\n" + i.g.ZWSP)) : n3.insertNode(document.createTextNode("\n")), n3.collapse(false), (0, D.Hc)(n3), Q(e4), _e(e4), t5.preventDefault(), true;
                  if ("Backspace" === t5.key && !(0, d.yl)(t5) && !t5.shiftKey && !t5.altKey && "" === n3.toString()) {
                    if (St(e4, n3, t5, a2)) return true;
                    if (o2) {
                      if (o2.previousElementSibling && o2.previousElementSibling.classList.contains("vditor-wysiwyg__block") && "0" === o2.previousElementSibling.getAttribute("data-block") && "UL" !== o2.tagName && "OL" !== o2.tagName) {
                        var k2 = (0, D.im)(o2, e4.wysiwyg.element, n3).start;
                        if (0 === k2 && 0 === n3.startOffset || 1 === k2 && o2.innerText.startsWith(i.g.ZWSP)) return ie(o2.previousElementSibling.lastElementChild, e4, false), "" === o2.innerHTML.trim().replace(i.g.ZWSP, "") && (o2.remove(), Q(e4)), t5.preventDefault(), true;
                      }
                      var S2 = n3.startOffset;
                      if ("" === n3.toString() && 3 === r2.nodeType && "\n" === r2.textContent.charAt(S2 - 2) && r2.textContent.charAt(S2 - 1) !== i.g.ZWSP && ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(r2.parentElement.tagName)) return r2.textContent = r2.textContent.substring(0, S2 - 1) + i.g.ZWSP, n3.setStart(r2, S2), n3.collapse(true), Q(e4), t5.preventDefault(), true;
                      r2.textContent === i.g.ZWSP && 1 === n3.startOffset && !r2.previousSibling && function(e5) {
                        for (var t6 = e5.startContainer.nextSibling; t6 && "" === t6.textContent; ) t6 = t6.nextSibling;
                        return !(!t6 || 3 === t6.nodeType || "CODE" !== t6.tagName && "math-inline" !== t6.getAttribute("data-type") && "html-entity" !== t6.getAttribute("data-type") && "html-inline" !== t6.getAttribute("data-type"));
                      }(n3) && (r2.textContent = ""), o2.querySelectorAll("span.vditor-wysiwyg__block[data-type='math-inline']").forEach(function(e5) {
                        e5.firstElementChild.style.display = "inline", e5.lastElementChild.style.display = "none";
                      }), o2.querySelectorAll("span.vditor-wysiwyg__block[data-type='html-entity']").forEach(function(e5) {
                        e5.firstElementChild.style.display = "inline", e5.lastElementChild.style.display = "none";
                      });
                    }
                  }
                  if ((0, d.vU)() && 1 === n3.startOffset && r2.textContent.indexOf(i.g.ZWSP) > -1 && r2.previousSibling && 3 !== r2.previousSibling.nodeType && "CODE" === r2.previousSibling.tagName && ("Backspace" === t5.key || "ArrowLeft" === t5.key)) return n3.selectNodeContents(r2.previousSibling), n3.collapse(false), t5.preventDefault(), true;
                  if (Tt(t5, o2, n3)) return t5.preventDefault(), true;
                  if (Ye(n3, t5.key), "ArrowDown" === t5.key) {
                    var L2 = r2.nextSibling;
                    L2 && 3 !== L2.nodeType && "math-inline" === L2.getAttribute("data-type") && n3.setStartAfter(L2);
                  }
                  return !(!o2 || !j(o2, e4, t5, n3) || (t5.preventDefault(), 0));
                }(e3, t4)) return;
              } else if ("ir" === e3.currentMode && function(e4, t5) {
                if (e4.ir.composingLock = t5.isComposing, t5.isComposing) return false;
                -1 !== t5.key.indexOf("Arrow") || "Meta" === t5.key || "Control" === t5.key || "Alt" === t5.key || "Shift" === t5.key || "CapsLock" === t5.key || "Escape" === t5.key || /^F\d{1,2}$/.test(t5.key) || e4.undo.recordFirstPosition(e4, t5);
                var n3 = (0, D.zh)(e4), r2 = n3.startContainer;
                if (!Je(t5, e4, r2)) return false;
                if (Xe(n3, e4, t5), Lt(n3), "Enter" !== t5.key && "Tab" !== t5.key && "Backspace" !== t5.key && -1 === t5.key.indexOf("Arrow") && !(0, d.yl)(t5) && "Escape" !== t5.key && "Delete" !== t5.key) return false;
                var o2 = (0, y.a1)(r2, "data-newline", "1");
                if (!(0, d.yl)(t5) && !t5.altKey && !t5.shiftKey && "Enter" === t5.key && o2 && n3.startOffset < o2.textContent.length) {
                  var a2 = o2.previousElementSibling;
                  a2 && (n3.insertNode(document.createTextNode(a2.textContent)), n3.collapse(false));
                  var l2 = o2.nextSibling;
                  l2 && (n3.insertNode(document.createTextNode(l2.textContent)), n3.collapse(true));
                }
                var s2 = (0, y.lG)(r2, "P");
                if (mt(t5, e4, s2, n3)) return true;
                if (ut(n3, e4, s2, t5)) return true;
                if (Et(e4, n3, t5, s2)) return true;
                var c2 = (0, y.fb)(r2, "vditor-ir__marker--pre");
                if (c2 && "PRE" === c2.tagName) {
                  var u2 = c2.firstChild;
                  if (wt(e4, t5, c2, n3)) return true;
                  if (("math-block" === u2.getAttribute("data-type") || "html-block" === u2.getAttribute("data-type")) && rt(e4, t5, n3, u2, c2.parentElement)) return true;
                  if (nt(e4, t5, n3, u2, c2.parentElement)) return true;
                }
                var p2 = (0, y.a1)(r2, "data-type", "code-block-info");
                if (p2) {
                  if ("Enter" === t5.key || "Tab" === t5.key) return n3.selectNodeContents(p2.nextElementSibling.firstChild), n3.collapse(true), t5.preventDefault(), v(e4, ["hint"]), true;
                  if ("Backspace" === t5.key) {
                    var m2 = (0, D.im)(p2, e4.ir.element).start;
                    1 === m2 && n3.setStart(r2, 0), 2 === m2 && (e4.hint.recentLanguage = "");
                  }
                  if (rt(e4, t5, n3, p2, p2.parentElement)) return v(e4, ["hint"]), true;
                }
                var f2 = (0, y.lG)(r2, "TD") || (0, y.lG)(r2, "TH");
                if (t5.key.indexOf("Arrow") > -1 && f2) {
                  var h2 = $e(f2);
                  if (h2 && rt(e4, t5, n3, f2, h2)) return true;
                  var g2 = et(f2);
                  if (g2 && nt(e4, t5, n3, f2, g2)) return true;
                }
                if (bt(e4, t5, n3)) return true;
                if (kt(e4, n3, t5)) return true;
                if (pt(e4, n3, t5)) return true;
                var w2 = (0, b.W)(r2);
                if (w2) {
                  var E2;
                  if (P("⌘=", t5)) return (E2 = w2.querySelector(".vditor-ir__marker--heading")) && E2.textContent.trim().length > 1 && _t(e4, E2.textContent.substr(1)), t5.preventDefault(), true;
                  if (P("⌘-", t5)) return (E2 = w2.querySelector(".vditor-ir__marker--heading")) && E2.textContent.trim().length < 6 && _t(e4, E2.textContent.trim() + "# "), t5.preventDefault(), true;
                }
                var k2 = (0, y.F9)(r2);
                if ("Backspace" === t5.key && !(0, d.yl)(t5) && !t5.shiftKey && !t5.altKey && "" === n3.toString()) {
                  if (St(e4, n3, t5, s2)) return true;
                  if (k2 && k2.previousElementSibling && "UL" !== k2.tagName && "OL" !== k2.tagName && ("code-block" === k2.previousElementSibling.getAttribute("data-type") || "math-block" === k2.previousElementSibling.getAttribute("data-type"))) {
                    var S2 = (0, D.im)(k2, e4.ir.element, n3).start;
                    if (0 === S2 || 1 === S2 && k2.innerText.startsWith(i.g.ZWSP)) return n3.selectNodeContents(k2.previousElementSibling.querySelector(".vditor-ir__marker--pre code")), n3.collapse(false), q(n3, e4), "" === k2.textContent.trim().replace(i.g.ZWSP, "") && (k2.remove(), At(e4)), t5.preventDefault(), true;
                  }
                  if (w2) {
                    var L2 = w2.firstElementChild.textContent.length;
                    (0, D.im)(w2, e4.ir.element).start === L2 && (n3.setStart(w2.firstElementChild.firstChild, L2 - 1), n3.collapse(true), (0, D.Hc)(n3));
                  }
                }
                return !(("ArrowUp" !== t5.key && "ArrowDown" !== t5.key || !k2 || (k2.querySelectorAll(".vditor-ir__node").forEach(function(e5) {
                  e5.contains(r2) || e5.classList.add("vditor-ir__node--hidden");
                }), !Tt(t5, k2, n3))) && (Ye(n3, t5.key), !k2 || !j(k2, e4, t5, n3) || (t5.preventDefault(), 0)));
              }(e3, t4)) return;
              if (e3.options.ctrlEnter && P("⌘Enter", t4)) return e3.options.ctrlEnter(a(e3)), void t4.preventDefault();
              if (P("⌘Z", t4) && !e3.toolbar.elements.undo) return e3.undo.undo(e3), void t4.preventDefault();
              if (P("⌘Y", t4) && !e3.toolbar.elements.redo) return e3.undo.redo(e3), void t4.preventDefault();
              if ("Escape" === t4.key) return "block" === e3.hint.element.style.display ? e3.hint.element.style.display = "none" : e3.options.esc && !t4.isComposing && e3.options.esc(a(e3)), void t4.preventDefault();
              if ((0, d.yl)(t4) && t4.altKey && !t4.shiftKey && /^Digit[1-6]$/.test(t4.code)) {
                if ("wysiwyg" === e3.currentMode) {
                  var n2 = t4.code.replace("Digit", "H");
                  (0, y.lG)(getSelection().getRangeAt(0).startContainer, n2) ? re(e3) : ne(e3, n2), Q(e3);
                } else "sv" === e3.currentMode ? Re(e3, "#".repeat(parseInt(t4.code.replace("Digit", ""), 10)) + " ") : "ir" === e3.currentMode && _t(e3, "#".repeat(parseInt(t4.code.replace("Digit", ""), 10)) + " ");
                return t4.preventDefault(), true;
              }
              if ((0, d.yl)(t4) && t4.altKey && !t4.shiftKey && /^Digit[7-9]$/.test(t4.code)) return "Digit7" === t4.code ? we(e3, "wysiwyg", t4) : "Digit8" === t4.code ? we(e3, "ir", t4) : "Digit9" === t4.code && we(e3, "sv", t4), true;
              e3.options.toolbar.find(function(n3) {
                return !n3.hotkey || n3.toolbar ? !!n3.toolbar && !!n3.toolbar.find(function(n4) {
                  return !!n4.hotkey && (P(n4.hotkey, t4) ? (e3.toolbar.elements[n4.name].children[0].dispatchEvent(new CustomEvent((0, d.Le)())), t4.preventDefault(), true) : void 0);
                }) : P(n3.hotkey, t4) ? (e3.toolbar.elements[n3.name].children[0].dispatchEvent(new CustomEvent((0, d.Le)())), t4.preventDefault(), true) : void 0;
              });
            }
          });
        }, He = function(e3, t3) {
          t3.addEventListener("selectstart", function(n2) {
            t3.onmouseup = function() {
              setTimeout(function() {
                var t4 = ke(e3[e3.currentMode].element);
                t4.trim() ? ("wysiwyg" === e3.currentMode && e3.options.comment.enable && ((0, y.a1)(n2.target, "data-type", "footnotes-block") || (0, y.a1)(n2.target, "data-type", "link-ref-defs-block") ? e3.wysiwyg.hideComment() : e3.wysiwyg.showComment()), e3.options.select && e3.options.select(t4)) : "wysiwyg" === e3.currentMode && e3.options.comment.enable && e3.wysiwyg.hideComment();
              });
            };
          });
        }, Ne = function(e3, t3) {
          var n2 = (0, D.zh)(e3);
          n2.extractContents(), n2.insertNode(document.createTextNode(Lute.Caret)), n2.insertNode(document.createTextNode(t3));
          var r2 = (0, y.a1)(n2.startContainer, "data-block", "0");
          r2 || (r2 = e3.sv.element);
          var i2 = e3.lute.SpinVditorSVDOM(r2.textContent);
          i2 = "<div data-block='0'>" + i2.replace(/<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g, '<span data-type="newline"><br /><span style="display: none">\n</span></span><span data-type="newline"><br /><span style="display: none">\n</span></span></div><div data-block="0"><') + "</div>", r2.isEqualNode(e3.sv.element) ? r2.innerHTML = i2 : r2.outerHTML = i2, V(e3.sv.element), (0, D.ib)(e3.sv.element, n2), _e(e3);
        }, De = function(e3, t3, n2) {
          void 0 === n2 && (n2 = true);
          var r2 = e3;
          for (3 === r2.nodeType && (r2 = r2.parentElement); r2; ) {
            if (r2.getAttribute("data-type") === t3) return r2;
            r2 = n2 ? r2.previousElementSibling : r2.nextElementSibling;
          }
          return false;
        }, Oe = function(e3, t3) {
          return w("SpinVditorSVDOM", e3, "argument", t3.options.debugger), e3 = "<div data-block='0'>" + t3.lute.SpinVditorSVDOM(e3).replace(/<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g, '<span data-type="newline"><br /><span style="display: none">\n</span></span><span data-type="newline"><br /><span style="display: none">\n</span></span></div><div data-block="0"><') + "</div>", w("SpinVditorSVDOM", e3, "result", t3.options.debugger), e3;
        }, Ie = function(e3) {
          var t3 = e3.getAttribute("data-type"), n2 = e3.previousElementSibling, r2 = t3 && "text" !== t3 && "table" !== t3 && "heading-marker" !== t3 && "newline" !== t3 && "yaml-front-matter-open-marker" !== t3 && "yaml-front-matter-close-marker" !== t3 && "code-block-info" !== t3 && "code-block-close-marker" !== t3 && "code-block-open-marker" !== t3 ? e3.textContent : "", i2 = false;
          for ("newline" === t3 && (i2 = true); n2 && !i2; ) {
            var o2 = n2.getAttribute("data-type");
            if ("li-marker" === o2 || "blockquote-marker" === o2 || "task-marker" === o2 || "padding" === o2) {
              var a2 = n2.textContent;
              if ("li-marker" !== o2 || "code-block-open-marker" !== t3 && "code-block-info" !== t3) if ("code-block-close-marker" === t3 && n2.nextElementSibling.isSameNode(e3)) {
                var l2 = De(e3, "code-block-open-marker");
                l2 && l2.previousElementSibling && (n2 = l2.previousElementSibling, r2 = a2 + r2);
              } else r2 = a2 + r2;
              else r2 = a2.replace(/\S/g, " ") + r2;
            } else "newline" === o2 && (i2 = true);
            n2 = n2.previousElementSibling;
          }
          return r2;
        }, je = function(e3, t3) {
          void 0 === t3 && (t3 = { enableAddUndoStack: true, enableHint: false, enableInput: true }), t3.enableHint && e3.hint.render(e3), e3.preview.render(e3);
          var n2 = a(e3);
          "function" == typeof e3.options.input && t3.enableInput && e3.options.input(n2), e3.options.counter.enable && e3.counter.render(e3, n2), e3.options.cache.enable && (0, d.pK)() && (localStorage.setItem(e3.options.cache.id, n2), e3.options.cache.after && e3.options.cache.after(n2)), e3.devtools && e3.devtools.renderEchart(e3), clearTimeout(e3.sv.processTimeoutId), e3.sv.processTimeoutId = window.setTimeout(function() {
            t3.enableAddUndoStack && !e3.sv.composingLock && e3.undo.addToUndoStack(e3);
          }, e3.options.undoDelay);
        }, Re = function(e3, t3) {
          var n2 = (0, D.zh)(e3), r2 = (0, b.S)(n2.startContainer, "SPAN");
          r2 && "" !== r2.textContent.trim() && (t3 = "\n" + t3), n2.collapse(true), document.execCommand("insertHTML", false, t3);
        }, Pe = function(e3, t3, n2, r2) {
          var i2 = (0, D.zh)(e3), o2 = t3.getAttribute("data-type");
          0 === e3.sv.element.childNodes.length && (e3.sv.element.innerHTML = '<span data-type="p" data-block="0"><span data-type="text"><wbr></span></span><span data-type="newline"><br><span style="display: none">\n</span></span>', (0, D.ib)(e3.sv.element, i2));
          var a2 = (0, y.F9)(i2.startContainer), l2 = (0, b.S)(i2.startContainer, "SPAN");
          if (a2) {
            if ("link" === o2) {
              var s2 = void 0;
              return s2 = "" === i2.toString() ? "" + n2 + Lute.Caret + r2 : "" + n2 + i2.toString() + r2.replace(")", Lute.Caret + ")"), void document.execCommand("insertHTML", false, s2);
            }
            if ("italic" === o2 || "bold" === o2 || "strike" === o2 || "inline-code" === o2 || "code" === o2 || "table" === o2 || "line" === o2) {
              s2 = void 0;
              return s2 = "" === i2.toString() ? "" + n2 + Lute.Caret + ("code" === o2 ? "" : r2) : "" + n2 + i2.toString() + Lute.Caret + ("code" === o2 ? "" : r2), "table" === o2 || "code" === o2 && l2 && "" !== l2.textContent ? s2 = "\n\n" + s2 : "line" === o2 && (s2 = "\n\n" + n2 + "\n" + Lute.Caret), void document.execCommand("insertHTML", false, s2);
            }
            if (("check" === o2 || "list" === o2 || "ordered-list" === o2 || "quote" === o2) && l2) {
              var d2 = "* ";
              "check" === o2 ? d2 = "* [ ] " : "ordered-list" === o2 ? d2 = "1. " : "quote" === o2 && (d2 = "> ");
              var c2 = De(l2, "newline");
              return c2 ? c2.insertAdjacentText("afterend", d2) : a2.insertAdjacentText("afterbegin", d2), void U(e3);
            }
            (0, D.ib)(e3.sv.element, i2), je(e3);
          }
        }, qe = function(e3) {
          switch (e3.currentMode) {
            case "ir":
              return e3.ir.element;
            case "wysiwyg":
              return e3.wysiwyg.element;
            case "sv":
              return e3.sv.element;
          }
        }, Be = function(e3, t3) {
          e3.options.upload.setHeaders && (e3.options.upload.headers = e3.options.upload.setHeaders()), e3.options.upload.headers && Object.keys(e3.options.upload.headers).forEach(function(n2) {
            t3.setRequestHeader(n2, e3.options.upload.headers[n2]);
          });
        }, Ve = function(e3, t3, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function a2(e4) {
              try {
                s2(r2.next(e4));
              } catch (e5) {
                o2(e5);
              }
            }
            function l2(e4) {
              try {
                s2(r2.throw(e4));
              } catch (e5) {
                o2(e5);
              }
            }
            function s2(e4) {
              var t4;
              e4.done ? i2(e4.value) : (t4 = e4.value, t4 instanceof n2 ? t4 : new n2(function(e5) {
                e5(t4);
              })).then(a2, l2);
            }
            s2((r2 = r2.apply(e3, t3 || [])).next());
          });
        }, Ue = function(e3, t3) {
          var n2, r2, i2, o2, a2 = { label: 0, sent: function() {
            if (1 & i2[0]) throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: l2(0), throw: l2(1), return: l2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function l2(o3) {
            return function(l3) {
              return function(o4) {
                if (n2) throw new TypeError("Generator is already executing.");
                for (; a2; ) try {
                  if (n2 = 1, r2 && (i2 = 2 & o4[0] ? r2.return : o4[0] ? r2.throw || ((i2 = r2.return) && i2.call(r2), 0) : r2.next) && !(i2 = i2.call(r2, o4[1])).done) return i2;
                  switch (r2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                    case 0:
                    case 1:
                      i2 = o4;
                      break;
                    case 4:
                      return a2.label++, { value: o4[1], done: false };
                    case 5:
                      a2.label++, r2 = o4[1], o4 = [0];
                      continue;
                    case 7:
                      o4 = a2.ops.pop(), a2.trys.pop();
                      continue;
                    default:
                      if (!(i2 = a2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                        a2 = 0;
                        continue;
                      }
                      if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                        a2.label = o4[1];
                        break;
                      }
                      if (6 === o4[0] && a2.label < i2[1]) {
                        a2.label = i2[1], i2 = o4;
                        break;
                      }
                      if (i2 && a2.label < i2[2]) {
                        a2.label = i2[2], a2.ops.push(o4);
                        break;
                      }
                      i2[2] && a2.ops.pop(), a2.trys.pop();
                      continue;
                  }
                  o4 = t3.call(e3, a2);
                } catch (e4) {
                  o4 = [6, e4], r2 = 0;
                } finally {
                  n2 = i2 = 0;
                }
                if (5 & o4[0]) throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, l3]);
            };
          }
        }, We = function() {
          this.isUploading = false, this.element = document.createElement("div"), this.element.className = "vditor-upload";
        }, Ge = function(e3, t3, n2) {
          return Ve(void 0, void 0, void 0, function() {
            var r2, i2, o2, a2, l2, s2, d2, c2, u2, p2, m2, f2, h2, v2;
            return Ue(this, function(g2) {
              switch (g2.label) {
                case 0:
                  for (r2 = [], i2 = true === e3.options.upload.multiple ? t3.length : 1, f2 = 0; f2 < i2; f2++) (o2 = t3[f2]) instanceof DataTransferItem && (o2 = o2.getAsFile()), r2.push(o2);
                  return e3.options.upload.handler ? [4, e3.options.upload.handler(r2)] : [3, 2];
                case 1:
                  return a2 = g2.sent(), n2 && (n2.value = ""), "string" == typeof a2 ? (e3.tip.show(a2), [2]) : [2];
                case 2:
                  return e3.options.upload.url && e3.upload ? e3.options.upload.file ? [4, e3.options.upload.file(r2)] : [3, 4] : (n2 && (n2.value = ""), e3.tip.show("please config: options.upload.url"), [2]);
                case 3:
                  r2 = g2.sent(), g2.label = 4;
                case 4:
                  if (e3.options.upload.validate && "string" == typeof (a2 = e3.options.upload.validate(r2))) return e3.tip.show(a2), [2];
                  if (l2 = qe(e3), e3.upload.range = (0, D.zh)(e3), s2 = function(e4, t4) {
                    e4.tip.hide();
                    for (var n3 = [], r3 = "", i3 = "", o3 = (e4.options.lang, e4.options, function(o4, a4) {
                      var l4 = t4[a4], s3 = true;
                      l4.name || (r3 += "<li>" + window.VditorI18n.nameEmpty + "</li>", s3 = false), l4.size > e4.options.upload.max && (r3 += "<li>" + l4.name + " " + window.VditorI18n.over + " " + e4.options.upload.max / 1024 / 1024 + "M</li>", s3 = false);
                      var d3 = l4.name.lastIndexOf("."), c3 = l4.name.substr(d3), u3 = e4.options.upload.filename(l4.name.substr(0, d3)) + c3;
                      e4.options.upload.accept && (e4.options.upload.accept.split(",").some(function(e5) {
                        var t5 = e5.trim();
                        if (0 === t5.indexOf(".")) {
                          if (c3.toLowerCase() === t5.toLowerCase()) return true;
                        } else if (l4.type.split("/")[0] === t5.split("/")[0]) return true;
                        return false;
                      }) || (r3 += "<li>" + l4.name + " " + window.VditorI18n.fileTypeError + "</li>", s3 = false)), s3 && (n3.push(l4), i3 += "<li>" + u3 + " " + window.VditorI18n.uploading + "</li>");
                    }), a3 = t4.length, l3 = 0; l3 < a3; l3++) o3(0, l3);
                    return e4.tip.show("<ul>" + r3 + i3 + "</ul>"), n3;
                  }(e3, r2), 0 === s2.length) return n2 && (n2.value = ""), [2];
                  for (d2 = new FormData(), c2 = e3.options.upload.extraData, u2 = 0, p2 = Object.keys(c2); u2 < p2.length; u2++) m2 = p2[u2], d2.append(m2, c2[m2]);
                  for (f2 = 0, h2 = s2.length; f2 < h2; f2++) d2.append(e3.options.upload.fieldName, s2[f2]);
                  return (v2 = new XMLHttpRequest()).open("POST", e3.options.upload.url), e3.options.upload.token && v2.setRequestHeader("X-Upload-Token", e3.options.upload.token), e3.options.upload.withCredentials && (v2.withCredentials = true), Be(e3, v2), e3.upload.isUploading = true, l2.setAttribute("contenteditable", "false"), v2.onreadystatechange = function() {
                    if (v2.readyState === XMLHttpRequest.DONE) {
                      if (e3.upload.isUploading = false, l2.setAttribute("contenteditable", "true"), v2.status >= 200 && v2.status < 300) if (e3.options.upload.success) e3.options.upload.success(l2, v2.responseText);
                      else {
                        var r3 = v2.responseText;
                        e3.options.upload.format && (r3 = e3.options.upload.format(t3, v2.responseText)), function(e4, t4) {
                          qe(t4).focus();
                          var n3 = JSON.parse(e4), r4 = "";
                          1 === n3.code && (r4 = "" + n3.msg), n3.data.errFiles && n3.data.errFiles.length > 0 && (r4 = "<ul><li>" + r4 + "</li>", n3.data.errFiles.forEach(function(e5) {
                            var n4 = e5.lastIndexOf("."), i4 = t4.options.upload.filename(e5.substr(0, n4)) + e5.substr(n4);
                            r4 += "<li>" + i4 + " " + window.VditorI18n.uploadError + "</li>";
                          }), r4 += "</ul>"), r4 ? t4.tip.show(r4) : t4.tip.hide();
                          var i3 = "";
                          Object.keys(n3.data.succMap).forEach(function(e5) {
                            var r5 = n3.data.succMap[e5], o3 = e5.lastIndexOf("."), a3 = e5.substr(o3), l3 = t4.options.upload.filename(e5.substr(0, o3)) + a3;
                            0 === (a3 = a3.toLowerCase()).indexOf(".wav") || 0 === a3.indexOf(".mp3") || 0 === a3.indexOf(".ogg") ? "wysiwyg" === t4.currentMode ? i3 += '<div class="vditor-wysiwyg__block" data-type="html-block"\n data-block="0"><pre><code>&lt;audio controls="controls" src="' + r5 + '"&gt;&lt;/audio&gt;</code></pre><pre class="vditor-wysiwyg__preview" data-render="1"><audio controls="controls" src="' + r5 + '"></audio></pre></div>\n' : "ir" === t4.currentMode ? i3 += '<audio controls="controls" src="' + r5 + '"></audio>\n' : i3 += "[" + l3 + "](" + r5 + ")\n" : 0 === a3.indexOf(".apng") || 0 === a3.indexOf(".bmp") || 0 === a3.indexOf(".gif") || 0 === a3.indexOf(".ico") || 0 === a3.indexOf(".cur") || 0 === a3.indexOf(".jpg") || 0 === a3.indexOf(".jpeg") || 0 === a3.indexOf(".jfif") || 0 === a3.indexOf(".pjp") || 0 === a3.indexOf(".pjpeg") || 0 === a3.indexOf(".png") || 0 === a3.indexOf(".svg") || 0 === a3.indexOf(".webp") ? "wysiwyg" === t4.currentMode ? i3 += '<img alt="' + l3 + '" src="' + r5 + '">\n' : i3 += "![" + l3 + "](" + r5 + ")\n" : "wysiwyg" === t4.currentMode ? i3 += '<a href="' + r5 + '">' + l3 + "</a>\n" : i3 += "[" + l3 + "](" + r5 + ")\n";
                          }), (0, D.Hc)(t4.upload.range), document.execCommand("insertHTML", false, i3), t4.upload.range = getSelection().getRangeAt(0).cloneRange();
                        }(r3, e3);
                      }
                      else e3.options.upload.error ? e3.options.upload.error(v2.responseText) : e3.tip.show(v2.responseText);
                      n2 && (n2.value = ""), e3.upload.element.style.display = "none";
                    }
                  }, v2.upload.onprogress = function(t4) {
                    if (t4.lengthComputable) {
                      var n3 = t4.loaded / t4.total * 100;
                      e3.upload.element.style.display = "block", e3.upload.element.style.width = n3 + "%";
                    }
                  }, v2.send(d2), [2];
              }
            });
          });
        }, ze = function(e3, t3, n2) {
          var r2, o2 = (0, y.F9)(t3.startContainer);
          if (o2 || (o2 = e3.wysiwyg.element), n2 && "formatItalic" !== n2.inputType && "deleteByDrag" !== n2.inputType && "insertFromDrop" !== n2.inputType && "formatBold" !== n2.inputType && "formatRemove" !== n2.inputType && "formatStrikeThrough" !== n2.inputType && "insertUnorderedList" !== n2.inputType && "insertOrderedList" !== n2.inputType && "formatOutdent" !== n2.inputType && "formatIndent" !== n2.inputType && "" !== n2.inputType || !n2) {
            var a2 = function(e4) {
              for (var t4 = e4.previousSibling; t4; ) {
                if (3 !== t4.nodeType && "A" === t4.tagName && !t4.previousSibling && "" === t4.innerHTML.replace(i.g.ZWSP, "") && t4.nextSibling) return t4;
                t4 = t4.previousSibling;
              }
              return false;
            }(t3.startContainer);
            a2 && a2.remove(), e3.wysiwyg.element.querySelectorAll("wbr").forEach(function(e4) {
              e4.remove();
            }), t3.insertNode(document.createElement("wbr")), o2.querySelectorAll("[style]").forEach(function(e4) {
              e4.removeAttribute("style");
            }), o2.querySelectorAll(".vditor-comment").forEach(function(e4) {
              "" === e4.textContent.trim() && (e4.classList.remove("vditor-comment", "vditor-comment--focus"), e4.removeAttribute("data-cmtids"));
            }), null === (r2 = o2.previousElementSibling) || void 0 === r2 || r2.querySelectorAll(".vditor-comment").forEach(function(e4) {
              "" === e4.textContent.trim() && (e4.classList.remove("vditor-comment", "vditor-comment--focus"), e4.removeAttribute("data-cmtids"));
            });
            var l2 = "";
            "link-ref-defs-block" === o2.getAttribute("data-type") && (o2 = e3.wysiwyg.element);
            var s2, d2 = o2.isEqualNode(e3.wysiwyg.element), c2 = (0, y.a1)(o2, "data-type", "footnotes-block");
            if (d2) l2 = o2.innerHTML;
            else {
              var u2 = (0, y.O9)(t3.startContainer);
              if (u2 && !c2) {
                var p2 = (0, b.S)(t3.startContainer, "BLOCKQUOTE");
                o2 = p2 ? (0, y.F9)(t3.startContainer) || o2 : u2;
              }
              if (c2 && (o2 = c2), l2 = o2.outerHTML, "UL" === o2.tagName || "OL" === o2.tagName) {
                var m2 = o2.previousElementSibling, f2 = o2.nextElementSibling;
                !m2 || "UL" !== m2.tagName && "OL" !== m2.tagName || (l2 = m2.outerHTML + l2, m2.remove()), !f2 || "UL" !== f2.tagName && "OL" !== f2.tagName || (l2 += f2.outerHTML, f2.remove()), l2 = l2.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
              }
              o2.innerText.startsWith("```") || (e3.wysiwyg.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(e4) {
                e4 && !o2.isEqualNode(e4) && (l2 += e4.outerHTML, e4.remove());
              }), e3.wysiwyg.element.querySelectorAll("[data-type='footnotes-block']").forEach(function(e4) {
                e4 && !o2.isEqualNode(e4) && (l2 += e4.outerHTML, e4.remove());
              }));
            }
            if ('<p data-block="0">```<wbr></p>' === (l2 = l2.replace(/<\/(strong|b)><strong data-marker="\W{2}">/g, "").replace(/<\/(em|i)><em data-marker="\W{1}">/g, "").replace(/<\/(s|strike)><s data-marker="~{1,2}">/g, "")) && e3.hint.recentLanguage && (l2 = '<p data-block="0">```<wbr></p>'.replace("```", "```" + e3.hint.recentLanguage)), w("SpinVditorDOM", l2, "argument", e3.options.debugger), l2 = e3.lute.SpinVditorDOM(l2), w("SpinVditorDOM", l2, "result", e3.options.debugger), d2) o2.innerHTML = l2;
            else if (o2.outerHTML = l2, c2) {
              var h2 = (0, y.E2)(e3.wysiwyg.element.querySelector("wbr"), "LI");
              if (h2) {
                var v2 = e3.wysiwyg.element.querySelector('sup[data-type="footnotes-ref"][data-footnotes-label="' + h2.getAttribute("data-marker") + '"]');
                v2 && v2.setAttribute("aria-label", h2.textContent.trim().substr(0, 24));
              }
            }
            var g2, E2 = e3.wysiwyg.element.querySelectorAll("[data-type='link-ref-defs-block']");
            E2.forEach(function(e4, t4) {
              0 === t4 ? s2 = e4 : (s2.insertAdjacentHTML("beforeend", e4.innerHTML), e4.remove());
            }), E2.length > 0 && e3.wysiwyg.element.insertAdjacentElement("beforeend", E2[0]);
            var k2 = e3.wysiwyg.element.querySelectorAll("[data-type='footnotes-block']");
            k2.forEach(function(e4, t4) {
              0 === t4 ? g2 = e4 : (g2.insertAdjacentHTML("beforeend", e4.innerHTML), e4.remove());
            }), k2.length > 0 && e3.wysiwyg.element.insertAdjacentElement("beforeend", k2[0]), (0, D.ib)(e3.wysiwyg.element, t3), e3.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(t4) {
              N(t4, e3);
            }), n2 && ("deleteContentBackward" === n2.inputType || "deleteContentForward" === n2.inputType) && e3.options.comment.enable && (e3.wysiwyg.triggerRemoveComment(e3), e3.options.comment.adjustTop(e3.wysiwyg.getComments(e3, true)));
          }
          O(e3), Q(e3, { enableAddUndoStack: true, enableHint: true, enableInput: true });
        }, Ke = function(e3, t3) {
          return Object.defineProperty ? Object.defineProperty(e3, "raw", { value: t3 }) : e3.raw = t3, e3;
        }, Fe = function(e3, t3, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function a2(e4) {
              try {
                s2(r2.next(e4));
              } catch (e5) {
                o2(e5);
              }
            }
            function l2(e4) {
              try {
                s2(r2.throw(e4));
              } catch (e5) {
                o2(e5);
              }
            }
            function s2(e4) {
              var t4;
              e4.done ? i2(e4.value) : (t4 = e4.value, t4 instanceof n2 ? t4 : new n2(function(e5) {
                e5(t4);
              })).then(a2, l2);
            }
            s2((r2 = r2.apply(e3, t3 || [])).next());
          });
        }, Ze = function(e3, t3) {
          var n2, r2, i2, o2, a2 = { label: 0, sent: function() {
            if (1 & i2[0]) throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: l2(0), throw: l2(1), return: l2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function l2(o3) {
            return function(l3) {
              return function(o4) {
                if (n2) throw new TypeError("Generator is already executing.");
                for (; a2; ) try {
                  if (n2 = 1, r2 && (i2 = 2 & o4[0] ? r2.return : o4[0] ? r2.throw || ((i2 = r2.return) && i2.call(r2), 0) : r2.next) && !(i2 = i2.call(r2, o4[1])).done) return i2;
                  switch (r2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                    case 0:
                    case 1:
                      i2 = o4;
                      break;
                    case 4:
                      return a2.label++, { value: o4[1], done: false };
                    case 5:
                      a2.label++, r2 = o4[1], o4 = [0];
                      continue;
                    case 7:
                      o4 = a2.ops.pop(), a2.trys.pop();
                      continue;
                    default:
                      if (!(i2 = a2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                        a2 = 0;
                        continue;
                      }
                      if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                        a2.label = o4[1];
                        break;
                      }
                      if (6 === o4[0] && a2.label < i2[1]) {
                        a2.label = i2[1], i2 = o4;
                        break;
                      }
                      if (i2 && a2.label < i2[2]) {
                        a2.label = i2[2], a2.ops.push(o4);
                        break;
                      }
                      i2[2] && a2.ops.pop(), a2.trys.pop();
                      continue;
                  }
                  o4 = t3.call(e3, a2);
                } catch (e4) {
                  o4 = [6, e4], r2 = 0;
                } finally {
                  n2 = i2 = 0;
                }
                if (5 & o4[0]) throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, l3]);
            };
          }
        }, Je = function(e3, t3, n2) {
          if (229 === e3.keyCode && "" === e3.code && "Unidentified" === e3.key && "sv" !== t3.currentMode) {
            var r2 = (0, y.F9)(n2);
            if (r2 && "" === r2.textContent.trim()) return t3[t3.currentMode].composingLock = true, false;
          }
          return true;
        }, Xe = function(e3, t3, n2) {
          if (!("Enter" === n2.key || "Tab" === n2.key || "Backspace" === n2.key || n2.key.indexOf("Arrow") > -1 || (0, d.yl)(n2) || "Escape" === n2.key || n2.shiftKey || n2.altKey)) {
            var r2 = (0, y.lG)(e3.startContainer, "P") || (0, y.lG)(e3.startContainer, "LI");
            if (r2 && 0 === (0, D.im)(r2, t3[t3.currentMode].element, e3).start) {
              r2.nodeValue && (r2.nodeValue = r2.nodeValue.replace(/\u2006/g, ""));
              var o2 = document.createTextNode(i.g.ZWSP);
              e3.insertNode(o2), e3.setStartAfter(o2);
            }
          }
        }, Ye = function(e3, t3) {
          if ("ArrowDown" === t3 || "ArrowUp" === t3) {
            var n2 = (0, y.a1)(e3.startContainer, "data-type", "math-inline") || (0, y.a1)(e3.startContainer, "data-type", "html-entity") || (0, y.a1)(e3.startContainer, "data-type", "html-inline");
            n2 && ("ArrowDown" === t3 && e3.setStartAfter(n2.parentElement), "ArrowUp" === t3 && e3.setStartBefore(n2.parentElement));
          }
        }, Qe = function(e3, t3) {
          var n2 = (0, D.zh)(e3), r2 = (0, y.F9)(n2.startContainer);
          r2 && (r2.insertAdjacentHTML(t3, '<p data-block="0">' + i.g.ZWSP + "<wbr>\n</p>"), (0, D.ib)(e3[e3.currentMode].element, n2), he(e3), ct(e3));
        }, $e = function(e3) {
          var t3 = (0, y.lG)(e3, "TABLE");
          return !(!t3 || !t3.rows[0].cells[0].isSameNode(e3)) && t3;
        }, et = function(e3) {
          var t3 = (0, y.lG)(e3, "TABLE");
          return !(!t3 || !t3.lastElementChild.lastElementChild.lastElementChild.isSameNode(e3)) && t3;
        }, tt = function(e3, t3, n2) {
          void 0 === n2 && (n2 = true);
          var r2 = e3.previousElementSibling;
          return r2 || (r2 = e3.parentElement.previousElementSibling ? e3.parentElement.previousElementSibling.lastElementChild : "TBODY" === e3.parentElement.parentElement.tagName && e3.parentElement.parentElement.previousElementSibling ? e3.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild : null), r2 && (t3.selectNodeContents(r2), n2 || t3.collapse(false), (0, D.Hc)(t3)), r2;
        }, nt = function(e3, t3, n2, r2, o2) {
          var a2 = (0, D.im)(r2, e3[e3.currentMode].element, n2);
          if ("ArrowDown" === t3.key && -1 === r2.textContent.trimRight().substr(a2.start).indexOf("\n") || "ArrowRight" === t3.key && a2.start >= r2.textContent.trimRight().length) {
            var l2 = o2.nextElementSibling;
            return !l2 || l2 && ("TABLE" === l2.tagName || l2.getAttribute("data-type")) ? (o2.insertAdjacentHTML("afterend", '<p data-block="0">' + i.g.ZWSP + "<wbr></p>"), (0, D.ib)(e3[e3.currentMode].element, n2)) : (n2.selectNodeContents(l2), n2.collapse(true), (0, D.Hc)(n2)), t3.preventDefault(), true;
          }
          return false;
        }, rt = function(e3, t3, n2, r2, o2) {
          var a2 = (0, D.im)(r2, e3[e3.currentMode].element, n2);
          if ("ArrowUp" === t3.key && -1 === r2.textContent.substr(0, a2.start).indexOf("\n") || ("ArrowLeft" === t3.key || "Backspace" === t3.key && "" === n2.toString()) && 0 === a2.start) {
            var l2 = o2.previousElementSibling;
            return !l2 || l2 && ("TABLE" === l2.tagName || l2.getAttribute("data-type")) ? (o2.insertAdjacentHTML("beforebegin", '<p data-block="0">' + i.g.ZWSP + "<wbr></p>"), (0, D.ib)(e3[e3.currentMode].element, n2)) : (n2.selectNodeContents(l2), n2.collapse(false), (0, D.Hc)(n2)), t3.preventDefault(), true;
          }
          return false;
        }, it = function(e3, t3, n2, r2) {
          void 0 === r2 && (r2 = true);
          var i2 = (0, y.lG)(t3.startContainer, "LI");
          if (e3[e3.currentMode].element.querySelectorAll("wbr").forEach(function(e4) {
            e4.remove();
          }), t3.insertNode(document.createElement("wbr")), r2 && i2) {
            for (var o2 = "", a2 = 0; a2 < i2.parentElement.childElementCount; a2++) {
              var l2 = i2.parentElement.children[a2].querySelector("input");
              l2 && l2.remove(), o2 += '<p data-block="0">' + i2.parentElement.children[a2].innerHTML.trimLeft() + "</p>";
            }
            i2.parentElement.insertAdjacentHTML("beforebegin", o2), i2.parentElement.remove();
          } else if (i2) if ("check" === n2) i2.parentElement.querySelectorAll("li").forEach(function(e4) {
            e4.insertAdjacentHTML("afterbegin", '<input type="checkbox" />' + (0 === e4.textContent.indexOf(" ") ? "" : " ")), e4.classList.add("vditor-task");
          });
          else {
            i2.querySelector("input") && i2.parentElement.querySelectorAll("li").forEach(function(e4) {
              e4.querySelector("input").remove(), e4.classList.remove("vditor-task");
            });
            var s2 = void 0;
            "list" === n2 ? (s2 = document.createElement("ul")).setAttribute("data-marker", "*") : (s2 = document.createElement("ol")).setAttribute("data-marker", "1."), s2.setAttribute("data-block", "0"), s2.setAttribute("data-tight", i2.parentElement.getAttribute("data-tight")), s2.innerHTML = i2.parentElement.innerHTML, i2.parentElement.parentNode.replaceChild(s2, i2.parentElement);
          }
          else {
            var d2 = (0, y.a1)(t3.startContainer, "data-block", "0");
            d2 || (e3[e3.currentMode].element.querySelector("wbr").remove(), (d2 = e3[e3.currentMode].element.querySelector("p")).innerHTML = "<wbr>"), "check" === n2 ? (d2.insertAdjacentHTML("beforebegin", '<ul data-block="0"><li class="vditor-task"><input type="checkbox" /> ' + d2.innerHTML + "</li></ul>"), d2.remove()) : "list" === n2 ? (d2.insertAdjacentHTML("beforebegin", '<ul data-block="0"><li>' + d2.innerHTML + "</li></ul>"), d2.remove()) : "ordered-list" === n2 && (d2.insertAdjacentHTML("beforebegin", '<ol data-block="0"><li>' + d2.innerHTML + "</li></ol>"), d2.remove());
          }
        }, ot = function(e3, t3, n2) {
          var r2 = t3.previousElementSibling;
          if (t3 && r2) {
            var i2 = [t3];
            Array.from(n2.cloneContents().children).forEach(function(e4, n3) {
              3 !== e4.nodeType && t3 && "" !== e4.textContent.trim() && t3.getAttribute("data-node-id") === e4.getAttribute("data-node-id") && (0 !== n3 && i2.push(t3), t3 = t3.nextElementSibling);
            }), e3[e3.currentMode].element.querySelectorAll("wbr").forEach(function(e4) {
              e4.remove();
            }), n2.insertNode(document.createElement("wbr"));
            var o2 = r2.parentElement, a2 = "";
            i2.forEach(function(e4) {
              var t4 = e4.getAttribute("data-marker");
              1 !== t4.length && (t4 = "1" + t4.slice(-1)), a2 += '<li data-node-id="' + e4.getAttribute("data-node-id") + '" data-marker="' + t4 + '">' + e4.innerHTML + "</li>", e4.remove();
            }), r2.insertAdjacentHTML("beforeend", "<" + o2.tagName + ' data-block="0">' + a2 + "</" + o2.tagName + ">"), "wysiwyg" === e3.currentMode ? o2.outerHTML = e3.lute.SpinVditorDOM(o2.outerHTML) : o2.outerHTML = e3.lute.SpinVditorIRDOM(o2.outerHTML), (0, D.ib)(e3[e3.currentMode].element, n2);
            var l2 = (0, y.O9)(n2.startContainer);
            l2 && l2.querySelectorAll(".vditor-" + e3.currentMode + "__preview[data-render='2']").forEach(function(t4) {
              N(t4, e3), "wysiwyg" === e3.currentMode && t4.previousElementSibling.setAttribute("style", "display:none");
            }), ct(e3), he(e3);
          } else e3[e3.currentMode].element.focus();
        }, at = function(e3, t3, n2, r2) {
          var i2 = (0, y.lG)(t3.parentElement, "LI");
          if (i2) {
            e3[e3.currentMode].element.querySelectorAll("wbr").forEach(function(e4) {
              e4.remove();
            }), n2.insertNode(document.createElement("wbr"));
            var o2 = t3.parentElement, a2 = o2.cloneNode(), l2 = [t3];
            Array.from(n2.cloneContents().children).forEach(function(e4, n3) {
              3 !== e4.nodeType && t3 && "" !== e4.textContent.trim() && t3.getAttribute("data-node-id") === e4.getAttribute("data-node-id") && (0 !== n3 && l2.push(t3), t3 = t3.nextElementSibling);
            });
            var s2 = false, d2 = "";
            o2.querySelectorAll("li").forEach(function(e4) {
              s2 && (d2 += e4.outerHTML, e4.nextElementSibling || e4.previousElementSibling ? e4.remove() : e4.parentElement.remove()), e4.isSameNode(l2[l2.length - 1]) && (s2 = true);
            }), l2.reverse().forEach(function(e4) {
              i2.insertAdjacentElement("afterend", e4);
            }), d2 && (a2.innerHTML = d2, l2[0].insertAdjacentElement("beforeend", a2)), "wysiwyg" === e3.currentMode ? r2.outerHTML = e3.lute.SpinVditorDOM(r2.outerHTML) : r2.outerHTML = e3.lute.SpinVditorIRDOM(r2.outerHTML), (0, D.ib)(e3[e3.currentMode].element, n2);
            var c2 = (0, y.O9)(n2.startContainer);
            c2 && c2.querySelectorAll(".vditor-" + e3.currentMode + "__preview[data-render='2']").forEach(function(t4) {
              N(t4, e3), "wysiwyg" === e3.currentMode && t4.previousElementSibling.setAttribute("style", "display:none");
            }), ct(e3), he(e3);
          } else e3[e3.currentMode].element.focus();
        }, lt = function(e3, t3) {
          for (var n2 = getSelection().getRangeAt(0).startContainer.parentElement, r2 = e3.rows[0].cells.length, i2 = e3.rows.length, o2 = 0, a2 = 0; a2 < i2; a2++) for (var l2 = 0; l2 < r2; l2++) if (e3.rows[a2].cells[l2].isSameNode(n2)) {
            o2 = l2;
            break;
          }
          for (var s2 = 0; s2 < i2; s2++) e3.rows[s2].cells[o2].setAttribute("align", t3);
        }, st = function(e3) {
          var t3 = e3.trimRight().split("\n").pop();
          return "" !== t3 && (("" === t3.replace(/ |-/g, "") || "" === t3.replace(/ |_/g, "") || "" === t3.replace(/ |\*/g, "")) && (t3.replace(/ /g, "").length > 2 && (!(t3.indexOf("-") > -1 && -1 === t3.trimLeft().indexOf(" ") && e3.trimRight().split("\n").length > 1) && (0 !== t3.indexOf("    ") && 0 !== t3.indexOf("	")))));
        }, dt = function(e3) {
          var t3 = e3.trimRight().split("\n");
          return 0 !== (e3 = t3.pop()).indexOf("    ") && 0 !== e3.indexOf("	") && ("" !== (e3 = e3.trimLeft()) && 0 !== t3.length && ("" === e3.replace(/-/g, "") || "" === e3.replace(/=/g, "")));
        }, ct = function(e3, t3) {
          void 0 === t3 && (t3 = { enableAddUndoStack: true, enableHint: false, enableInput: true }), "wysiwyg" === e3.currentMode ? Q(e3, t3) : "ir" === e3.currentMode ? At(e3, t3) : "sv" === e3.currentMode && je(e3, t3);
        }, ut = function(e3, t3, n2, r2) {
          var o2, a2 = e3.startContainer, l2 = (0, y.lG)(a2, "LI");
          if (l2) {
            if (!(0, d.yl)(r2) && !r2.altKey && "Enter" === r2.key && !r2.shiftKey && n2 && l2.contains(n2) && n2.nextElementSibling) return l2 && !l2.textContent.endsWith("\n") && l2.insertAdjacentText("beforeend", "\n"), e3.insertNode(document.createTextNode("\n\n")), e3.collapse(false), ct(t3), r2.preventDefault(), true;
            if (!((0, d.yl)(r2) || r2.shiftKey || r2.altKey || "Backspace" !== r2.key || l2.previousElementSibling || "" !== e3.toString() || 0 !== (0, D.im)(l2, t3[t3.currentMode].element, e3).start)) return l2.nextElementSibling ? (l2.parentElement.insertAdjacentHTML("beforebegin", '<p data-block="0"><wbr>' + l2.innerHTML + "</p>"), l2.remove()) : l2.parentElement.outerHTML = '<p data-block="0"><wbr>' + l2.innerHTML + "</p>", (0, D.ib)(t3[t3.currentMode].element, e3), ct(t3), r2.preventDefault(), true;
            if (!(0, d.yl)(r2) && !r2.shiftKey && !r2.altKey && "Backspace" === r2.key && "" === l2.textContent.trim().replace(i.g.ZWSP, "") && "" === e3.toString() && "LI" === (null === (o2 = l2.previousElementSibling) || void 0 === o2 ? void 0 : o2.tagName)) return l2.previousElementSibling.insertAdjacentText("beforeend", "\n\n"), e3.selectNodeContents(l2.previousElementSibling), e3.collapse(false), l2.remove(), (0, D.ib)(t3[t3.currentMode].element, e3), ct(t3), r2.preventDefault(), true;
            if (!(0, d.yl)(r2) && !r2.altKey && "Tab" === r2.key) {
              var s2 = false;
              if ((0 === e3.startOffset && (3 === a2.nodeType && !a2.previousSibling || 3 !== a2.nodeType && "LI" === a2.nodeName) || l2.classList.contains("vditor-task") && 1 === e3.startOffset && 3 !== a2.previousSibling.nodeType && "INPUT" === a2.previousSibling.tagName) && (s2 = true), s2 || "" !== e3.toString()) return r2.shiftKey ? at(t3, l2, e3, l2.parentElement) : ot(t3, l2, e3), r2.preventDefault(), true;
            }
          }
          return false;
        }, pt = function(e3, t3, n2) {
          if (e3.options.tab && "Tab" === n2.key) return n2.shiftKey || ("" === t3.toString() ? (t3.insertNode(document.createTextNode(e3.options.tab)), t3.collapse(false)) : (t3.extractContents(), t3.insertNode(document.createTextNode(e3.options.tab)), t3.collapse(false))), (0, D.Hc)(t3), ct(e3), n2.preventDefault(), true;
        }, mt = function(e3, t3, n2, r2) {
          if (n2) {
            if (!(0, d.yl)(e3) && !e3.altKey && "Enter" === e3.key) {
              var i2 = String.raw(J || (J = Ke(["", ""], ["", ""])), n2.textContent).replace(/\\\|/g, "").trim(), o2 = i2.split("|");
              if (i2.startsWith("|") && i2.endsWith("|") && o2.length > 3) {
                var a2 = o2.map(function() {
                  return "---";
                }).join("|");
                return a2 = n2.textContent + "\n" + a2.substring(3, a2.length - 3) + "\n|<wbr>", n2.outerHTML = t3.lute.SpinVditorDOM(a2), (0, D.ib)(t3[t3.currentMode].element, r2), ct(t3), _e(t3), e3.preventDefault(), true;
              }
              if (st(n2.innerHTML) && n2.previousElementSibling) {
                var l2 = "", s2 = n2.innerHTML.trimRight().split("\n");
                return s2.length > 1 && (s2.pop(), l2 = '<p data-block="0">' + s2.join("\n") + "</p>"), n2.insertAdjacentHTML("afterend", l2 + '<hr data-block="0"><p data-block="0"><wbr>\n</p>'), n2.remove(), (0, D.ib)(t3[t3.currentMode].element, r2), ct(t3), _e(t3), e3.preventDefault(), true;
              }
              if (dt(n2.innerHTML)) return "wysiwyg" === t3.currentMode ? n2.outerHTML = t3.lute.SpinVditorDOM(n2.innerHTML + '<p data-block="0"><wbr>\n</p>') : n2.outerHTML = t3.lute.SpinVditorIRDOM(n2.innerHTML + '<p data-block="0"><wbr>\n</p>'), (0, D.ib)(t3[t3.currentMode].element, r2), ct(t3), _e(t3), e3.preventDefault(), true;
            }
            if (r2.collapsed && n2.previousElementSibling && "Backspace" === e3.key && !(0, d.yl)(e3) && !e3.altKey && !e3.shiftKey && n2.textContent.trimRight().split("\n").length > 1 && 0 === (0, D.im)(n2, t3[t3.currentMode].element, r2).start) {
              var c2 = (0, y.DX)(n2.previousElementSibling);
              return c2.textContent.endsWith("\n") || (c2.textContent = c2.textContent + "\n"), c2.parentElement.insertAdjacentHTML("beforeend", "<wbr>" + n2.innerHTML), n2.remove(), (0, D.ib)(t3[t3.currentMode].element, r2), false;
            }
            return false;
          }
        }, ft = function(e3, t3, n2) {
          for (var r2 = "", i2 = 0; i2 < n2.parentElement.childElementCount; i2++) r2 += '<td align="' + n2.parentElement.children[i2].getAttribute("align") + '"> </td>';
          "TH" === n2.tagName ? n2.parentElement.parentElement.insertAdjacentHTML("afterend", "<tbody><tr>" + r2 + "</tr></tbody>") : n2.parentElement.insertAdjacentHTML("afterend", "<tr>" + r2 + "</tr>"), ct(e3);
        }, ht = function(e3, t3, n2) {
          for (var r2 = "", i2 = 0; i2 < n2.parentElement.childElementCount; i2++) "TH" === n2.tagName ? r2 += '<th align="' + n2.parentElement.children[i2].getAttribute("align") + '"> </th>' : r2 += '<td align="' + n2.parentElement.children[i2].getAttribute("align") + '"> </td>';
          if ("TH" === n2.tagName) {
            n2.parentElement.parentElement.insertAdjacentHTML("beforebegin", "<thead><tr>" + r2 + "</tr></thead>"), t3.insertNode(document.createElement("wbr"));
            var o2 = n2.parentElement.innerHTML.replace(/<th>/g, "<td>").replace(/<\/th>/g, "</td>");
            n2.parentElement.parentElement.nextElementSibling.insertAdjacentHTML("afterbegin", o2), n2.parentElement.parentElement.remove(), (0, D.ib)(e3.ir.element, t3);
          } else n2.parentElement.insertAdjacentHTML("beforebegin", "<tr>" + r2 + "</tr>");
          ct(e3);
        }, vt = function(e3, t3, n2, r2) {
          void 0 === r2 && (r2 = "afterend");
          for (var i2 = 0, o2 = n2.previousElementSibling; o2; ) i2++, o2 = o2.previousElementSibling;
          for (var a2 = 0; a2 < t3.rows.length; a2++) 0 === a2 ? t3.rows[a2].cells[i2].insertAdjacentHTML(r2, "<th> </th>") : t3.rows[a2].cells[i2].insertAdjacentHTML(r2, "<td> </td>");
          ct(e3);
        }, gt = function(e3, t3, n2) {
          if ("TD" === n2.tagName) {
            var r2 = n2.parentElement.parentElement;
            n2.parentElement.previousElementSibling ? t3.selectNodeContents(n2.parentElement.previousElementSibling.lastElementChild) : t3.selectNodeContents(r2.previousElementSibling.lastElementChild.lastElementChild), 1 === r2.childElementCount ? r2.remove() : n2.parentElement.remove(), t3.collapse(false), (0, D.Hc)(t3), ct(e3);
          }
        }, yt = function(e3, t3, n2, r2) {
          for (var i2 = 0, o2 = r2.previousElementSibling; o2; ) i2++, o2 = o2.previousElementSibling;
          (r2.previousElementSibling || r2.nextElementSibling) && (t3.selectNodeContents(r2.previousElementSibling || r2.nextElementSibling), t3.collapse(true));
          for (var a2 = 0; a2 < n2.rows.length; a2++) {
            var l2 = n2.rows[a2].cells;
            if (1 === l2.length) {
              n2.remove(), he(e3);
              break;
            }
            l2[i2].remove();
          }
          (0, D.Hc)(t3), ct(e3);
        }, bt = function(e3, t3, n2) {
          var r2 = n2.startContainer, i2 = (0, y.lG)(r2, "TD") || (0, y.lG)(r2, "TH");
          if (i2) {
            if (!(0, d.yl)(t3) && !t3.altKey && "Enter" === t3.key) {
              i2.lastElementChild && (!i2.lastElementChild || i2.lastElementChild.isSameNode(i2.lastChild) && "BR" === i2.lastElementChild.tagName) || i2.insertAdjacentHTML("beforeend", "<br>");
              var o2 = document.createElement("br");
              return n2.insertNode(o2), n2.setStartAfter(o2), ct(e3), _e(e3), t3.preventDefault(), true;
            }
            if ("Tab" === t3.key) return t3.shiftKey ? (tt(i2, n2), t3.preventDefault(), true) : ((u2 = i2.nextElementSibling) || (u2 = i2.parentElement.nextElementSibling ? i2.parentElement.nextElementSibling.firstElementChild : "THEAD" === i2.parentElement.parentElement.tagName && i2.parentElement.parentElement.nextElementSibling ? i2.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild : null), u2 && (n2.selectNodeContents(u2), (0, D.Hc)(n2)), t3.preventDefault(), true);
            var a2 = i2.parentElement.parentElement.parentElement;
            if ("ArrowUp" === t3.key) {
              if (t3.preventDefault(), "TH" === i2.tagName) return a2.previousElementSibling ? (n2.selectNodeContents(a2.previousElementSibling), n2.collapse(false), (0, D.Hc)(n2)) : Qe(e3, "beforebegin"), true;
              for (var l2 = 0, s2 = i2.parentElement; l2 < s2.cells.length && !s2.cells[l2].isSameNode(i2); l2++) ;
              var c2 = s2.previousElementSibling;
              return c2 || (c2 = s2.parentElement.previousElementSibling.firstChild), n2.selectNodeContents(c2.cells[l2]), n2.collapse(false), (0, D.Hc)(n2), true;
            }
            if ("ArrowDown" === t3.key) {
              var u2;
              if (t3.preventDefault(), !(s2 = i2.parentElement).nextElementSibling && "TD" === i2.tagName) return a2.nextElementSibling ? (n2.selectNodeContents(a2.nextElementSibling), n2.collapse(true), (0, D.Hc)(n2)) : Qe(e3, "afterend"), true;
              for (l2 = 0; l2 < s2.cells.length && !s2.cells[l2].isSameNode(i2); l2++) ;
              return (u2 = s2.nextElementSibling) || (u2 = s2.parentElement.nextElementSibling.firstChild), n2.selectNodeContents(u2.cells[l2]), n2.collapse(true), (0, D.Hc)(n2), true;
            }
            if ("wysiwyg" === e3.currentMode && !(0, d.yl)(t3) && "Enter" === t3.key && !t3.shiftKey && t3.altKey) {
              var p2 = e3.wysiwyg.popover.querySelector(".vditor-input");
              return p2.focus(), p2.select(), t3.preventDefault(), true;
            }
            if (!(0, d.yl)(t3) && !t3.shiftKey && !t3.altKey && "Backspace" === t3.key && 0 === n2.startOffset && "" === n2.toString()) return !tt(i2, n2, false) && a2 && ("" === a2.textContent.trim() ? (a2.outerHTML = '<p data-block="0"><wbr>\n</p>', (0, D.ib)(e3[e3.currentMode].element, n2)) : (n2.setStartBefore(a2), n2.collapse(true)), ct(e3)), t3.preventDefault(), true;
            if (P("⇧⌘F", t3)) return ht(e3, n2, i2), t3.preventDefault(), true;
            if (P("⌘=", t3)) return ft(e3, n2, i2), t3.preventDefault(), true;
            if (P("⇧⌘G", t3)) return vt(e3, a2, i2, "beforebegin"), t3.preventDefault(), true;
            if (P("⇧⌘=", t3)) return vt(e3, a2, i2), t3.preventDefault(), true;
            if (P("⌘-", t3)) return gt(e3, n2, i2), t3.preventDefault(), true;
            if (P("⇧⌘-", t3)) return yt(e3, n2, a2, i2), t3.preventDefault(), true;
            if (P("⇧⌘L", t3)) {
              if ("ir" === e3.currentMode) return lt(a2, "left"), ct(e3), t3.preventDefault(), true;
              if (m2 = e3.wysiwyg.popover.querySelector('[data-type="left"]')) return m2.click(), t3.preventDefault(), true;
            }
            if (P("⇧⌘C", t3)) {
              if ("ir" === e3.currentMode) return lt(a2, "center"), ct(e3), t3.preventDefault(), true;
              if (m2 = e3.wysiwyg.popover.querySelector('[data-type="center"]')) return m2.click(), t3.preventDefault(), true;
            }
            if (P("⇧⌘R", t3)) {
              if ("ir" === e3.currentMode) return lt(a2, "right"), ct(e3), t3.preventDefault(), true;
              var m2;
              if (m2 = e3.wysiwyg.popover.querySelector('[data-type="right"]')) return m2.click(), t3.preventDefault(), true;
            }
          }
          return false;
        }, wt = function(e3, t3, n2, r2) {
          if ("PRE" === n2.tagName && P("⌘A", t3)) return r2.selectNodeContents(n2.firstElementChild), t3.preventDefault(), true;
          if (e3.options.tab && "Tab" === t3.key && !t3.shiftKey && "" === r2.toString()) return r2.insertNode(document.createTextNode(e3.options.tab)), r2.collapse(false), ct(e3), t3.preventDefault(), true;
          if ("Backspace" === t3.key && !(0, d.yl)(t3) && !t3.shiftKey && !t3.altKey) {
            var i2 = (0, D.im)(n2, e3[e3.currentMode].element, r2);
            if ((0 === i2.start || 1 === i2.start && "\n" === n2.innerText) && "" === r2.toString()) return n2.parentElement.outerHTML = '<p data-block="0"><wbr>' + n2.firstElementChild.innerHTML + "</p>", (0, D.ib)(e3[e3.currentMode].element, r2), ct(e3), t3.preventDefault(), true;
          }
          return !(0, d.yl)(t3) && !t3.altKey && "Enter" === t3.key && (n2.firstElementChild.textContent.endsWith("\n") || n2.firstElementChild.insertAdjacentText("beforeend", "\n"), r2.extractContents(), r2.insertNode(document.createTextNode("\n")), r2.collapse(false), (0, D.Hc)(r2), (0, d.vU)() || ("wysiwyg" === e3.currentMode ? ze(e3, r2) : R(e3, r2)), _e(e3), t3.preventDefault(), true);
        }, Et = function(e3, t3, n2, r2) {
          var o2 = t3.startContainer, a2 = (0, y.lG)(o2, "BLOCKQUOTE");
          if (a2 && "" === t3.toString()) {
            if ("Backspace" === n2.key && !(0, d.yl)(n2) && !n2.shiftKey && !n2.altKey && 0 === (0, D.im)(a2, e3[e3.currentMode].element, t3).start) return t3.insertNode(document.createElement("wbr")), a2.outerHTML = a2.innerHTML, (0, D.ib)(e3[e3.currentMode].element, t3), ct(e3), n2.preventDefault(), true;
            if (r2 && "Enter" === n2.key && !(0, d.yl)(n2) && !n2.shiftKey && !n2.altKey && "BLOCKQUOTE" === r2.parentElement.tagName) {
              var l2 = false;
              if ("\n" === r2.innerHTML.replace(i.g.ZWSP, "") || "" === r2.innerHTML.replace(i.g.ZWSP, "") ? (l2 = true, r2.remove()) : r2.innerHTML.endsWith("\n\n") && (0, D.im)(r2, e3[e3.currentMode].element, t3).start === r2.textContent.length - 1 && (r2.innerHTML = r2.innerHTML.substr(0, r2.innerHTML.length - 2), l2 = true), l2) return a2.insertAdjacentHTML("afterend", '<p data-block="0">' + i.g.ZWSP + "<wbr>\n</p>"), (0, D.ib)(e3[e3.currentMode].element, t3), ct(e3), n2.preventDefault(), true;
            }
            var s2 = (0, y.F9)(o2);
            if ("wysiwyg" === e3.currentMode && s2 && P("⇧⌘;", n2)) return t3.insertNode(document.createElement("wbr")), s2.outerHTML = '<blockquote data-block="0">' + s2.outerHTML + "</blockquote>", (0, D.ib)(e3.wysiwyg.element, t3), Q(e3), n2.preventDefault(), true;
            if (nt(e3, n2, t3, a2, a2)) return true;
            if (rt(e3, n2, t3, a2, a2)) return true;
          }
          return false;
        }, kt = function(e3, t3, n2) {
          var r2 = t3.startContainer, i2 = (0, y.fb)(r2, "vditor-task");
          if (i2) {
            if (P("⇧⌘J", n2)) {
              var o2 = i2.firstElementChild;
              return o2.checked ? o2.removeAttribute("checked") : o2.setAttribute("checked", "checked"), ct(e3), n2.preventDefault(), true;
            }
            if ("Backspace" === n2.key && !(0, d.yl)(n2) && !n2.shiftKey && !n2.altKey && "" === t3.toString() && 1 === t3.startOffset && (3 === r2.nodeType && r2.previousSibling && "INPUT" === r2.previousSibling.tagName || 3 !== r2.nodeType)) {
              var a2 = i2.previousElementSibling;
              if (i2.querySelector("input").remove(), a2) (0, y.DX)(a2).parentElement.insertAdjacentHTML("beforeend", "<wbr>" + i2.innerHTML.trim()), i2.remove();
              else i2.parentElement.insertAdjacentHTML("beforebegin", '<p data-block="0"><wbr>' + (i2.innerHTML.trim() || "\n") + "</p>"), i2.nextElementSibling ? i2.remove() : i2.parentElement.remove();
              return (0, D.ib)(e3[e3.currentMode].element, t3), ct(e3), n2.preventDefault(), true;
            }
            if ("Enter" === n2.key && !(0, d.yl)(n2) && !n2.shiftKey && !n2.altKey) {
              if ("" === i2.textContent.trim()) if ((0, y.fb)(i2.parentElement, "vditor-task")) {
                var l2 = (0, y.O9)(r2);
                l2 && at(e3, i2, t3, l2);
              } else if (i2.nextElementSibling) {
                var s2 = "", c2 = "", u2 = false;
                Array.from(i2.parentElement.children).forEach(function(e4) {
                  i2.isSameNode(e4) ? u2 = true : u2 ? s2 += e4.outerHTML : c2 += e4.outerHTML;
                });
                var p2 = i2.parentElement.tagName, m2 = "OL" === i2.parentElement.tagName ? "" : ' data-marker="' + i2.parentElement.getAttribute("data-marker") + '"', f2 = "";
                c2 && (f2 = "UL" === i2.parentElement.tagName ? "" : ' start="1"', c2 = "<" + p2 + ' data-tight="true"' + m2 + ' data-block="0">' + c2 + "</" + p2 + ">"), i2.parentElement.outerHTML = c2 + '<p data-block="0"><wbr>\n</p><' + p2 + '\n data-tight="true"' + m2 + ' data-block="0"' + f2 + ">" + s2 + "</" + p2 + ">";
              } else i2.parentElement.insertAdjacentHTML("afterend", '<p data-block="0"><wbr>\n</p>'), 1 === i2.parentElement.querySelectorAll("li").length ? i2.parentElement.remove() : i2.remove();
              else 3 !== r2.nodeType && 0 === t3.startOffset && "INPUT" === r2.firstChild.tagName ? t3.setStart(r2.childNodes[1], 1) : (t3.setEndAfter(i2.lastChild), i2.insertAdjacentHTML("afterend", '<li class="vditor-task" data-marker="' + i2.getAttribute("data-marker") + '"><input type="checkbox"> <wbr></li>'), document.querySelector("wbr").after(t3.extractContents()));
              return (0, D.ib)(e3[e3.currentMode].element, t3), ct(e3), _e(e3), n2.preventDefault(), true;
            }
          }
          return false;
        }, St = function(e3, t3, n2, r2) {
          if (3 !== t3.startContainer.nodeType) {
            var i2 = t3.startContainer.children[t3.startOffset];
            if (i2 && "HR" === i2.tagName) return t3.selectNodeContents(i2.previousElementSibling), t3.collapse(false), n2.preventDefault(), true;
          }
          if (r2) {
            var o2 = r2.previousElementSibling;
            if (o2 && 0 === (0, D.im)(r2, e3[e3.currentMode].element, t3).start && ((0, d.vU)() && "HR" === o2.tagName || "TABLE" === o2.tagName)) {
              if ("TABLE" === o2.tagName) {
                var a2 = o2.lastElementChild.lastElementChild.lastElementChild;
                a2.innerHTML = a2.innerHTML.trimLeft() + "<wbr>" + r2.textContent.trim(), r2.remove();
              } else o2.remove();
              return (0, D.ib)(e3[e3.currentMode].element, t3), ct(e3), n2.preventDefault(), true;
            }
          }
          return false;
        }, Lt = function(e3) {
          (0, d.vU)() && 3 !== e3.startContainer.nodeType && "HR" === e3.startContainer.tagName && e3.setStartBefore(e3.startContainer);
        }, Tt = function(e3, t3, n2) {
          var r2, i2;
          if (!(0, d.vU)()) return false;
          if ("ArrowUp" === e3.key && t3 && "TABLE" === (null === (r2 = t3.previousElementSibling) || void 0 === r2 ? void 0 : r2.tagName)) {
            var o2 = t3.previousElementSibling;
            return n2.selectNodeContents(o2.rows[o2.rows.length - 1].lastElementChild), n2.collapse(false), e3.preventDefault(), true;
          }
          return !("ArrowDown" !== e3.key || !t3 || "TABLE" !== (null === (i2 = t3.nextElementSibling) || void 0 === i2 ? void 0 : i2.tagName)) && (n2.selectNodeContents(t3.nextElementSibling.rows[0].cells[0]), n2.collapse(true), e3.preventDefault(), true);
        }, Mt = function(e3, t3, n2) {
          return Fe(void 0, void 0, void 0, function() {
            var r2, o2, a2, l2, s2, d2, c2, u2, p2, m2, f2, h2, v2, g2, b2, w2;
            return Ze(this, function(E2) {
              switch (E2.label) {
                case 0:
                  return "true" !== e3[e3.currentMode].element.getAttribute("contenteditable") ? [2] : (t3.stopPropagation(), t3.preventDefault(), "clipboardData" in t3 ? (r2 = t3.clipboardData.getData("text/html"), o2 = t3.clipboardData.getData("text/plain"), a2 = t3.clipboardData.files) : (r2 = t3.dataTransfer.getData("text/html"), o2 = t3.dataTransfer.getData("text/plain"), t3.dataTransfer.types.includes("Files") && (a2 = t3.dataTransfer.items)), l2 = {}, s2 = function(t4, n3) {
                    if (!n3) return ["", Lute.WalkContinue];
                    var r3 = t4.TokensStr();
                    if (34 === t4.__internal_object__.Parent.Type && r3 && -1 === r3.indexOf("file://") && e3.options.upload.linkToImgUrl) {
                      var i2 = new XMLHttpRequest();
                      i2.open("POST", e3.options.upload.linkToImgUrl), e3.options.upload.token && i2.setRequestHeader("X-Upload-Token", e3.options.upload.token), e3.options.upload.withCredentials && (i2.withCredentials = true), Be(e3, i2), i2.setRequestHeader("Content-Type", "application/json; charset=utf-8"), i2.onreadystatechange = function() {
                        if (i2.readyState === XMLHttpRequest.DONE) {
                          if (200 === i2.status) {
                            var t5 = i2.responseText;
                            e3.options.upload.linkToImgFormat && (t5 = e3.options.upload.linkToImgFormat(i2.responseText));
                            var n4 = JSON.parse(t5);
                            if (0 !== n4.code) return void e3.tip.show(n4.msg);
                            var r4 = n4.data.originalURL;
                            if ("sv" === e3.currentMode) e3.sv.element.querySelectorAll(".vditor-sv__marker--link").forEach(function(e4) {
                              e4.textContent === r4 && (e4.textContent = n4.data.url);
                            });
                            else {
                              var o3 = e3[e3.currentMode].element.querySelector('img[src="' + r4 + '"]');
                              o3.src = n4.data.url, "ir" === e3.currentMode && (o3.previousElementSibling.previousElementSibling.innerHTML = n4.data.url);
                            }
                            ct(e3);
                          } else e3.tip.show(i2.responseText);
                          e3.options.upload.linkToImgCallback && e3.options.upload.linkToImgCallback(i2.responseText);
                        }
                      }, i2.send(JSON.stringify({ url: r3 }));
                    }
                    return "ir" === e3.currentMode ? ['<span class="vditor-ir__marker vditor-ir__marker--link">' + Lute.EscapeHTMLStr(r3) + "</span>", Lute.WalkContinue] : "wysiwyg" === e3.currentMode ? ["", Lute.WalkContinue] : ['<span class="vditor-sv__marker--link">' + Lute.EscapeHTMLStr(r3) + "</span>", Lute.WalkContinue];
                  }, r2.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/gi, "").trim() !== '<a href="' + o2 + '">' + o2 + "</a>" && r2.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/gi, "").trim() !== '<!--StartFragment--><a href="' + o2 + '">' + o2 + "</a><!--EndFragment-->" || (r2 = ""), (d2 = new DOMParser().parseFromString(r2, "text/html")).body && (r2 = d2.body.innerHTML), r2 = Lute.Sanitize(r2), e3.wysiwyg.getComments(e3), c2 = e3[e3.currentMode].element.scrollHeight, u2 = function(e4, t4, n3) {
                    void 0 === n3 && (n3 = "sv");
                    var r3 = document.createElement("div");
                    r3.innerHTML = e4;
                    var i2 = false;
                    1 === r3.childElementCount && r3.lastElementChild.style.fontFamily.indexOf("monospace") > -1 && (i2 = true);
                    var o3 = r3.querySelectorAll("pre");
                    if (1 === r3.childElementCount && 1 === o3.length && "vditor-wysiwyg" !== o3[0].className && "vditor-sv" !== o3[0].className && (i2 = true), 0 === e4.indexOf('\n<p class="p1">') && (i2 = true), 1 === r3.childElementCount && "TABLE" === r3.firstElementChild.tagName && r3.querySelector(".line-number") && r3.querySelector(".line-content") && (i2 = true), i2) {
                      var a3 = t4 || e4;
                      return /\n/.test(a3) || 1 === o3.length ? "wysiwyg" === n3 ? '<div class="vditor-wysiwyg__block" data-block="0" data-type="code-block"><pre><code>' + a3.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "<wbr></code></pre></div>" : "\n```\n" + a3.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "\n```" : "wysiwyg" === n3 ? "<code>" + a3.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</code><wbr>" : "`" + a3 + "`";
                    }
                    return false;
                  }(r2, o2, e3.currentMode), (p2 = "sv" === e3.currentMode ? (0, y.a1)(t3.target, "data-type", "code-block") : (0, y.lG)(t3.target, "CODE")) ? ("sv" === e3.currentMode ? document.execCommand("insertHTML", false, o2.replace(/&/g, "&amp;").replace(/</g, "&lt;")) : (m2 = (0, D.im)(t3.target, e3[e3.currentMode].element), "PRE" !== p2.parentElement.tagName && (o2 += i.g.ZWSP), p2.textContent = p2.textContent.substring(0, m2.start) + o2 + p2.textContent.substring(m2.end), (0, D.$j)(m2.start + o2.length, m2.start + o2.length, p2.parentElement), (null === (w2 = p2.parentElement) || void 0 === w2 ? void 0 : w2.nextElementSibling.classList.contains("vditor-" + e3.currentMode + "__preview")) && (p2.parentElement.nextElementSibling.innerHTML = p2.outerHTML, N(p2.parentElement.nextElementSibling, e3))), [3, 8]) : [3, 1]);
                case 1:
                  return u2 ? (n2.pasteCode(u2), [3, 8]) : [3, 2];
                case 2:
                  return "" === r2.trim() ? [3, 3] : ((f2 = document.createElement("div")).innerHTML = r2, f2.querySelectorAll("[style]").forEach(function(e4) {
                    e4.removeAttribute("style");
                  }), f2.querySelectorAll(".vditor-copy").forEach(function(e4) {
                    e4.remove();
                  }), "ir" === e3.currentMode ? (l2.HTML2VditorIRDOM = { renderLinkDest: s2 }, e3.lute.SetJSRenderers({ renderers: l2 }), (0, D.oC)(e3.lute.HTML2VditorIRDOM(f2.innerHTML), e3)) : "wysiwyg" === e3.currentMode ? (l2.HTML2VditorDOM = { renderLinkDest: s2 }, e3.lute.SetJSRenderers({ renderers: l2 }), (0, D.oC)(e3.lute.HTML2VditorDOM(f2.innerHTML), e3)) : (l2.Md2VditorSVDOM = { renderLinkDest: s2 }, e3.lute.SetJSRenderers({ renderers: l2 }), Ne(e3, e3.lute.HTML2Md(f2.innerHTML).trimRight())), e3.outline.render(e3), [3, 8]);
                case 3:
                  return a2.length > 0 ? e3.options.upload.url || e3.options.upload.handler ? [4, Ge(e3, a2)] : [3, 5] : [3, 7];
                case 4:
                  return E2.sent(), [3, 6];
                case 5:
                  h2 = new FileReader(), "clipboardData" in t3 ? (a2 = t3.clipboardData.files, v2 = a2[0]) : t3.dataTransfer.types.includes("Files") && (a2 = t3.dataTransfer.items, v2 = a2[0].getAsFile()), v2 && v2.type.startsWith("image") && (h2.readAsDataURL(v2), h2.onload = function() {
                    var t4 = "";
                    "wysiwyg" === e3.currentMode ? t4 += '<img alt="' + v2.name + '" src="' + h2.result.toString() + '">\n' : t4 += "![" + v2.name + "](" + h2.result.toString() + ")\n", document.execCommand("insertHTML", false, t4);
                  }), E2.label = 6;
                case 6:
                  return [3, 8];
                case 7:
                  "" !== o2.trim() && 0 === a2.length && ("" !== (b2 = (0, D.zh)(e3)).toString() && e3.lute.IsValidLinkDest(o2) && (o2 = "[" + b2.toString() + "](" + o2 + ")"), "ir" === e3.currentMode ? (l2.Md2VditorIRDOM = { renderLinkDest: s2 }, e3.lute.SetJSRenderers({ renderers: l2 }), (0, D.oC)(e3.lute.Md2VditorIRDOM(o2), e3)) : "wysiwyg" === e3.currentMode ? (l2.Md2VditorDOM = { renderLinkDest: s2 }, e3.lute.SetJSRenderers({ renderers: l2 }), (0, D.oC)(e3.lute.Md2VditorDOM(o2), e3)) : (l2.Md2VditorSVDOM = { renderLinkDest: s2 }, e3.lute.SetJSRenderers({ renderers: l2 }), Ne(e3, o2)), e3.outline.render(e3)), E2.label = 8;
                case 8:
                  return "sv" !== e3.currentMode && ((g2 = (0, y.F9)((0, D.zh)(e3).startContainer)) && (b2 = (0, D.zh)(e3), e3[e3.currentMode].element.querySelectorAll("wbr").forEach(function(e4) {
                    e4.remove();
                  }), b2.insertNode(document.createElement("wbr")), "wysiwyg" === e3.currentMode ? g2.outerHTML = e3.lute.SpinVditorDOM(g2.outerHTML) : g2.outerHTML = e3.lute.SpinVditorIRDOM(g2.outerHTML), (0, D.ib)(e3[e3.currentMode].element, b2)), e3[e3.currentMode].element.querySelectorAll(".vditor-" + e3.currentMode + "__preview[data-render='2']").forEach(function(t4) {
                    N(t4, e3);
                  })), e3.wysiwyg.triggerRemoveComment(e3), ct(e3), e3[e3.currentMode].element.scrollHeight - c2 > Math.min(e3[e3.currentMode].element.clientHeight, window.innerHeight) / 2 && _e(e3), [2];
              }
            });
          });
        }, Ct = function(e3) {
          e3.hint.render(e3);
          var t3 = (0, D.zh)(e3).startContainer, n2 = (0, y.a1)(t3, "data-type", "code-block-info");
          if (n2) if ("" === n2.textContent.replace(i.g.ZWSP, "") && e3.hint.recentLanguage) {
            n2.textContent = i.g.ZWSP + e3.hint.recentLanguage, (0, D.zh)(e3).selectNodeContents(n2);
          } else {
            var r2 = [], o2 = n2.textContent.substring(0, (0, D.im)(n2, e3.ir.element).start).replace(i.g.ZWSP, "");
            (e3.options.preview.hljs.langs || i.g.CODE_LANGUAGES).forEach(function(e4) {
              e4.indexOf(o2.toLowerCase()) > -1 && r2.push({ html: e4, value: e4 });
            }), e3.hint.genHTML(r2, o2, e3);
          }
        }, At = function(e3, t3) {
          void 0 === t3 && (t3 = { enableAddUndoStack: true, enableHint: false, enableInput: true }), t3.enableHint && Ct(e3), clearTimeout(e3.ir.processTimeoutId), e3.ir.processTimeoutId = window.setTimeout(function() {
            if (!e3.ir.composingLock) {
              var n2 = a(e3);
              "function" == typeof e3.options.input && t3.enableInput && e3.options.input(n2), e3.options.counter.enable && e3.counter.render(e3, n2), e3.options.cache.enable && (0, d.pK)() && (localStorage.setItem(e3.options.cache.id, n2), e3.options.cache.after && e3.options.cache.after(n2)), e3.devtools && e3.devtools.renderEchart(e3), t3.enableAddUndoStack && e3.undo.addToUndoStack(e3);
            }
          }, e3.options.undoDelay);
        }, _t = function(e3, t3) {
          var n2 = (0, D.zh)(e3), r2 = (0, y.F9)(n2.startContainer) || n2.startContainer;
          if (r2) {
            var i2 = r2.querySelector(".vditor-ir__marker--heading");
            i2 ? i2.innerHTML = t3 : (r2.insertAdjacentText("afterbegin", t3), n2.selectNodeContents(r2), n2.collapse(false)), R(e3, n2.cloneRange()), Y(e3);
          }
        }, xt = function(e3, t3, n2) {
          var r2 = (0, y.a1)(e3.startContainer, "data-type", n2);
          if (r2) {
            r2.firstElementChild.remove(), r2.lastElementChild.remove(), e3.insertNode(document.createElement("wbr"));
            var i2 = document.createElement("div");
            i2.innerHTML = t3.lute.SpinVditorIRDOM(r2.outerHTML), r2.outerHTML = i2.firstElementChild.innerHTML.trim();
          }
        }, Ht = function(e3, t3, n2, r2) {
          var i2 = (0, D.zh)(e3), o2 = t3.getAttribute("data-type"), a2 = i2.startContainer;
          3 === a2.nodeType && (a2 = a2.parentElement);
          var l2 = true;
          if (t3.classList.contains("vditor-menu--current")) if ("quote" === o2) {
            var s2 = (0, y.lG)(a2, "BLOCKQUOTE");
            s2 && (i2.insertNode(document.createElement("wbr")), s2.outerHTML = "" === s2.innerHTML.trim() ? '<p data-block="0">' + s2.innerHTML + "</p>" : s2.innerHTML);
          } else if ("link" === o2) {
            var d2 = (0, y.a1)(i2.startContainer, "data-type", "a");
            if (d2) {
              var u2 = (0, y.fb)(i2.startContainer, "vditor-ir__link");
              u2 ? (i2.insertNode(document.createElement("wbr")), d2.outerHTML = u2.innerHTML) : d2.outerHTML = d2.querySelector(".vditor-ir__link").innerHTML + "<wbr>";
            }
          } else "italic" === o2 ? xt(i2, e3, "em") : "bold" === o2 ? xt(i2, e3, "strong") : "strike" === o2 ? xt(i2, e3, "s") : "inline-code" === o2 ? xt(i2, e3, "code") : "check" !== o2 && "list" !== o2 && "ordered-list" !== o2 || (it(e3, i2, o2), l2 = false, t3.classList.remove("vditor-menu--current"));
          else {
            0 === e3.ir.element.childNodes.length && (e3.ir.element.innerHTML = '<p data-block="0"><wbr></p>', (0, D.ib)(e3.ir.element, i2));
            var p2 = (0, y.F9)(i2.startContainer);
            if ("line" === o2) {
              if (p2) {
                var m2 = '<hr data-block="0"><p data-block="0"><wbr>\n</p>';
                "" === p2.innerHTML.trim() ? p2.outerHTML = m2 : p2.insertAdjacentHTML("afterend", m2);
              }
            } else if ("quote" === o2) p2 && (i2.insertNode(document.createElement("wbr")), p2.outerHTML = '<blockquote data-block="0">' + p2.outerHTML + "</blockquote>", l2 = false, t3.classList.add("vditor-menu--current"));
            else if ("link" === o2) {
              var f2 = void 0;
              f2 = "" === i2.toString() ? n2 + "<wbr>" + r2 : "" + n2 + i2.toString() + r2.replace(")", "<wbr>)"), document.execCommand("insertHTML", false, f2), l2 = false, t3.classList.add("vditor-menu--current");
            } else if ("italic" === o2 || "bold" === o2 || "strike" === o2 || "inline-code" === o2 || "code" === o2 || "table" === o2) {
              f2 = void 0;
              "" === i2.toString() ? f2 = n2 + "<wbr>" + r2 : (f2 = "code" === o2 ? n2 + "\n" + i2.toString() + "<wbr>" + r2 : "table" === o2 ? "" + n2 + i2.toString() + "<wbr>" + r2 : "" + n2 + i2.toString() + r2 + "<wbr>", i2.deleteContents()), "table" !== o2 && "code" !== o2 || (f2 = "\n" + f2 + "\n\n");
              var h2 = document.createElement("span");
              h2.innerHTML = f2, i2.insertNode(h2), R(e3, i2), "table" === o2 && (i2.selectNodeContents(getSelection().getRangeAt(0).startContainer.parentElement), (0, D.Hc)(i2));
            } else "check" !== o2 && "list" !== o2 && "ordered-list" !== o2 || (it(e3, i2, o2, false), l2 = false, c(e3.toolbar.elements, ["check", "list", "ordered-list"]), t3.classList.add("vditor-menu--current"));
          }
          (0, D.ib)(e3.ir.element, i2), At(e3), l2 && Y(e3);
        }, Nt = function(e3, t3, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function a2(e4) {
              try {
                s2(r2.next(e4));
              } catch (e5) {
                o2(e5);
              }
            }
            function l2(e4) {
              try {
                s2(r2.throw(e4));
              } catch (e5) {
                o2(e5);
              }
            }
            function s2(e4) {
              var t4;
              e4.done ? i2(e4.value) : (t4 = e4.value, t4 instanceof n2 ? t4 : new n2(function(e5) {
                e5(t4);
              })).then(a2, l2);
            }
            s2((r2 = r2.apply(e3, t3 || [])).next());
          });
        }, Dt = function(e3, t3) {
          var n2, r2, i2, o2, a2 = { label: 0, sent: function() {
            if (1 & i2[0]) throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: l2(0), throw: l2(1), return: l2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function l2(o3) {
            return function(l3) {
              return function(o4) {
                if (n2) throw new TypeError("Generator is already executing.");
                for (; a2; ) try {
                  if (n2 = 1, r2 && (i2 = 2 & o4[0] ? r2.return : o4[0] ? r2.throw || ((i2 = r2.return) && i2.call(r2), 0) : r2.next) && !(i2 = i2.call(r2, o4[1])).done) return i2;
                  switch (r2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                    case 0:
                    case 1:
                      i2 = o4;
                      break;
                    case 4:
                      return a2.label++, { value: o4[1], done: false };
                    case 5:
                      a2.label++, r2 = o4[1], o4 = [0];
                      continue;
                    case 7:
                      o4 = a2.ops.pop(), a2.trys.pop();
                      continue;
                    default:
                      if (!(i2 = a2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                        a2 = 0;
                        continue;
                      }
                      if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                        a2.label = o4[1];
                        break;
                      }
                      if (6 === o4[0] && a2.label < i2[1]) {
                        a2.label = i2[1], i2 = o4;
                        break;
                      }
                      if (i2 && a2.label < i2[2]) {
                        a2.label = i2[2], a2.ops.push(o4);
                        break;
                      }
                      i2[2] && a2.ops.pop(), a2.trys.pop();
                      continue;
                  }
                  o4 = t3.call(e3, a2);
                } catch (e4) {
                  o4 = [6, e4], r2 = 0;
                } finally {
                  n2 = i2 = 0;
                }
                if (5 & o4[0]) throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, l3]);
            };
          }
        }, Ot = function() {
          function e3(e4) {
            var t3 = this;
            this.splitChar = "", this.lastIndex = -1, this.fillEmoji = function(e5, n2) {
              t3.element.style.display = "none";
              var r2 = decodeURIComponent(e5.getAttribute("data-value")), o2 = window.getSelection().getRangeAt(0);
              if ("ir" === n2.currentMode) {
                var a2 = (0, y.a1)(o2.startContainer, "data-type", "code-block-info");
                if (a2) return a2.textContent = i.g.ZWSP + r2.trimRight(), o2.selectNodeContents(a2), o2.collapse(false), At(n2), a2.parentElement.querySelectorAll("code").forEach(function(e6) {
                  e6.className = "language-" + r2.trimRight();
                }), N(a2.parentElement.querySelector(".vditor-ir__preview"), n2), void (t3.recentLanguage = r2.trimRight());
              }
              if ("wysiwyg" === n2.currentMode && 3 !== o2.startContainer.nodeType) {
                var l2 = o2.startContainer, s2 = void 0;
                if ((s2 = l2.classList.contains("vditor-input") ? l2 : l2.firstElementChild) && s2.classList.contains("vditor-input")) return s2.value = r2.trimRight(), o2.selectNodeContents(s2), o2.collapse(false), s2.dispatchEvent(new CustomEvent("input", { detail: 1 })), void (t3.recentLanguage = r2.trimRight());
              }
              if (o2.setStart(o2.startContainer, t3.lastIndex), o2.deleteContents(), n2.options.hint.parse ? "sv" === n2.currentMode ? (0, D.oC)(n2.lute.SpinVditorSVDOM(r2), n2) : "wysiwyg" === n2.currentMode ? (0, D.oC)(n2.lute.SpinVditorDOM(r2), n2) : (0, D.oC)(n2.lute.SpinVditorIRDOM(r2), n2) : (0, D.oC)(r2, n2), ":" === t3.splitChar && r2.indexOf(":") > -1 && "sv" !== n2.currentMode && o2.insertNode(document.createTextNode(" ")), o2.collapse(false), (0, D.Hc)(o2), "wysiwyg" === n2.currentMode) (d2 = (0, y.fb)(o2.startContainer, "vditor-wysiwyg__block")) && d2.lastElementChild.classList.contains("vditor-wysiwyg__preview") && (d2.lastElementChild.innerHTML = d2.firstElementChild.innerHTML, N(d2.lastElementChild, n2));
              else if ("ir" === n2.currentMode) {
                var d2;
                (d2 = (0, y.fb)(o2.startContainer, "vditor-ir__marker--pre")) && d2.nextElementSibling.classList.contains("vditor-ir__preview") && (d2.nextElementSibling.innerHTML = d2.innerHTML, N(d2.nextElementSibling, n2));
              }
              ct(n2);
            }, this.timeId = -1, this.element = document.createElement("div"), this.element.className = "vditor-hint", this.recentLanguage = "", e4.push({ key: ":" });
          }
          return e3.prototype.render = function(e4) {
            var t3 = this;
            if (window.getSelection().focusNode) {
              var n2, r2 = getSelection().getRangeAt(0);
              n2 = r2.startContainer.textContent.substring(0, r2.startOffset) || "";
              var i2 = this.getKey(n2, e4.options.hint.extend);
              if (void 0 === i2) this.element.style.display = "none", clearTimeout(this.timeId);
              else if (":" === this.splitChar) {
                var o2 = "" === i2 ? e4.options.hint.emoji : e4.lute.GetEmojis(), a2 = [];
                Object.keys(o2).forEach(function(e5) {
                  0 === e5.indexOf(i2.toLowerCase()) && (o2[e5].indexOf(".") > -1 ? a2.push({ html: '<img src="' + o2[e5] + '" title=":' + e5 + ':"/> :' + e5 + ":", value: ":" + e5 + ":" }) : a2.push({ html: '<span class="vditor-hint__emoji">' + o2[e5] + "</span>" + e5, value: o2[e5] }));
                }), this.genHTML(a2, i2, e4);
              } else e4.options.hint.extend.forEach(function(n3) {
                n3.key === t3.splitChar && (clearTimeout(t3.timeId), t3.timeId = window.setTimeout(function() {
                  return Nt(t3, void 0, void 0, function() {
                    var t4;
                    return Dt(this, function(r3) {
                      switch (r3.label) {
                        case 0:
                          return t4 = this.genHTML, [4, n3.hint(i2)];
                        case 1:
                          return t4.apply(this, [r3.sent(), i2, e4]), [2];
                      }
                    });
                  });
                }, e4.options.hint.delay));
              });
            }
          }, e3.prototype.genHTML = function(e4, t3, n2) {
            var r2 = this;
            if (0 !== e4.length) {
              var i2 = n2[n2.currentMode].element, o2 = (0, D.Ny)(i2), a2 = o2.left + ("left" === n2.options.outline.position ? n2.outline.element.offsetWidth : 0), l2 = o2.top, s2 = "";
              e4.forEach(function(e5, n3) {
                if (!(n3 > 7)) {
                  var r3 = e5.html;
                  if ("" !== t3) {
                    var i3 = r3.lastIndexOf(">") + 1, o3 = r3.substr(i3), a3 = o3.toLowerCase().indexOf(t3.toLowerCase());
                    a3 > -1 && (o3 = o3.substring(0, a3) + "<b>" + o3.substring(a3, a3 + t3.length) + "</b>" + o3.substring(a3 + t3.length), r3 = r3.substr(0, i3) + o3);
                  }
                  s2 += '<button type="button" data-value="' + encodeURIComponent(e5.value) + ' "\n' + (0 === n3 ? "class='vditor-hint--current'" : "") + "> " + r3 + "</button>";
                }
              }), this.element.innerHTML = s2;
              var d2 = parseInt(document.defaultView.getComputedStyle(i2, null).getPropertyValue("line-height"), 10);
              this.element.style.top = l2 + (d2 || 22) + "px", this.element.style.left = a2 + "px", this.element.style.display = "block", this.element.style.right = "auto", this.element.querySelectorAll("button").forEach(function(e5) {
                e5.addEventListener("click", function(t4) {
                  r2.fillEmoji(e5, n2), t4.preventDefault();
                });
              }), this.element.getBoundingClientRect().bottom > window.innerHeight && (this.element.style.top = l2 - this.element.offsetHeight + "px"), this.element.getBoundingClientRect().right > window.innerWidth && (this.element.style.left = "auto", this.element.style.right = "0");
            } else this.element.style.display = "none";
          }, e3.prototype.select = function(e4, t3) {
            if (0 === this.element.querySelectorAll("button").length || "none" === this.element.style.display) return false;
            var n2 = this.element.querySelector(".vditor-hint--current");
            if ("ArrowDown" === e4.key) return e4.preventDefault(), e4.stopPropagation(), n2.removeAttribute("class"), n2.nextElementSibling ? n2.nextElementSibling.className = "vditor-hint--current" : this.element.children[0].className = "vditor-hint--current", true;
            if ("ArrowUp" === e4.key) {
              if (e4.preventDefault(), e4.stopPropagation(), n2.removeAttribute("class"), n2.previousElementSibling) n2.previousElementSibling.className = "vditor-hint--current";
              else {
                var r2 = this.element.children.length;
                this.element.children[r2 - 1].className = "vditor-hint--current";
              }
              return true;
            }
            return !((0, d.yl)(e4) || e4.shiftKey || e4.altKey || "Enter" !== e4.key || e4.isComposing) && (e4.preventDefault(), e4.stopPropagation(), this.fillEmoji(n2, t3), true);
          }, e3.prototype.getKey = function(e4, t3) {
            var n2, r2 = this;
            if (this.lastIndex = -1, this.splitChar = "", t3.forEach(function(t4) {
              var n3 = e4.lastIndexOf(t4.key);
              r2.lastIndex < n3 && (r2.splitChar = t4.key, r2.lastIndex = n3);
            }), -1 === this.lastIndex) return n2;
            var i2 = e4.split(this.splitChar), a2 = i2[i2.length - 1];
            if (i2.length > 1 && a2.trim() === a2) if (2 === i2.length && "" === i2[0] && i2[1].length < 32) n2 = i2[1];
            else {
              var l2 = i2[i2.length - 2].slice(-1);
              " " === (0, o.X)(l2) && a2.length < 32 && (n2 = a2);
            }
            return n2;
          }, e3;
        }(), It = function() {
          function e3(e4) {
            this.composingLock = false;
            var t3 = document.createElement("div");
            t3.className = "vditor-ir", t3.innerHTML = '<pre class="vditor-reset" placeholder="' + e4.options.placeholder + '"\n contenteditable="true" spellcheck="false"></pre>', this.element = t3.firstElementChild, this.bindEvent(e4), Se(e4, this.element), Le(e4, this.element), Te(e4, this.element), xe(e4, this.element), He(e4, this.element), Me(e4, this.element), Ce(e4, this.element, this.copy), Ae(e4, this.element, this.copy);
          }
          return e3.prototype.copy = function(e4, t3) {
            var n2 = getSelection().getRangeAt(0);
            if ("" !== n2.toString()) {
              e4.stopPropagation(), e4.preventDefault();
              var r2 = document.createElement("div");
              r2.appendChild(n2.cloneContents()), e4.clipboardData.setData("text/plain", t3.lute.VditorIRDOM2Md(r2.innerHTML).trim()), e4.clipboardData.setData("text/html", "");
            }
          }, e3.prototype.bindEvent = function(e4) {
            var t3 = this;
            this.element.addEventListener("paste", function(t4) {
              Mt(e4, t4, { pasteCode: function(e5) {
                document.execCommand("insertHTML", false, e5);
              } });
            }), this.element.addEventListener("scroll", function() {
              v(e4, ["hint"]);
            }), this.element.addEventListener("compositionstart", function(e5) {
              t3.composingLock = true;
            }), this.element.addEventListener("compositionend", function(n2) {
              (0, d.vU)() || R(e4, getSelection().getRangeAt(0).cloneRange()), t3.composingLock = false;
            }), this.element.addEventListener("input", function(n2) {
              if ("deleteByDrag" !== n2.inputType && "insertFromDrop" !== n2.inputType) return t3.preventInput ? (t3.preventInput = false, void At(e4, { enableAddUndoStack: true, enableHint: true, enableInput: true })) : void (t3.composingLock || "‘" === n2.data || "“" === n2.data || "《" === n2.data || R(e4, getSelection().getRangeAt(0).cloneRange(), false, n2));
            }), this.element.addEventListener("click", function(n2) {
              if ("INPUT" === n2.target.tagName) return n2.target.checked ? n2.target.setAttribute("checked", "checked") : n2.target.removeAttribute("checked"), t3.preventInput = true, void At(e4);
              var r2 = (0, D.zh)(e4), o2 = (0, y.fb)(n2.target, "vditor-ir__preview");
              if (o2 || (o2 = (0, y.fb)(r2.startContainer, "vditor-ir__preview")), o2 && (o2.previousElementSibling.firstElementChild ? r2.selectNodeContents(o2.previousElementSibling.firstElementChild) : r2.selectNodeContents(o2.previousElementSibling), r2.collapse(true), (0, D.Hc)(r2), _e(e4)), "IMG" === n2.target.tagName) {
                var a2 = n2.target.parentElement.querySelector(".vditor-ir__marker--link");
                a2 && (r2.selectNode(a2), (0, D.Hc)(r2));
              }
              var l2 = (0, y.a1)(n2.target, "data-type", "a");
              if (!l2 || l2.classList.contains("vditor-ir__node--expand")) {
                if (n2.target.isEqualNode(t3.element) && t3.element.lastElementChild && r2.collapsed) {
                  var s2 = t3.element.lastElementChild.getBoundingClientRect();
                  n2.y > s2.top + s2.height && ("P" === t3.element.lastElementChild.tagName && "" === t3.element.lastElementChild.textContent.trim().replace(i.g.ZWSP, "") ? (r2.selectNodeContents(t3.element.lastElementChild), r2.collapse(false)) : (t3.element.insertAdjacentHTML("beforeend", '<p data-block="0">' + i.g.ZWSP + "<wbr></p>"), (0, D.ib)(t3.element, r2)));
                }
                "" === r2.toString() ? q(r2, e4) : setTimeout(function() {
                  q((0, D.zh)(e4), e4);
                }), I(n2, e4), Y(e4);
              } else e4.options.link.click ? e4.options.link.click(l2.querySelector(":scope > .vditor-ir__marker--link")) : e4.options.link.isOpen && window.open(l2.querySelector(":scope > .vditor-ir__marker--link").textContent);
            }), this.element.addEventListener("keyup", function(n2) {
              if (!n2.isComposing && !(0, d.yl)(n2)) if ("Enter" === n2.key && _e(e4), Y(e4), "Backspace" !== n2.key && "Delete" !== n2.key || "" === e4.ir.element.innerHTML || 1 !== e4.ir.element.childNodes.length || !e4.ir.element.firstElementChild || "P" !== e4.ir.element.firstElementChild.tagName || 0 !== e4.ir.element.firstElementChild.childElementCount || "" !== e4.ir.element.textContent && "\n" !== e4.ir.element.textContent) {
                var r2 = (0, D.zh)(e4);
                "Backspace" === n2.key ? ((0, d.vU)() && "\n" === r2.startContainer.textContent && 1 === r2.startOffset && (r2.startContainer.textContent = "", q(r2, e4)), t3.element.querySelectorAll(".language-math").forEach(function(e5) {
                  var t4 = e5.querySelector("br");
                  t4 && t4.remove();
                })) : n2.key.indexOf("Arrow") > -1 ? ("ArrowLeft" !== n2.key && "ArrowRight" !== n2.key || Ct(e4), q(r2, e4)) : 229 === n2.keyCode && "" === n2.code && "Unidentified" === n2.key && q(r2, e4);
                var o2 = (0, y.fb)(r2.startContainer, "vditor-ir__preview");
                if (o2) {
                  if ("ArrowUp" === n2.key || "ArrowLeft" === n2.key) return o2.previousElementSibling.firstElementChild ? r2.selectNodeContents(o2.previousElementSibling.firstElementChild) : r2.selectNodeContents(o2.previousElementSibling), r2.collapse(false), n2.preventDefault(), true;
                  if ("SPAN" === o2.tagName && ("ArrowDown" === n2.key || "ArrowRight" === n2.key)) return "html-entity" === o2.parentElement.getAttribute("data-type") ? (o2.parentElement.insertAdjacentText("afterend", i.g.ZWSP), r2.setStart(o2.parentElement.nextSibling, 1)) : r2.selectNodeContents(o2.parentElement.lastElementChild), r2.collapse(false), n2.preventDefault(), true;
                }
              } else e4.ir.element.innerHTML = "";
            });
          }, e3;
        }(), jt = function(e3) {
          return "sv" === e3.currentMode ? e3.lute.Md2HTML(a(e3)) : "wysiwyg" === e3.currentMode ? e3.lute.VditorDOM2HTML(e3.wysiwyg.element.innerHTML) : "ir" === e3.currentMode ? e3.lute.VditorIRDOM2HTML(e3.ir.element.innerHTML) : void 0;
        }, Rt = n(895), Pt = n(818), qt = function() {
          function e3(e4) {
            this.element = document.createElement("div"), this.element.className = "vditor-outline", this.element.innerHTML = '<div class="vditor-outline__title">' + e4 + '</div>\n<div class="vditor-outline__content"></div>';
          }
          return e3.prototype.render = function(e4) {
            return "block" === e4.preview.element.style.display ? (0, Pt.k)(e4.preview.previewElement, this.element.lastElementChild, e4) : (0, Pt.k)(e4[e4.currentMode].element, this.element.lastElementChild, e4);
          }, e3.prototype.toggle = function(e4, t3, n2) {
            var r2;
            void 0 === t3 && (t3 = true), void 0 === n2 && (n2 = true);
            var o2 = null === (r2 = e4.toolbar.elements.outline) || void 0 === r2 ? void 0 : r2.firstElementChild;
            if (t3 && window.innerWidth >= i.g.MOBILE_WIDTH ? (this.element.style.display = "block", this.render(e4), null == o2 || o2.classList.add("vditor-menu--current")) : (this.element.style.display = "none", null == o2 || o2.classList.remove("vditor-menu--current")), n2 && getSelection().rangeCount > 0) {
              var a2 = getSelection().getRangeAt(0);
              e4[e4.currentMode].element.contains(a2.startContainer) && (0, D.Hc)(a2);
            }
            z(e4);
          }, e3;
        }(), Bt = n(554), Vt = function() {
          function e3(e4) {
            var t3 = this;
            this.element = document.createElement("div"), this.element.className = "vditor-preview", this.previewElement = document.createElement("div"), this.previewElement.className = "vditor-reset", e4.options.classes.preview && this.previewElement.classList.add(e4.options.classes.preview), this.previewElement.style.maxWidth = e4.options.preview.maxWidth + "px", this.previewElement.addEventListener("copy", function(n3) {
              if ("TEXTAREA" !== n3.target.tagName) {
                var r3 = document.createElement("div");
                r3.className = "vditor-reset", r3.appendChild(getSelection().getRangeAt(0).cloneContents()), t3.copyToX(e4, r3, "default"), n3.preventDefault();
              }
            }), this.previewElement.addEventListener("click", function(n3) {
              var r3 = (0, y.lG)(n3.target, "SPAN");
              if (r3 && (0, y.fb)(r3, "vditor-toc")) {
                var i3 = t3.previewElement.querySelector("#" + r3.getAttribute("data-target-id"));
                i3 && (t3.element.scrollTop = i3.offsetTop);
              } else {
                if ("A" === n3.target.tagName) return e4.options.link.click ? e4.options.link.click(n3.target) : e4.options.link.isOpen && window.open(n3.target.getAttribute("href")), void n3.preventDefault();
                "IMG" === n3.target.tagName && (e4.options.image.preview ? e4.options.image.preview(n3.target) : e4.options.image.isPreview && (0, B.E)(n3.target, e4.options.lang, e4.options.theme));
              }
            }), this.element.appendChild(this.previewElement);
            var n2 = e4.options.preview.actions;
            if (0 !== n2.length) {
              var r2 = document.createElement("div");
              r2.className = "vditor-preview__action";
              for (var i2 = [], o2 = 0; o2 < n2.length; o2++) {
                var a2 = n2[o2];
                if ("object" != typeof a2) switch (a2) {
                  case "desktop":
                    i2.push('<button type="button" class="vditor-preview__action--current" data-type="desktop">Desktop</button>');
                    break;
                  case "tablet":
                    i2.push('<button type="button" data-type="tablet">Tablet</button>');
                    break;
                  case "mobile":
                    i2.push('<button type="button" data-type="mobile">Mobile/Wechat</button>');
                    break;
                  case "mp-wechat":
                    i2.push('<button type="button" data-type="mp-wechat" class="vditor-tooltipped vditor-tooltipped__w" aria-label="复制到公众号"><svg><use xlink:href="#vditor-icon-mp-wechat"></use></svg></button>');
                    break;
                  case "zhihu":
                    i2.push('<button type="button" data-type="zhihu" class="vditor-tooltipped vditor-tooltipped__w" aria-label="复制到知乎"><svg><use xlink:href="#vditor-icon-zhihu"></use></svg></button>');
                }
                else i2.push('<button type="button" data-type="' + a2.key + '" class="' + a2.className + '"' + (a2.tooltip ? ' aria-label="' + a2.tooltip + '"' : "") + '">' + a2.text + "</button>");
              }
              r2.innerHTML = i2.join(""), r2.addEventListener((0, d.Le)(), function(i3) {
                var o3 = (0, b.S)(i3.target, "BUTTON");
                if (o3) {
                  var a3 = o3.getAttribute("data-type"), l2 = n2.find(function(e5) {
                    return (null == e5 ? void 0 : e5.key) === a3;
                  });
                  l2 ? l2.click(a3) : "mp-wechat" !== a3 && "zhihu" !== a3 ? (t3.previewElement.style.width = "desktop" === a3 ? "auto" : "tablet" === a3 ? "780px" : "360px", t3.previewElement.scrollWidth > t3.previewElement.parentElement.clientWidth && (t3.previewElement.style.width = "auto"), t3.render(e4), r2.querySelectorAll("button").forEach(function(e5) {
                    e5.classList.remove("vditor-preview__action--current");
                  }), o3.classList.add("vditor-preview__action--current")) : t3.copyToX(e4, t3.previewElement.cloneNode(true), a3);
                }
              }), this.element.insertBefore(r2, this.previewElement);
            }
          }
          return e3.prototype.render = function(e4, t3) {
            var n2 = this;
            if (clearTimeout(this.mdTimeoutId), "none" !== this.element.style.display) if (t3) this.previewElement.innerHTML = t3;
            else if ("" !== a(e4).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")) {
              var r2 = (/* @__PURE__ */ new Date()).getTime(), i2 = a(e4);
              this.mdTimeoutId = window.setTimeout(function() {
                if (e4.options.preview.url) {
                  var t4 = new XMLHttpRequest();
                  t4.open("POST", e4.options.preview.url), t4.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), t4.onreadystatechange = function() {
                    if (t4.readyState === XMLHttpRequest.DONE) if (200 === t4.status) {
                      var o3 = JSON.parse(t4.responseText);
                      if (0 !== o3.code) return void e4.tip.show(o3.msg);
                      e4.options.preview.transform && (o3.data = e4.options.preview.transform(o3.data)), n2.previewElement.innerHTML = o3.data, n2.afterRender(e4, r2);
                    } else {
                      var a2 = e4.lute.Md2HTML(i2);
                      e4.options.preview.transform && (a2 = e4.options.preview.transform(a2)), n2.previewElement.innerHTML = a2, n2.afterRender(e4, r2);
                    }
                  }, t4.send(JSON.stringify({ markdownText: i2 }));
                } else {
                  var o2 = e4.lute.Md2HTML(i2);
                  e4.options.preview.transform && (o2 = e4.options.preview.transform(o2)), n2.previewElement.innerHTML = o2, n2.afterRender(e4, r2);
                }
              }, e4.options.preview.delay);
            } else this.previewElement.innerHTML = "";
            else "renderPerformance" === this.element.getAttribute("data-type") && e4.tip.hide();
          }, e3.prototype.afterRender = function(e4, t3) {
            e4.options.preview.parse && e4.options.preview.parse(this.element);
            var n2 = (/* @__PURE__ */ new Date()).getTime() - t3;
            (/* @__PURE__ */ new Date()).getTime() - t3 > 2600 ? (e4.tip.show(window.VditorI18n.performanceTip.replace("${x}", n2.toString())), e4.preview.element.setAttribute("data-type", "renderPerformance")) : "renderPerformance" === e4.preview.element.getAttribute("data-type") && (e4.tip.hide(), e4.preview.element.removeAttribute("data-type"));
            var r2 = e4.preview.element.querySelector(".vditor-comment--focus");
            r2 && r2.classList.remove("vditor-comment--focus"), (0, S.O)(e4.preview.previewElement, e4.options.preview.hljs), (0, M.s)(e4.options.preview.hljs, e4.preview.previewElement, e4.options.cdn), (0, A.i)(e4.preview.previewElement, e4.options.cdn, e4.options.theme), (0, _.K)(e4.preview.previewElement, e4.options.cdn, e4.options.theme), (0, L.P)(e4.preview.previewElement, e4.options.cdn), (0, T.v)(e4.preview.previewElement, e4.options.cdn), (0, k.p)(e4.preview.previewElement, e4.options.cdn, e4.options.theme), (0, x.P)(e4.preview.previewElement, e4.options.cdn, e4.options.theme), (0, H.B)(e4.preview.previewElement, e4.options.cdn), (0, E.Q)(e4.preview.previewElement, e4.options.cdn), e4.options.preview.render.media.enable && (0, Bt.Y)(e4.preview.previewElement), e4.options.customRenders.forEach(function(t4) {
              t4.render(e4.preview.previewElement, e4);
            });
            var i2 = e4.preview.element, o2 = e4.outline.render(e4);
            "" === o2 && (o2 = "[ToC]"), i2.querySelectorAll('[data-type="toc-block"]').forEach(function(t4) {
              t4.innerHTML = o2, (0, C.H)(t4, { cdn: e4.options.cdn, math: e4.options.preview.math });
            }), (0, C.H)(e4.preview.previewElement, { cdn: e4.options.cdn, math: e4.options.preview.math });
          }, e3.prototype.copyToX = function(e4, t3, n2) {
            void 0 === n2 && (n2 = "mp-wechat"), "zhihu" !== n2 ? t3.querySelectorAll(".katex-html .base").forEach(function(e5) {
              e5.style.display = "initial";
            }) : t3.querySelectorAll(".language-math").forEach(function(e5) {
              e5.outerHTML = '<img class="Formula-image" data-eeimg="true" src="//www.zhihu.com/equation?tex=" alt="' + e5.getAttribute("data-math") + '\\" style="display: block; margin: 0 auto; max-width: 100%;">';
            }), t3.style.backgroundColor = "#fff", t3.querySelectorAll("code").forEach(function(e5) {
              e5.style.backgroundImage = "none";
            }), this.element.append(t3);
            var r2 = t3.ownerDocument.createRange();
            r2.selectNode(t3), (0, D.Hc)(r2), document.execCommand("copy"), t3.remove(), e4.tip.show(["zhihu", "mp-wechat"].includes(n2) ? "已复制，可到" + ("zhihu" === n2 ? "知乎" : "微信公众号平台") + "进行粘贴" : "已复制到剪切板");
          }, e3;
        }(), Ut = function() {
          function e3(e4) {
            this.element = document.createElement("div"), this.element.className = "vditor-resize vditor-resize--" + e4.options.resize.position, this.element.innerHTML = '<div><svg><use xlink:href="#vditor-icon-resize"></use></svg></div>', this.bindEvent(e4);
          }
          return e3.prototype.bindEvent = function(e4) {
            var t3 = this;
            this.element.addEventListener("mousedown", function(n2) {
              var r2 = document, i2 = n2.clientY, o2 = e4.element.offsetHeight, a2 = 63 + e4.element.querySelector(".vditor-toolbar").clientHeight;
              r2.ondragstart = function() {
                return false;
              }, window.captureEvents && window.captureEvents(), t3.element.classList.add("vditor-resize--selected"), r2.onmousemove = function(t4) {
                "top" === e4.options.resize.position ? e4.element.style.height = Math.max(a2, o2 + (i2 - t4.clientY)) + "px" : e4.element.style.height = Math.max(a2, o2 + (t4.clientY - i2)) + "px", e4.options.typewriterMode && (e4.sv.element.style.paddingBottom = e4.sv.element.parentElement.offsetHeight / 2 + "px");
              }, r2.onmouseup = function() {
                e4.options.resize.after && e4.options.resize.after(e4.element.offsetHeight - o2), window.captureEvents && window.captureEvents(), r2.onmousemove = null, r2.onmouseup = null, r2.ondragstart = null, r2.onselectstart = null, r2.onselect = null, t3.element.classList.remove("vditor-resize--selected");
              };
            });
          }, e3;
        }(), Wt = function() {
          function e3(e4) {
            this.composingLock = false, this.element = document.createElement("pre"), this.element.className = "vditor-sv vditor-reset", this.element.setAttribute("placeholder", e4.options.placeholder), this.element.setAttribute("contenteditable", "true"), this.element.setAttribute("spellcheck", "false"), this.bindEvent(e4), Se(e4, this.element), Te(e4, this.element), xe(e4, this.element), He(e4, this.element), Me(e4, this.element), Ce(e4, this.element, this.copy), Ae(e4, this.element, this.copy);
          }
          return e3.prototype.copy = function(e4, t3) {
            e4.stopPropagation(), e4.preventDefault(), e4.clipboardData.setData("text/plain", ke(t3[t3.currentMode].element));
          }, e3.prototype.bindEvent = function(e4) {
            var t3 = this;
            this.element.addEventListener("paste", function(t4) {
              Mt(e4, t4, { pasteCode: function(e5) {
                document.execCommand("insertHTML", false, e5);
              } });
            }), this.element.addEventListener("scroll", function() {
              if ("block" === e4.preview.element.style.display) {
                var n2 = t3.element.scrollTop, r2 = t3.element.clientHeight, i2 = t3.element.scrollHeight - parseFloat(t3.element.style.paddingBottom || "0"), o2 = e4.preview.element;
                o2.scrollTop = n2 / r2 > 0.5 ? (n2 + r2) * o2.scrollHeight / i2 - r2 : n2 * o2.scrollHeight / i2;
              }
            }), this.element.addEventListener("compositionstart", function(e5) {
              t3.composingLock = true;
            }), this.element.addEventListener("compositionend", function(n2) {
              (0, d.vU)() || U(e4, n2), t3.composingLock = false;
            }), this.element.addEventListener("input", function(n2) {
              if ("deleteByDrag" !== n2.inputType && "insertFromDrop" !== n2.inputType && !t3.composingLock && "‘" !== n2.data && "“" !== n2.data && "《" !== n2.data) return t3.preventInput ? (t3.preventInput = false, void je(e4, { enableAddUndoStack: true, enableHint: true, enableInput: true })) : void U(e4, n2);
            }), this.element.addEventListener("keyup", function(t4) {
              t4.isComposing || (0, d.yl)(t4) || ("Backspace" !== t4.key && "Delete" !== t4.key || "" === e4.sv.element.innerHTML || 1 !== e4.sv.element.childNodes.length || !e4.sv.element.firstElementChild || "DIV" !== e4.sv.element.firstElementChild.tagName || 2 !== e4.sv.element.firstElementChild.childElementCount || "" !== e4.sv.element.firstElementChild.textContent && "\n" !== e4.sv.element.textContent ? "Enter" === t4.key && _e(e4) : e4.sv.element.innerHTML = "");
            });
          }, e3;
        }(), Gt = function() {
          function e3() {
            this.element = document.createElement("div"), this.element.className = "vditor-tip";
          }
          return e3.prototype.show = function(e4, t3) {
            var n2 = this;
            void 0 === t3 && (t3 = 6e3), this.element.className = "vditor-tip vditor-tip--show", 0 === t3 ? (this.element.innerHTML = '<div class="vditor-tip__content">' + e4 + '\n<div class="vditor-tip__close">X</div></div>', this.element.querySelector(".vditor-tip__close").addEventListener("click", function() {
              n2.hide();
            })) : (this.element.innerHTML = '<div class="vditor-tip__content">' + e4 + "</div>", setTimeout(function() {
              n2.hide();
            }, t3)), this.element.removeAttribute("style"), setTimeout(function() {
              n2.element.getBoundingClientRect().top < 46 && (n2.element.style.position = "fixed", n2.element.style.top = "46px");
            }, 150);
          }, e3.prototype.hide = function() {
            this.element.className = "vditor-messageElementtip", this.element.innerHTML = "";
          }, e3;
        }(), zt = function(e3, t3) {
          if (t3.options.preview.mode !== e3) {
            switch (t3.options.preview.mode = e3, e3) {
              case "both":
                t3.sv.element.style.display = "block", t3.preview.element.style.display = "block", t3.preview.render(t3), u(t3.toolbar.elements, ["both"]);
                break;
              case "editor":
                t3.sv.element.style.display = "block", t3.preview.element.style.display = "none", c(t3.toolbar.elements, ["both"]);
            }
            t3.devtools && t3.devtools.renderEchart(t3);
          }
        }, Kt = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), Ft = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return "both" === t4.options.preview.mode && r2.element.children[0].classList.add("vditor-menu--current"), r2.element.children[0].addEventListener((0, d.Le)(), function(e4) {
              r2.element.firstElementChild.classList.contains(i.g.CLASS_MENU_DISABLED) || (e4.preventDefault(), "sv" === t4.currentMode && ("both" === t4.options.preview.mode ? zt("editor", t4) : zt("both", t4)));
            }), r2;
          }
          return Kt(t3, e3), t3;
        }(ye), Zt = function() {
          this.element = document.createElement("div"), this.element.className = "vditor-toolbar__br";
        }, Jt = n(312), Xt = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), Yt = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this, o2 = r2.element.children[0], a2 = document.createElement("div");
            a2.className = "vditor-hint" + (2 === n2.level ? "" : " vditor-panel--arrow");
            var l2 = "";
            return i.g.CODE_THEME.forEach(function(e4) {
              l2 += "<button>" + e4 + "</button>";
            }), a2.innerHTML = '<div style="overflow: auto;max-height:' + window.innerHeight / 2 + 'px">' + l2 + "</div>", a2.addEventListener((0, d.Le)(), function(e4) {
              "BUTTON" === e4.target.tagName && (v(t4, ["subToolbar"]), t4.options.preview.hljs.style = e4.target.textContent, (0, Jt.Y)(e4.target.textContent, t4.options.cdn), e4.preventDefault(), e4.stopPropagation());
            }), r2.element.appendChild(a2), g(t4, a2, o2, n2.level), r2;
          }
          return Xt(t3, e3), t3;
        }(ye), Qt = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), $t = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this, i2 = r2.element.children[0], o2 = document.createElement("div");
            o2.className = "vditor-hint" + (2 === n2.level ? "" : " vditor-panel--arrow");
            var a2 = "";
            return Object.keys(t4.options.preview.theme.list).forEach(function(e4) {
              a2 += '<button data-type="' + e4 + '">' + t4.options.preview.theme.list[e4] + "</button>";
            }), o2.innerHTML = '<div style="overflow: auto;max-height:' + window.innerHeight / 2 + 'px">' + a2 + "</div>", o2.addEventListener((0, d.Le)(), function(e4) {
              "BUTTON" === e4.target.tagName && (v(t4, ["subToolbar"]), t4.options.preview.theme.current = e4.target.getAttribute("data-type"), (0, W.Z)(t4.options.preview.theme.current, t4.options.preview.theme.path), e4.preventDefault(), e4.stopPropagation());
            }), r2.element.appendChild(o2), g(t4, o2, i2, n2.level), r2;
          }
          return Qt(t3, e3), t3;
        }(ye), en = function() {
          function e3(e4) {
            this.element = document.createElement("span"), this.element.className = "vditor-counter vditor-tooltipped vditor-tooltipped__nw", this.render(e4, "");
          }
          return e3.prototype.render = function(e4, t3) {
            var n2 = t3.endsWith("\n") ? t3.length - 1 : t3.length;
            if ("text" === e4.options.counter.type && e4[e4.currentMode]) {
              var r2 = e4[e4.currentMode].element.cloneNode(true);
              r2.querySelectorAll(".vditor-wysiwyg__preview").forEach(function(e5) {
                e5.remove();
              }), n2 = r2.textContent.length;
            }
            "number" == typeof e4.options.counter.max ? (n2 > e4.options.counter.max ? this.element.className = "vditor-counter vditor-counter--error" : this.element.className = "vditor-counter", this.element.innerHTML = n2 + "/" + e4.options.counter.max) : this.element.innerHTML = "" + n2, this.element.setAttribute("aria-label", e4.options.counter.type), e4.options.counter.after && e4.options.counter.after(n2, { enable: e4.options.counter.enable, max: e4.options.counter.max, type: e4.options.counter.type });
          }, e3;
        }(), tn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), nn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return r2.element.children[0].innerHTML = n2.icon, r2.element.children[0].addEventListener((0, d.Le)(), function(e4) {
              e4.preventDefault(), e4.currentTarget.classList.contains(i.g.CLASS_MENU_DISABLED) || n2.click(e4, t4);
            }), r2;
          }
          return tn(t3, e3), t3;
        }(ye), rn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), on = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return r2.element.firstElementChild.addEventListener((0, d.Le)(), function(e4) {
              var n3 = r2.element.firstElementChild;
              n3.classList.contains(i.g.CLASS_MENU_DISABLED) || (e4.preventDefault(), n3.classList.contains("vditor-menu--current") ? (n3.classList.remove("vditor-menu--current"), t4.devtools.element.style.display = "none", z(t4)) : (n3.classList.add("vditor-menu--current"), t4.devtools.element.style.display = "block", z(t4), t4.devtools.renderEchart(t4)));
            }), r2;
          }
          return rn(t3, e3), t3;
        }(ye), an = function() {
          this.element = document.createElement("div"), this.element.className = "vditor-toolbar__divider";
        }, ln = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), sn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this, i2 = document.createElement("div");
            i2.className = "vditor-panel vditor-panel--arrow";
            var o2 = "";
            return Object.keys(t4.options.hint.emoji).forEach(function(e4) {
              var n3 = t4.options.hint.emoji[e4];
              n3.indexOf(".") > -1 ? o2 += '<button data-value=":' + e4 + ': " data-key=":' + e4 + ':"><img\ndata-value=":' + e4 + ': " data-key=":' + e4 + ':" class="vditor-emojis__icon" src="' + n3 + '"/></button>' : o2 += '<button data-value="' + n3 + ' "\n data-key="' + e4 + '"><span class="vditor-emojis__icon">' + n3 + "</span></button>";
            }), i2.innerHTML = '<div class="vditor-emojis" style="max-height: ' + ("auto" === t4.options.height ? "auto" : t4.options.height - 80) + 'px">' + o2 + '</div><div class="vditor-emojis__tail">\n    <span class="vditor-emojis__tip"></span><span>' + (t4.options.hint.emojiTail || "") + "</span>\n</div>", r2.element.appendChild(i2), g(t4, i2, r2.element.firstElementChild, n2.level), r2.bindEvent(t4), r2;
          }
          return ln(t3, e3), t3.prototype.bindEvent = function(e4) {
            var t4 = this;
            this.element.lastElementChild.addEventListener((0, d.Le)(), function(n2) {
              var r2 = (0, b.S)(n2.target, "BUTTON");
              if (r2) {
                n2.preventDefault();
                var i2 = r2.getAttribute("data-value"), o2 = (0, D.zh)(e4), a2 = i2;
                if ("wysiwyg" === e4.currentMode ? a2 = e4.lute.SpinVditorDOM(i2) : "ir" === e4.currentMode && (a2 = e4.lute.SpinVditorIRDOM(i2)), i2.indexOf(":") > -1 && "sv" !== e4.currentMode) {
                  var l2 = document.createElement("div");
                  l2.innerHTML = a2, a2 = l2.firstElementChild.firstElementChild.outerHTML + " ", (0, D.oC)(a2, e4);
                } else o2.extractContents(), o2.insertNode(document.createTextNode(i2));
                o2.collapse(false), (0, D.Hc)(o2), t4.element.lastElementChild.style.display = "none", ct(e4);
              }
            }), this.element.lastElementChild.addEventListener("mouseover", function(e5) {
              var n2 = (0, b.S)(e5.target, "BUTTON");
              n2 && (t4.element.querySelector(".vditor-emojis__tip").innerHTML = n2.getAttribute("data-key"));
            });
          }, t3;
        }(ye), dn = function(e3, t3, n2) {
          var r2 = document.createElement("a");
          "download" in r2 ? (r2.download = n2, r2.style.display = "none", r2.href = URL.createObjectURL(new Blob([t3])), document.body.appendChild(r2), r2.click(), r2.remove()) : e3.tip.show(window.VditorI18n.downloadTip, 0);
        }, cn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), un = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this, i2 = r2.element.children[0], o2 = document.createElement("div");
            return o2.className = "vditor-hint" + (2 === n2.level ? "" : " vditor-panel--arrow"), o2.innerHTML = '<button data-type="markdown">Markdown</button>\n<button data-type="pdf">PDF</button>\n<button data-type="html">HTML</button>', o2.addEventListener((0, d.Le)(), function(e4) {
              var n3 = e4.target;
              if ("BUTTON" === n3.tagName) {
                switch (n3.getAttribute("data-type")) {
                  case "markdown":
                    !function(e5) {
                      var t5 = a(e5);
                      dn(e5, t5, t5.substr(0, 10) + ".md");
                    }(t4);
                    break;
                  case "pdf":
                    !function(e5) {
                      e5.tip.show(window.VditorI18n.generate, 3800);
                      var t5 = document.querySelector("#vditorExportIframe");
                      t5.contentDocument.open(), t5.contentDocument.write('<link rel="stylesheet" href="' + e5.options.cdn + '/dist/index.css"/>\n<script src="' + e5.options.cdn + `/dist/method.min.js"><\/script>
<div id="preview" style="width: 800px"></div>
<script>
window.addEventListener("message", (e) => {
  if(!e.data) {
    return;
  }
  Vditor.preview(document.getElementById('preview'), e.data, {
    cdn: "` + e5.options.cdn + '",\n    markdown: {\n      theme: ' + JSON.stringify(e5.options.preview.theme) + '\n    },\n    hljs: {\n      style: "' + e5.options.preview.hljs.style + '"\n    }\n  });\n  setTimeout(() => {\n        window.print();\n    }, 3600);\n}, false);\n<\/script>'), t5.contentDocument.close(), setTimeout(function() {
                        t5.contentWindow.postMessage(a(e5), "*");
                      }, 200);
                    }(t4);
                    break;
                  case "html":
                    !function(e5) {
                      var t5 = jt(e5), n4 = '<html><head><link rel="stylesheet" type="text/css" href="' + e5.options.cdn + '/dist/index.css"/>\n<script src="' + e5.options.cdn + "/dist/js/i18n/" + e5.options.lang + '.js"><\/script>\n<script src="' + e5.options.cdn + '/dist/method.min.js"><\/script></head>\n<body><div class="vditor-reset" id="preview">' + t5 + "</div>\n<script>\n    const previewElement = document.getElementById('preview')\n    Vditor.setContentTheme('" + e5.options.preview.theme.current + "', '" + e5.options.preview.theme.path + "');\n    Vditor.codeRender(previewElement);\n    Vditor.highlightRender(" + JSON.stringify(e5.options.preview.hljs) + ", previewElement, '" + e5.options.cdn + "');\n    Vditor.mathRender(previewElement, {\n        cdn: '" + e5.options.cdn + "',\n        math: " + JSON.stringify(e5.options.preview.math) + ",\n    });\n    Vditor.mermaidRender(previewElement, '" + e5.options.cdn + "', '" + e5.options.theme + "');\n    Vditor.markmapRender(previewElement, '" + e5.options.cdn + "', '" + e5.options.theme + "');\n    Vditor.flowchartRender(previewElement, '" + e5.options.cdn + "');\n    Vditor.graphvizRender(previewElement, '" + e5.options.cdn + "');\n    Vditor.chartRender(previewElement, '" + e5.options.cdn + "', '" + e5.options.theme + "');\n    Vditor.mindmapRender(previewElement, '" + e5.options.cdn + "', '" + e5.options.theme + "');\n    Vditor.abcRender(previewElement, '" + e5.options.cdn + "');\n    " + (e5.options.preview.render.media.enable ? "Vditor.mediaRender(previewElement);" : "") + '\n    Vditor.speechRender(previewElement);\n<\/script>\n<script src="' + e5.options.cdn + "/dist/js/icons/" + e5.options.icon + '.js"><\/script></body></html>';
                      dn(e5, n4, t5.substr(0, 10) + ".html");
                    }(t4);
                }
                v(t4, ["subToolbar"]), e4.preventDefault(), e4.stopPropagation();
              }
            }), r2.element.appendChild(o2), g(t4, o2, i2, n2.level), r2;
          }
          return cn(t3, e3), t3;
        }(ye), pn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), mn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return r2._bindEvent(t4, n2), r2;
          }
          return pn(t3, e3), t3.prototype._bindEvent = function(e4, t4) {
            this.element.children[0].addEventListener((0, d.Le)(), function(n2) {
              n2.preventDefault(), e4.element.className.includes("vditor--fullscreen") ? (t4.level || (this.innerHTML = t4.icon), e4.element.style.zIndex = "", document.body.style.overflow = "", e4.element.classList.remove("vditor--fullscreen"), Object.keys(e4.toolbar.elements).forEach(function(t5) {
                var n3 = e4.toolbar.elements[t5].firstChild;
                n3 && (n3.className = n3.className.replace("__s", "__n"), e4.options.toolbar.forEach(function(e5) {
                  "string" != typeof e5 && e5.tipPosition && e5.name === n3.dataset.type && (n3.className = "vditor-tooltipped vditor-tooltipped__" + e5.tipPosition);
                }));
              }), e4.counter && (e4.counter.element.className = e4.counter.element.className.replace("__s", "__n"))) : (t4.level || (this.innerHTML = '<svg><use xlink:href="#vditor-icon-contract"></use></svg>'), e4.element.style.zIndex = e4.options.fullscreen.index.toString(), document.body.style.overflow = "hidden", e4.element.classList.add("vditor--fullscreen"), Object.keys(e4.toolbar.elements).forEach(function(t5) {
                var n3 = e4.toolbar.elements[t5].firstChild;
                n3 && (n3.className = n3.className.replace("__n", "__s"));
              }), e4.counter && (e4.counter.element.className = e4.counter.element.className.replace("__n", "__s"))), e4.devtools && e4.devtools.renderEchart(e4), t4.click && t4.click(n2, e4), z(e4), K(e4);
            });
          }, t3;
        }(ye), fn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), hn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this, i2 = document.createElement("div");
            return i2.className = "vditor-hint vditor-panel--arrow", i2.innerHTML = '<button data-tag="h1" data-value="# ">' + window.VditorI18n.heading1 + " " + (0, d.ns)("&lt;⌥⌘1>") + '</button>\n<button data-tag="h2" data-value="## ">' + window.VditorI18n.heading2 + " &lt;" + (0, d.ns)("⌥⌘2") + '></button>\n<button data-tag="h3" data-value="### ">' + window.VditorI18n.heading3 + " &lt;" + (0, d.ns)("⌥⌘3") + '></button>\n<button data-tag="h4" data-value="#### ">' + window.VditorI18n.heading4 + " &lt;" + (0, d.ns)("⌥⌘4") + '></button>\n<button data-tag="h5" data-value="##### ">' + window.VditorI18n.heading5 + " &lt;" + (0, d.ns)("⌥⌘5") + '></button>\n<button data-tag="h6" data-value="###### ">' + window.VditorI18n.heading6 + " &lt;" + (0, d.ns)("⌥⌘6") + "></button>", r2.element.appendChild(i2), r2._bindEvent(t4, i2), r2;
          }
          return fn(t3, e3), t3.prototype._bindEvent = function(e4, t4) {
            var n2 = this.element.children[0];
            n2.addEventListener((0, d.Le)(), function(r3) {
              r3.preventDefault(), clearTimeout(e4.wysiwyg.afterRenderTimeoutId), clearTimeout(e4.ir.processTimeoutId), clearTimeout(e4.sv.processTimeoutId), n2.classList.contains(i.g.CLASS_MENU_DISABLED) || (n2.blur(), n2.classList.contains("vditor-menu--current") ? ("wysiwyg" === e4.currentMode ? (re(e4), Q(e4)) : "ir" === e4.currentMode && _t(e4, ""), n2.classList.remove("vditor-menu--current")) : (v(e4, ["subToolbar"]), t4.style.display = "block"));
            });
            for (var r2 = 0; r2 < 6; r2++) t4.children.item(r2).addEventListener((0, d.Le)(), function(r3) {
              r3.preventDefault(), "wysiwyg" === e4.currentMode ? (ne(e4, r3.target.getAttribute("data-tag")), Q(e4), n2.classList.add("vditor-menu--current")) : "ir" === e4.currentMode ? (_t(e4, r3.target.getAttribute("data-value")), n2.classList.add("vditor-menu--current")) : Re(e4, r3.target.getAttribute("data-value")), t4.style.display = "none";
            });
          }, t3;
        }(ye), vn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), gn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return r2.element.children[0].addEventListener((0, d.Le)(), function(e4) {
              e4.preventDefault(), t4.tip.show('<div style="margin-bottom:14px;font-size: 14px;line-height: 22px;min-width:300px;max-width: 360px;display: flex;">\n<div style="margin-top: 14px;flex: 1">\n    <div>Markdown 使用指南</div>\n    <ul style="list-style: none">\n        <li><a href="https://ld246.com/article/1583308420519" target="_blank">语法速查手册</a></li>\n        <li><a href="https://ld246.com/article/1583129520165" target="_blank">基础语法</a></li>\n        <li><a href="https://ld246.com/article/1583305480675" target="_blank">扩展语法</a></li>\n        <li><a href="https://ld246.com/article/1582778815353" target="_blank">键盘快捷键</a></li>\n    </ul>\n</div>\n<div style="margin-top: 14px;flex: 1">\n    <div>Vditor 支持</div>\n    <ul style="list-style: none">\n        <li><a href="https://github.com/Vanessa219/vditor/issues" target="_blank">Issues</a></li>\n        <li><a href="https://ld246.com/tag/vditor" target="_blank">官方讨论区</a></li>\n        <li><a href="https://ld246.com/article/1549638745630" target="_blank">开发手册</a></li>\n        <li><a href="https://ld246.com/guide/markdown" target="_blank">演示地址</a></li>\n    </ul>\n</div></div>', 0);
            }), r2;
          }
          return vn(t3, e3), t3;
        }(ye), yn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), bn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return r2.element.children[0].addEventListener((0, d.Le)(), function(e4) {
              if (e4.preventDefault(), !r2.element.firstElementChild.classList.contains(i.g.CLASS_MENU_DISABLED) && "sv" !== t4.currentMode) {
                var n3 = (0, D.zh)(t4), o2 = (0, y.lG)(n3.startContainer, "LI");
                o2 && ot(t4, o2, n3);
              }
            }), r2;
          }
          return yn(t3, e3), t3;
        }(ye), wn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), En = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return r2.element.children[0].addEventListener((0, d.Le)(), function(e4) {
              e4.preventDefault(), t4.tip.show('<div style="max-width: 520px; font-size: 14px;line-height: 22px;margin-bottom: 14px;">\n<p style="text-align: center;margin: 14px 0">\n    <em>下一代的 Markdown 编辑器，为未来而构建</em>\n</p>\n<div style="display: flex;margin-bottom: 14px;flex-wrap: wrap;align-items: center">\n    <img src="https://unpkg.com/vditor/dist/images/logo.png" style="margin: 0 auto;height: 68px"/>\n    <div>&nbsp;&nbsp;</div>\n    <div style="flex: 1;min-width: 250px">\n        Vditor 是一款浏览器端的 Markdown 编辑器，支持所见即所得、即时渲染（类似 Typora）和分屏预览模式。\n        它使用 TypeScript 实现，支持原生 JavaScript 以及 Vue、React、Angular 和 Svelte 等框架。\n    </div>\n</div>\n<div style="display: flex;flex-wrap: wrap;">\n    <ul style="list-style: none;flex: 1;min-width:148px">\n        <li>\n        项目地址：<a href="https://b3log.org/vditor" target="_blank">b3log.org/vditor</a>\n        </li>\n        <li>\n        开源协议：MIT\n        </li>\n    </ul>\n    <ul style="list-style: none;margin-right: 18px">\n        <li>\n        组件版本：Vditor v' + i.H + " / Lute v" + Lute.Version + '\n        </li>\n        <li>\n        赞助捐赠：<a href="https://ld246.com/sponsor" target="_blank">https://ld246.com/sponsor</a>\n        </li>\n    </ul>\n</div>\n</div>', 0);
            }), r2;
          }
          return wn(t3, e3), t3;
        }(ye), kn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), Sn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return r2.element.children[0].addEventListener((0, d.Le)(), function(e4) {
              e4.preventDefault(), r2.element.firstElementChild.classList.contains(i.g.CLASS_MENU_DISABLED) || "sv" === t4.currentMode || Qe(t4, "afterend");
            }), r2;
          }
          return kn(t3, e3), t3;
        }(ye), Ln = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), Tn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return r2.element.children[0].addEventListener((0, d.Le)(), function(e4) {
              e4.preventDefault(), r2.element.firstElementChild.classList.contains(i.g.CLASS_MENU_DISABLED) || "sv" === t4.currentMode || Qe(t4, "beforebegin");
            }), r2;
          }
          return Ln(t3, e3), t3;
        }(ye), Mn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), Cn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return r2.element.children[0].addEventListener((0, d.Le)(), function(e4) {
              if (e4.preventDefault(), !r2.element.firstElementChild.classList.contains(i.g.CLASS_MENU_DISABLED) && "sv" !== t4.currentMode) {
                var n3 = (0, D.zh)(t4), o2 = (0, y.lG)(n3.startContainer, "LI");
                o2 && at(t4, o2, n3, o2.parentElement);
              }
            }), r2;
          }
          return Mn(t3, e3), t3;
        }(ye), An = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), _n = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return t4.options.outline && r2.element.firstElementChild.classList.add("vditor-menu--current"), r2.element.children[0].addEventListener((0, d.Le)(), function(e4) {
              e4.preventDefault(), t4.toolbar.elements.outline.firstElementChild.classList.contains(i.g.CLASS_MENU_DISABLED) || (t4.options.outline.enable = !r2.element.firstElementChild.classList.contains("vditor-menu--current"), t4.outline.toggle(t4, t4.options.outline.enable));
            }), r2;
          }
          return An(t3, e3), t3;
        }(ye), xn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), Hn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return r2._bindEvent(t4), r2;
          }
          return xn(t3, e3), t3.prototype._bindEvent = function(e4) {
            var t4 = this;
            this.element.children[0].addEventListener((0, d.Le)(), function(n2) {
              n2.preventDefault();
              var r2 = t4.element.firstElementChild;
              if (!r2.classList.contains(i.g.CLASS_MENU_DISABLED)) {
                var o2 = i.g.EDIT_TOOLBARS.concat(["both", "edit-mode", "devtools"]);
                r2.classList.contains("vditor-menu--current") ? (r2.classList.remove("vditor-menu--current"), "sv" === e4.currentMode ? (e4.sv.element.style.display = "block", "both" === e4.options.preview.mode ? e4.preview.element.style.display = "block" : e4.preview.element.style.display = "none") : (e4[e4.currentMode].element.parentElement.style.display = "block", e4.preview.element.style.display = "none"), p(e4.toolbar.elements, o2), e4.outline.render(e4)) : (m(e4.toolbar.elements, o2), e4.preview.element.style.display = "block", "sv" === e4.currentMode ? e4.sv.element.style.display = "none" : e4[e4.currentMode].element.parentElement.style.display = "none", e4.preview.render(e4), r2.classList.add("vditor-menu--current"), v(e4, ["subToolbar", "hint", "popover"]), setTimeout(function() {
                  e4.outline.render(e4);
                }, e4.options.preview.delay + 10)), z(e4);
              }
            });
          }, t3;
        }(ye), Nn = function() {
          function e3(e4) {
            var t3;
            if (this.SAMPLE_RATE = 5e3, this.isRecording = false, this.readyFlag = false, this.leftChannel = [], this.rightChannel = [], this.recordingLength = 0, "undefined" != typeof AudioContext) t3 = new AudioContext();
            else {
              if (!webkitAudioContext) return;
              t3 = new webkitAudioContext();
            }
            this.DEFAULT_SAMPLE_RATE = t3.sampleRate;
            var n2 = t3.createGain();
            t3.createMediaStreamSource(e4).connect(n2), this.recorder = t3.createScriptProcessor(2048, 2, 1), this.recorder.onaudioprocess = null, n2.connect(this.recorder), this.recorder.connect(t3.destination), this.readyFlag = true;
          }
          return e3.prototype.cloneChannelData = function(e4, t3) {
            this.leftChannel.push(new Float32Array(e4)), this.rightChannel.push(new Float32Array(t3)), this.recordingLength += 2048;
          }, e3.prototype.startRecordingNewWavFile = function() {
            this.readyFlag && (this.isRecording = true, this.leftChannel.length = this.rightChannel.length = 0, this.recordingLength = 0);
          }, e3.prototype.stopRecording = function() {
            this.isRecording = false;
          }, e3.prototype.buildWavFileBlob = function() {
            for (var e4 = this.mergeBuffers(this.leftChannel), t3 = this.mergeBuffers(this.rightChannel), n2 = new Float32Array(e4.length), r2 = 0; r2 < e4.length; ++r2) n2[r2] = 0.5 * (e4[r2] + t3[r2]);
            this.DEFAULT_SAMPLE_RATE > this.SAMPLE_RATE && (n2 = this.downSampleBuffer(n2, this.SAMPLE_RATE));
            var i2 = 44 + 2 * n2.length, o2 = new ArrayBuffer(i2), a2 = new DataView(o2);
            this.writeUTFBytes(a2, 0, "RIFF"), a2.setUint32(4, i2, true), this.writeUTFBytes(a2, 8, "WAVE"), this.writeUTFBytes(a2, 12, "fmt "), a2.setUint32(16, 16, true), a2.setUint16(20, 1, true), a2.setUint16(22, 1, true), a2.setUint32(24, this.SAMPLE_RATE, true), a2.setUint32(28, 2 * this.SAMPLE_RATE, true), a2.setUint16(32, 2, true), a2.setUint16(34, 16, true);
            var l2 = 2 * n2.length;
            this.writeUTFBytes(a2, 36, "data"), a2.setUint32(40, l2, true);
            for (var s2 = n2.length, d2 = 44, c2 = 0; c2 < s2; c2++) a2.setInt16(d2, 32767 * n2[c2], true), d2 += 2;
            return new Blob([a2], { type: "audio/wav" });
          }, e3.prototype.downSampleBuffer = function(e4, t3) {
            if (t3 === this.DEFAULT_SAMPLE_RATE) return e4;
            if (t3 > this.DEFAULT_SAMPLE_RATE) return e4;
            for (var n2 = this.DEFAULT_SAMPLE_RATE / t3, r2 = Math.round(e4.length / n2), i2 = new Float32Array(r2), o2 = 0, a2 = 0; o2 < i2.length; ) {
              for (var l2 = Math.round((o2 + 1) * n2), s2 = 0, d2 = 0, c2 = a2; c2 < l2 && c2 < e4.length; c2++) s2 += e4[c2], d2++;
              i2[o2] = s2 / d2, o2++, a2 = l2;
            }
            return i2;
          }, e3.prototype.mergeBuffers = function(e4) {
            for (var t3 = new Float32Array(this.recordingLength), n2 = 0, r2 = e4.length, i2 = 0; i2 < r2; ++i2) {
              var o2 = e4[i2];
              t3.set(o2, n2), n2 += o2.length;
            }
            return t3;
          }, e3.prototype.writeUTFBytes = function(e4, t3, n2) {
            for (var r2 = n2.length, i2 = 0; i2 < r2; i2++) e4.setUint8(t3 + i2, n2.charCodeAt(i2));
          }, e3;
        }(), Dn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), On = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return r2._bindEvent(t4), r2;
          }
          return Dn(t3, e3), t3.prototype._bindEvent = function(e4) {
            var t4, n2 = this;
            this.element.children[0].addEventListener((0, d.Le)(), function(r2) {
              if (r2.preventDefault(), !n2.element.firstElementChild.classList.contains(i.g.CLASS_MENU_DISABLED)) {
                var o2 = e4[e4.currentMode].element;
                if (t4) if (t4.isRecording) {
                  t4.stopRecording(), e4.tip.hide();
                  var a2 = new File([t4.buildWavFileBlob()], "record" + (/* @__PURE__ */ new Date()).getTime() + ".wav", { type: "video/webm" });
                  Ge(e4, [a2]), n2.element.children[0].classList.remove("vditor-menu--current");
                } else e4.tip.show(window.VditorI18n.recording), o2.setAttribute("contenteditable", "false"), t4.startRecordingNewWavFile(), n2.element.children[0].classList.add("vditor-menu--current");
                else navigator.mediaDevices.getUserMedia({ audio: true }).then(function(r3) {
                  (t4 = new Nn(r3)).recorder.onaudioprocess = function(e5) {
                    if (t4.isRecording) {
                      var n3 = e5.inputBuffer.getChannelData(0), r4 = e5.inputBuffer.getChannelData(1);
                      t4.cloneChannelData(n3, r4);
                    }
                  }, t4.startRecordingNewWavFile(), e4.tip.show(window.VditorI18n.recording), o2.setAttribute("contenteditable", "false"), n2.element.children[0].classList.add("vditor-menu--current");
                }).catch(function() {
                  e4.tip.show(window.VditorI18n["record-tip"]);
                });
              }
            });
          }, t3;
        }(ye), In = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), jn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return m({ redo: r2.element }, ["redo"]), r2.element.children[0].addEventListener((0, d.Le)(), function(e4) {
              e4.preventDefault(), r2.element.firstElementChild.classList.contains(i.g.CLASS_MENU_DISABLED) || t4.undo.redo(t4);
            }), r2;
          }
          return In(t3, e3), t3;
        }(ye), Rn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), Pn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this;
            return m({ undo: r2.element }, ["undo"]), r2.element.children[0].addEventListener((0, d.Le)(), function(e4) {
              e4.preventDefault(), r2.element.firstElementChild.classList.contains(i.g.CLASS_MENU_DISABLED) || t4.undo.undo(t4);
            }), r2;
          }
          return Rn(t3, e3), t3;
        }(ye), qn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), Bn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this, t4, n2) || this, i2 = '<input type="file"';
            return t4.options.upload.multiple && (i2 += ' multiple="multiple"'), t4.options.upload.accept && (i2 += ' accept="' + t4.options.upload.accept + '"'), r2.element.children[0].innerHTML = "" + (n2.icon || '<svg><use xlink:href="#vditor-icon-upload"></use></svg>') + i2 + ">", r2._bindEvent(t4), r2;
          }
          return qn(t3, e3), t3.prototype._bindEvent = function(e4) {
            var t4 = this;
            this.element.children[0].addEventListener((0, d.Le)(), function(e5) {
              if (t4.element.firstElementChild.classList.contains(i.g.CLASS_MENU_DISABLED)) return e5.stopPropagation(), void e5.preventDefault();
            }), this.element.querySelector("input").addEventListener("change", function(n2) {
              if (t4.element.firstElementChild.classList.contains(i.g.CLASS_MENU_DISABLED)) return n2.stopPropagation(), void n2.preventDefault();
              0 !== n2.target.files.length && Ge(e4, n2.target.files, n2.target);
            });
          }, t3;
        }(ye), Vn = function() {
          function e3(e4) {
            var t3 = this, n2 = e4.options;
            this.elements = {}, this.element = document.createElement("div"), this.element.className = "vditor-toolbar", n2.toolbar.forEach(function(n3, r2) {
              var i2 = t3.genItem(e4, n3, r2);
              if (t3.element.appendChild(i2), n3.toolbar) {
                var o2 = document.createElement("div");
                o2.className = "vditor-hint vditor-panel--arrow", o2.addEventListener((0, d.Le)(), function(e5) {
                  o2.style.display = "none";
                }), n3.toolbar.forEach(function(n4, i3) {
                  n4.level = 2, o2.appendChild(t3.genItem(e4, n4, r2 + i3));
                }), i2.appendChild(o2), g(e4, o2, i2.children[0]);
              }
            }), e4.options.toolbarConfig.hide && this.element.classList.add("vditor-toolbar--hide"), e4.options.toolbarConfig.pin && this.element.classList.add("vditor-toolbar--pin"), e4.options.counter.enable && (e4.counter = new en(e4), this.element.appendChild(e4.counter.element));
          }
          return e3.prototype.genItem = function(e4, t3, n2) {
            var r2;
            switch (t3.name) {
              case "bold":
              case "italic":
              case "more":
              case "strike":
              case "line":
              case "quote":
              case "list":
              case "ordered-list":
              case "check":
              case "code":
              case "inline-code":
              case "link":
              case "table":
                r2 = new ye(e4, t3);
                break;
              case "emoji":
                r2 = new sn(e4, t3);
                break;
              case "headings":
                r2 = new hn(e4, t3);
                break;
              case "|":
                r2 = new an();
                break;
              case "br":
                r2 = new Zt();
                break;
              case "undo":
                r2 = new Pn(e4, t3);
                break;
              case "redo":
                r2 = new jn(e4, t3);
                break;
              case "help":
                r2 = new gn(e4, t3);
                break;
              case "both":
                r2 = new Ft(e4, t3);
                break;
              case "preview":
                r2 = new Hn(e4, t3);
                break;
              case "fullscreen":
                r2 = new mn(e4, t3);
                break;
              case "upload":
                r2 = new Bn(e4, t3);
                break;
              case "record":
                r2 = new On(e4, t3);
                break;
              case "info":
                r2 = new En(e4, t3);
                break;
              case "edit-mode":
                r2 = new Ee(e4, t3);
                break;
              case "devtools":
                r2 = new on(e4, t3);
                break;
              case "outdent":
                r2 = new Cn(e4, t3);
                break;
              case "indent":
                r2 = new bn(e4, t3);
                break;
              case "outline":
                r2 = new _n(e4, t3);
                break;
              case "insert-after":
                r2 = new Sn(e4, t3);
                break;
              case "insert-before":
                r2 = new Tn(e4, t3);
                break;
              case "code-theme":
                r2 = new Yt(e4, t3);
                break;
              case "content-theme":
                r2 = new $t(e4, t3);
                break;
              case "export":
                r2 = new un(e4, t3);
                break;
              default:
                r2 = new nn(e4, t3);
            }
            if (r2) {
              var i2 = t3.name;
              return "br" !== i2 && "|" !== i2 || (i2 += n2), this.elements[i2] = r2.element, r2.element;
            }
          }, e3;
        }(), Un = n(471), Wn = function() {
          function e3() {
            this.stackSize = 50, this.resetStack(), this.dmp = new Un();
          }
          return e3.prototype.clearStack = function(e4) {
            this.resetStack(), this.resetIcon(e4);
          }, e3.prototype.resetIcon = function(e4) {
            e4.toolbar && (this[e4.currentMode].undoStack.length > 1 ? p(e4.toolbar.elements, ["undo"]) : m(e4.toolbar.elements, ["undo"]), 0 !== this[e4.currentMode].redoStack.length ? p(e4.toolbar.elements, ["redo"]) : m(e4.toolbar.elements, ["redo"]));
          }, e3.prototype.undo = function(e4) {
            if ("false" !== e4[e4.currentMode].element.getAttribute("contenteditable") && !(this[e4.currentMode].undoStack.length < 2)) {
              var t3 = this[e4.currentMode].undoStack.pop();
              t3 && (this[e4.currentMode].redoStack.push(t3), this.renderDiff(t3, e4), this[e4.currentMode].hasUndo = true, v(e4, ["hint"]));
            }
          }, e3.prototype.redo = function(e4) {
            if ("false" !== e4[e4.currentMode].element.getAttribute("contenteditable")) {
              var t3 = this[e4.currentMode].redoStack.pop();
              t3 && (this[e4.currentMode].undoStack.push(t3), this.renderDiff(t3, e4, true));
            }
          }, e3.prototype.recordFirstPosition = function(e4, t3) {
            if (0 !== getSelection().rangeCount && !(1 !== this[e4.currentMode].undoStack.length || 0 === this[e4.currentMode].undoStack[0].length || this[e4.currentMode].redoStack.length > 0 || (0, d.vU)() && "Backspace" === t3.key || (0, d.G6)())) {
              var n2 = this.addCaret(e4);
              n2.replace("<wbr>", "").replace(" vditor-ir__node--expand", "") === this[e4.currentMode].undoStack[0][0].diffs[0][1].replace("<wbr>", "") && (this[e4.currentMode].undoStack[0][0].diffs[0][1] = n2, this[e4.currentMode].lastText = n2);
            }
          }, e3.prototype.addToUndoStack = function(e4) {
            var t3 = this.addCaret(e4, true), n2 = this.dmp.diff_main(t3, this[e4.currentMode].lastText, true), r2 = this.dmp.patch_make(t3, this[e4.currentMode].lastText, n2);
            0 === r2.length && this[e4.currentMode].undoStack.length > 0 || (this[e4.currentMode].lastText = t3, this[e4.currentMode].undoStack.push(r2), this[e4.currentMode].undoStack.length > this.stackSize && this[e4.currentMode].undoStack.shift(), this[e4.currentMode].hasUndo && (this[e4.currentMode].redoStack = [], this[e4.currentMode].hasUndo = false, m(e4.toolbar.elements, ["redo"])), this[e4.currentMode].undoStack.length > 1 && p(e4.toolbar.elements, ["undo"]));
          }, e3.prototype.renderDiff = function(e4, t3, n2) {
            var r2;
            if (void 0 === n2 && (n2 = false), n2) {
              var i2 = this.dmp.patch_deepCopy(e4).reverse();
              i2.forEach(function(e5) {
                e5.diffs.forEach(function(e6) {
                  e6[0] = -e6[0];
                });
              }), r2 = this.dmp.patch_apply(i2, this[t3.currentMode].lastText)[0];
            } else r2 = this.dmp.patch_apply(e4, this[t3.currentMode].lastText)[0];
            if (this[t3.currentMode].lastText = r2, t3[t3.currentMode].element.innerHTML = r2, "sv" !== t3.currentMode && t3[t3.currentMode].element.querySelectorAll(".vditor-" + t3.currentMode + "__preview[data-render='2']").forEach(function(e5) {
              N(e5, t3);
            }), t3[t3.currentMode].element.querySelector("wbr")) (0, D.ib)(t3[t3.currentMode].element, t3[t3.currentMode].element.ownerDocument.createRange()), _e(t3);
            else {
              var o2 = getSelection().getRangeAt(0);
              o2.setEndBefore(t3[t3.currentMode].element), o2.collapse(false);
            }
            O(t3), ct(t3, { enableAddUndoStack: false, enableHint: false, enableInput: true }), he(t3), t3[t3.currentMode].element.querySelectorAll(".vditor-" + t3.currentMode + "__preview[data-render='2']").forEach(function(e5) {
              N(e5, t3);
            }), this[t3.currentMode].undoStack.length > 1 ? p(t3.toolbar.elements, ["undo"]) : m(t3.toolbar.elements, ["undo"]), 0 !== this[t3.currentMode].redoStack.length ? p(t3.toolbar.elements, ["redo"]) : m(t3.toolbar.elements, ["redo"]);
          }, e3.prototype.resetStack = function() {
            this.ir = { hasUndo: false, lastText: "", redoStack: [], undoStack: [] }, this.sv = { hasUndo: false, lastText: "", redoStack: [], undoStack: [] }, this.wysiwyg = { hasUndo: false, lastText: "", redoStack: [], undoStack: [] };
          }, e3.prototype.addCaret = function(e4, t3) {
            var n2;
            if (void 0 === t3 && (t3 = false), 0 !== getSelection().rangeCount && !e4[e4.currentMode].element.querySelector("wbr")) {
              var r2 = getSelection().getRangeAt(0);
              if (e4[e4.currentMode].element.contains(r2.startContainer)) {
                n2 = r2.cloneRange();
                var i2 = document.createElement("span");
                i2.className = "vditor-wbr", r2.insertNode(i2);
              }
            }
            e4.ir.element.cloneNode(true).querySelectorAll(".vditor-" + e4.currentMode + "__preview[data-render='1']").forEach(function(e5) {
              e5.firstElementChild && (e5.firstElementChild.classList.contains("language-echarts") || e5.firstElementChild.classList.contains("language-plantuml") || e5.firstElementChild.classList.contains("language-mindmap") ? (e5.firstElementChild.removeAttribute("_echarts_instance_"), e5.firstElementChild.removeAttribute("data-processed"), e5.firstElementChild.innerHTML = e5.previousElementSibling.firstElementChild.innerHTML, e5.setAttribute("data-render", "2")) : e5.firstElementChild.classList.contains("language-math") && (e5.setAttribute("data-render", "2"), e5.firstElementChild.textContent = e5.firstElementChild.getAttribute("data-math"), e5.firstElementChild.removeAttribute("data-math")));
            });
            var o2 = e4[e4.currentMode].element.innerHTML;
            return e4[e4.currentMode].element.querySelectorAll(".vditor-wbr").forEach(function(e5) {
              e5.remove();
            }), t3 && n2 && (0, D.Hc)(n2), o2.replace('<span class="vditor-wbr"></span>', "<wbr>");
          }, e3;
        }(), Gn = n(640), zn = function() {
          function e3(e4) {
            this.defaultOptions = { rtl: false, after: void 0, cache: { enable: true }, cdn: i.g.CDN, classes: { preview: "" }, comment: { enable: false }, counter: { enable: false, type: "markdown" }, customRenders: [], debugger: false, fullscreen: { index: 90 }, height: "auto", hint: { delay: 200, emoji: { "+1": "👍", "-1": "👎", confused: "😕", eyes: "👀️", heart: "❤️", rocket: "🚀️", smile: "😄", tada: "🎉️" }, emojiPath: i.g.CDN + "/dist/images/emoji", extend: [], parse: true }, icon: "ant", lang: "zh_CN", mode: "ir", outline: { enable: false, position: "left" }, placeholder: "", preview: { actions: ["desktop", "tablet", "mobile", "mp-wechat", "zhihu"], delay: 1e3, hljs: i.g.HLJS_OPTIONS, markdown: i.g.MARKDOWN_OPTIONS, math: i.g.MATH_OPTIONS, maxWidth: 800, mode: "both", theme: i.g.THEME_OPTIONS, render: { media: { enable: true } } }, link: { isOpen: true }, image: { isPreview: true }, resize: { enable: false, position: "bottom" }, theme: "classic", toolbar: ["emoji", "headings", "bold", "italic", "strike", "link", "|", "list", "ordered-list", "check", "outdent", "indent", "|", "quote", "line", "code", "inline-code", "insert-before", "insert-after", "|", "upload", "record", "table", "|", "undo", "redo", "|", "fullscreen", "edit-mode", { name: "more", toolbar: ["both", "code-theme", "content-theme", "export", "outline", "preview", "devtools", "info", "help"] }], toolbarConfig: { hide: false, pin: false }, typewriterMode: false, undoDelay: 800, upload: { extraData: {}, fieldName: "file[]", filename: function(e5) {
              return e5.replace(/\W/g, "");
            }, linkToImgUrl: "", max: 10485760, multiple: true, url: "", withCredentials: false }, value: "", width: "auto" }, this.options = e4;
          }
          return e3.prototype.merge = function() {
            var e4, t3, n2, r2, i2, o2, a2, l2, s2;
            this.options && (this.options.toolbar ? this.options.toolbar = this.mergeToolbar(this.options.toolbar) : this.options.toolbar = this.mergeToolbar(this.defaultOptions.toolbar), (null === (t3 = null === (e4 = this.options.preview) || void 0 === e4 ? void 0 : e4.theme) || void 0 === t3 ? void 0 : t3.list) && (this.defaultOptions.preview.theme.list = this.options.preview.theme.list), (null === (i2 = null === (r2 = null === (n2 = this.options.preview) || void 0 === n2 ? void 0 : n2.render) || void 0 === r2 ? void 0 : r2.media) || void 0 === i2 ? void 0 : i2.enable) && (this.defaultOptions.preview.render.media.enable = this.options.preview.render.media.enable), (null === (o2 = this.options.hint) || void 0 === o2 ? void 0 : o2.emoji) && (this.defaultOptions.hint.emoji = this.options.hint.emoji), this.options.comment && (this.defaultOptions.comment = this.options.comment), this.options.cdn && ((null === (l2 = null === (a2 = this.options.preview) || void 0 === a2 ? void 0 : a2.theme) || void 0 === l2 ? void 0 : l2.path) || (this.defaultOptions.preview.theme.path = this.options.cdn + "/dist/css/content-theme"), (null === (s2 = this.options.hint) || void 0 === s2 ? void 0 : s2.emojiPath) || (this.defaultOptions.hint.emojiPath = this.options.cdn + "/dist/images/emoji")));
            var d2 = (0, Gn.T)(this.defaultOptions, this.options);
            if (d2.cache.enable && !d2.cache.id) throw new Error("need options.cache.id, see https://ld246.com/article/1549638745630#options");
            return d2;
          }, e3.prototype.mergeToolbar = function(e4) {
            var t3 = this, n2 = [{ icon: '<svg><use xlink:href="#vditor-icon-export"></use></svg>', name: "export", tipPosition: "ne" }, { hotkey: "⌘E", icon: '<svg><use xlink:href="#vditor-icon-emoji"></use></svg>', name: "emoji", tipPosition: "ne" }, { hotkey: "⌘H", icon: '<svg><use xlink:href="#vditor-icon-headings"></use></svg>', name: "headings", tipPosition: "ne" }, { hotkey: "⌘B", icon: '<svg><use xlink:href="#vditor-icon-bold"></use></svg>', name: "bold", prefix: "**", suffix: "**", tipPosition: "ne" }, { hotkey: "⌘I", icon: '<svg><use xlink:href="#vditor-icon-italic"></use></svg>', name: "italic", prefix: "*", suffix: "*", tipPosition: "ne" }, { hotkey: "⌘D", icon: '<svg><use xlink:href="#vditor-icon-strike"></use></svg>', name: "strike", prefix: "~~", suffix: "~~", tipPosition: "ne" }, { hotkey: "⌘K", icon: '<svg><use xlink:href="#vditor-icon-link"></use></svg>', name: "link", prefix: "[", suffix: "](https://)", tipPosition: "n" }, { name: "|" }, { hotkey: "⌘L", icon: '<svg><use xlink:href="#vditor-icon-list"></use></svg>', name: "list", prefix: "* ", tipPosition: "n" }, { hotkey: "⌘O", icon: '<svg><use xlink:href="#vditor-icon-ordered-list"></use></svg>', name: "ordered-list", prefix: "1. ", tipPosition: "n" }, { hotkey: "⌘J", icon: '<svg><use xlink:href="#vditor-icon-check"></use></svg>', name: "check", prefix: "* [ ] ", tipPosition: "n" }, { hotkey: "⇧⌘I", icon: '<svg><use xlink:href="#vditor-icon-outdent"></use></svg>', name: "outdent", tipPosition: "n" }, { hotkey: "⇧⌘O", icon: '<svg><use xlink:href="#vditor-icon-indent"></use></svg>', name: "indent", tipPosition: "n" }, { name: "|" }, { hotkey: "⌘;", icon: '<svg><use xlink:href="#vditor-icon-quote"></use></svg>', name: "quote", prefix: "> ", tipPosition: "n" }, { hotkey: "⇧⌘H", icon: '<svg><use xlink:href="#vditor-icon-line"></use></svg>', name: "line", prefix: "---", tipPosition: "n" }, { hotkey: "⌘U", icon: '<svg><use xlink:href="#vditor-icon-code"></use></svg>', name: "code", prefix: "```", suffix: "\n```", tipPosition: "n" }, { hotkey: "⌘G", icon: '<svg><use xlink:href="#vditor-icon-inline-code"></use></svg>', name: "inline-code", prefix: "`", suffix: "`", tipPosition: "n" }, { hotkey: "⇧⌘B", icon: '<svg><use xlink:href="#vditor-icon-before"></use></svg>', name: "insert-before", tipPosition: "n" }, { hotkey: "⇧⌘E", icon: '<svg><use xlink:href="#vditor-icon-after"></use></svg>', name: "insert-after", tipPosition: "n" }, { name: "|" }, { icon: '<svg><use xlink:href="#vditor-icon-upload"></use></svg>', name: "upload", tipPosition: "n" }, { icon: '<svg><use xlink:href="#vditor-icon-record"></use></svg>', name: "record", tipPosition: "n" }, { hotkey: "⌘M", icon: '<svg><use xlink:href="#vditor-icon-table"></use></svg>', name: "table", prefix: "| col1", suffix: " | col2 | col3 |\n| --- | --- | --- |\n|  |  |  |\n|  |  |  |", tipPosition: "n" }, { name: "|" }, { hotkey: "⌘Z", icon: '<svg><use xlink:href="#vditor-icon-undo"></use></svg>', name: "undo", tipPosition: "nw" }, { hotkey: "⌘Y", icon: '<svg><use xlink:href="#vditor-icon-redo"></use></svg>', name: "redo", tipPosition: "nw" }, { name: "|" }, { icon: '<svg><use xlink:href="#vditor-icon-more"></use></svg>', name: "more", tipPosition: "e" }, { hotkey: "⌘'", icon: '<svg><use xlink:href="#vditor-icon-fullscreen"></use></svg>', name: "fullscreen", tipPosition: "nw" }, { icon: '<svg><use xlink:href="#vditor-icon-edit"></use></svg>', name: "edit-mode", tipPosition: "nw" }, { hotkey: "⌘P", icon: '<svg><use xlink:href="#vditor-icon-both"></use></svg>', name: "both", tipPosition: "nw" }, { icon: '<svg><use xlink:href="#vditor-icon-preview"></use></svg>', name: "preview", tipPosition: "nw" }, { icon: '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>', name: "outline", tipPosition: "nw" }, { icon: '<svg><use xlink:href="#vditor-icon-theme"></use></svg>', name: "content-theme", tipPosition: "nw" }, { icon: '<svg><use xlink:href="#vditor-icon-code-theme"></use></svg>', name: "code-theme", tipPosition: "nw" }, { icon: '<svg><use xlink:href="#vditor-icon-bug"></use></svg>', name: "devtools", tipPosition: "nw" }, { icon: '<svg><use xlink:href="#vditor-icon-info"></use></svg>', name: "info", tipPosition: "nw" }, { icon: '<svg><use xlink:href="#vditor-icon-help"></use></svg>', name: "help", tipPosition: "nw" }, { name: "br" }], r2 = [];
            return e4.forEach(function(e5) {
              var i2 = e5;
              n2.forEach(function(t4) {
                "string" == typeof e5 && t4.name === e5 && (i2 = t4), "object" == typeof e5 && t4.name === e5.name && (i2 = Object.assign({}, t4, e5));
              }), e5.toolbar && (i2.toolbar = t3.mergeToolbar(e5.toolbar)), r2.push(i2);
            }), r2;
          }, e3;
        }(), Kn = function() {
          function e3(e4) {
            var t3 = this;
            this.composingLock = false, this.commentIds = [];
            var n2 = document.createElement("div");
            n2.className = "vditor-wysiwyg", n2.innerHTML = '<pre class="vditor-reset" placeholder="' + e4.options.placeholder + '"\n contenteditable="true" spellcheck="false"></pre>\n<div class="vditor-panel vditor-panel--none"></div>\n<div class="vditor-panel vditor-panel--none">\n    <button type="button" aria-label="' + window.VditorI18n.comment + '" class="vditor-icon vditor-tooltipped vditor-tooltipped__n">\n        <svg><use xlink:href="#vditor-icon-comment"></use></svg>\n    </button>\n</div>', this.element = n2.firstElementChild, this.popover = n2.firstElementChild.nextElementSibling, this.selectPopover = n2.lastElementChild, this.bindEvent(e4), Se(e4, this.element), Le(e4, this.element), Te(e4, this.element), xe(e4, this.element), He(e4, this.element), Me(e4, this.element), Ce(e4, this.element, this.copy), Ae(e4, this.element, this.copy), e4.options.comment.enable && (this.selectPopover.querySelector("button").onclick = function() {
              var n3, r2, o2 = Lute.NewNodeID(), a2 = getSelection().getRangeAt(0), l2 = a2.cloneRange(), s2 = a2.extractContents(), d2 = false, c2 = false;
              s2.childNodes.forEach(function(e5, t4) {
                var i2 = false;
                if (3 === e5.nodeType ? i2 = true : e5.classList.contains("vditor-comment") ? e5.classList.contains("vditor-comment") && e5.setAttribute("data-cmtids", e5.getAttribute("data-cmtids") + " " + o2) : i2 = true, i2) if (3 !== e5.nodeType && "0" === e5.getAttribute("data-block") && 0 === t4 && l2.startOffset > 0) e5.innerHTML = '<span class="vditor-comment" data-cmtids="' + o2 + '">' + e5.innerHTML + "</span>", n3 = e5;
                else if (3 !== e5.nodeType && "0" === e5.getAttribute("data-block") && t4 === s2.childNodes.length - 1 && l2.endOffset < l2.endContainer.textContent.length) e5.innerHTML = '<span class="vditor-comment" data-cmtids="' + o2 + '">' + e5.innerHTML + "</span>", r2 = e5;
                else if (3 !== e5.nodeType && "0" === e5.getAttribute("data-block")) 0 === t4 ? d2 = true : t4 === s2.childNodes.length - 1 && (c2 = true), e5.innerHTML = '<span class="vditor-comment" data-cmtids="' + o2 + '">' + e5.innerHTML + "</span>";
                else {
                  var a3 = document.createElement("span");
                  a3.classList.add("vditor-comment"), a3.setAttribute("data-cmtids", o2), e5.parentNode.insertBefore(a3, e5), a3.appendChild(e5);
                }
              });
              var u2 = (0, y.F9)(l2.startContainer);
              u2 && (n3 ? (u2.insertAdjacentHTML("beforeend", n3.innerHTML), n3.remove()) : "" === u2.textContent.trim().replace(i.g.ZWSP, "") && d2 && u2.remove());
              var p2 = (0, y.F9)(l2.endContainer);
              p2 && (r2 ? (p2.insertAdjacentHTML("afterbegin", r2.innerHTML), r2.remove()) : "" === p2.textContent.trim().replace(i.g.ZWSP, "") && c2 && p2.remove()), a2.insertNode(s2), e4.options.comment.add(o2, a2.toString(), t3.getComments(e4, true)), Q(e4, { enableAddUndoStack: true, enableHint: false, enableInput: false }), t3.hideComment();
            });
          }
          return e3.prototype.getComments = function(e4, t3) {
            var n2 = this;
            if (void 0 === t3 && (t3 = false), "wysiwyg" !== e4.currentMode || !e4.options.comment.enable) return [];
            this.commentIds = [], this.element.querySelectorAll(".vditor-comment").forEach(function(e5) {
              n2.commentIds = n2.commentIds.concat(e5.getAttribute("data-cmtids").split(" "));
            }), this.commentIds = Array.from(new Set(this.commentIds));
            var r2 = [];
            return t3 ? (this.commentIds.forEach(function(e5) {
              r2.push({ id: e5, top: n2.element.querySelector('.vditor-comment[data-cmtids="' + e5 + '"]').offsetTop });
            }), r2) : void 0;
          }, e3.prototype.triggerRemoveComment = function(e4) {
            var t3, n2, r2;
            if ("wysiwyg" === e4.currentMode && e4.options.comment.enable && e4.wysiwyg.commentIds.length > 0) {
              var i2 = JSON.parse(JSON.stringify(this.commentIds));
              this.getComments(e4);
              var o2 = (t3 = i2, n2 = this.commentIds, r2 = new Set(n2), t3.filter(function(e5) {
                return !r2.has(e5);
              }));
              o2.length > 0 && e4.options.comment.remove(o2);
            }
          }, e3.prototype.showComment = function() {
            var e4 = (0, D.Ny)(this.element);
            this.selectPopover.setAttribute("style", "left:" + e4.left + "px;display:block;top:" + Math.max(-8, e4.top - 21) + "px");
          }, e3.prototype.hideComment = function() {
            this.selectPopover.setAttribute("style", "display:none");
          }, e3.prototype.unbindListener = function() {
            window.removeEventListener("scroll", this.scrollListener);
          }, e3.prototype.copy = function(e4, t3) {
            var n2 = getSelection().getRangeAt(0);
            if ("" !== n2.toString()) {
              e4.stopPropagation(), e4.preventDefault();
              var r2 = (0, y.lG)(n2.startContainer, "CODE"), i2 = (0, y.lG)(n2.endContainer, "CODE");
              if (r2 && i2 && i2.isSameNode(r2)) {
                var o2 = "";
                return o2 = "PRE" === r2.parentElement.tagName ? n2.toString() : "`" + n2.toString() + "`", e4.clipboardData.setData("text/plain", o2), void e4.clipboardData.setData("text/html", "");
              }
              var a2 = (0, y.lG)(n2.startContainer, "A"), l2 = (0, y.lG)(n2.endContainer, "A");
              if (a2 && l2 && l2.isSameNode(a2)) {
                var s2 = a2.getAttribute("title") || "";
                return s2 && (s2 = ' "' + s2 + '"'), e4.clipboardData.setData("text/plain", "[" + n2.toString() + "](" + a2.getAttribute("href") + s2 + ")"), void e4.clipboardData.setData("text/html", "");
              }
              var d2 = document.createElement("div");
              d2.appendChild(n2.cloneContents()), e4.clipboardData.setData("text/plain", t3.lute.VditorDOM2Md(d2.innerHTML).trim()), e4.clipboardData.setData("text/html", "");
            }
          }, e3.prototype.bindEvent = function(e4) {
            var t3 = this;
            this.unbindListener(), window.addEventListener("scroll", this.scrollListener = function() {
              if (v(e4, ["hint"]), "block" === t3.popover.style.display && "block" === t3.selectPopover.style.display) {
                var n2 = parseInt(t3.popover.getAttribute("data-top"), 10);
                if ("auto" === e4.options.height) {
                  if (e4.options.toolbarConfig.pin) {
                    var r2 = Math.max(n2, window.scrollY - e4.element.offsetTop - 8) + "px";
                    "block" === t3.popover.style.display && (t3.popover.style.top = r2), "block" === t3.selectPopover.style.display && (t3.selectPopover.style.top = r2);
                  }
                } else if (e4.options.toolbarConfig.pin && 0 === e4.toolbar.element.getBoundingClientRect().top) {
                  var i2 = Math.max(window.scrollY - e4.element.offsetTop - 8, Math.min(n2 - e4.wysiwyg.element.scrollTop, t3.element.clientHeight - 21)) + "px";
                  "block" === t3.popover.style.display && (t3.popover.style.top = i2), "block" === t3.selectPopover.style.display && (t3.selectPopover.style.top = i2);
                }
              }
            }), this.element.addEventListener("scroll", function() {
              if (v(e4, ["hint"]), e4.options.comment && e4.options.comment.enable && e4.options.comment.scroll && e4.options.comment.scroll(e4.wysiwyg.element.scrollTop), "block" === t3.popover.style.display) {
                var n2 = parseInt(t3.popover.getAttribute("data-top"), 10) - e4.wysiwyg.element.scrollTop, r2 = -8;
                e4.options.toolbarConfig.pin && 0 === e4.toolbar.element.getBoundingClientRect().top && (r2 = window.scrollY - e4.element.offsetTop + r2);
                var i2 = Math.max(r2, Math.min(n2, t3.element.clientHeight - 21)) + "px";
                t3.popover.style.top = i2, t3.selectPopover.style.top = i2;
              }
            }), this.element.addEventListener("paste", function(t4) {
              Mt(e4, t4, { pasteCode: function(t5) {
                var n2 = (0, D.zh)(e4), r2 = document.createElement("template");
                r2.innerHTML = t5, n2.insertNode(r2.content.cloneNode(true));
                var i2 = (0, y.a1)(n2.startContainer, "data-block", "0");
                i2 ? i2.outerHTML = e4.lute.SpinVditorDOM(i2.outerHTML) : e4.wysiwyg.element.innerHTML = e4.lute.SpinVditorDOM(e4.wysiwyg.element.innerHTML), (0, D.ib)(e4.wysiwyg.element, n2);
              } });
            }), this.element.addEventListener("compositionstart", function() {
              t3.composingLock = true;
            }), this.element.addEventListener("compositionend", function(n2) {
              var r2 = (0, b.W)(getSelection().getRangeAt(0).startContainer);
              r2 && "" === r2.textContent ? O(e4) : ((0, d.vU)() || ze(e4, getSelection().getRangeAt(0).cloneRange(), n2), t3.composingLock = false);
            }), this.element.addEventListener("input", function(n2) {
              if ("deleteByDrag" !== n2.inputType && "insertFromDrop" !== n2.inputType) {
                if (t3.preventInput) return t3.preventInput = false, void Q(e4);
                if (t3.composingLock || "‘" === n2.data || "“" === n2.data || "《" === n2.data) Q(e4);
                else {
                  var r2 = getSelection().getRangeAt(0), i2 = (0, y.F9)(r2.startContainer);
                  if (i2 || (te(e4, r2), i2 = (0, y.F9)(r2.startContainer)), i2) {
                    for (var o2 = (0, D.im)(i2, e4.wysiwyg.element, r2).start, l2 = true, s2 = o2 - 1; s2 > i2.textContent.substr(0, o2).lastIndexOf("\n"); s2--) if (" " !== i2.textContent.charAt(s2) && "	" !== i2.textContent.charAt(s2)) {
                      l2 = false;
                      break;
                    }
                    0 === o2 && (l2 = false);
                    var d2 = true;
                    for (s2 = o2 - 1; s2 < i2.textContent.length; s2++) if (" " !== i2.textContent.charAt(s2) && "\n" !== i2.textContent.charAt(s2)) {
                      d2 = false;
                      break;
                    }
                    var c2 = (0, b.W)(getSelection().getRangeAt(0).startContainer);
                    c2 && "" === c2.textContent && (O(e4), c2.remove()), l2 && "code-block" !== i2.getAttribute("data-type") || d2 || dt(i2.innerHTML) || st(i2.innerHTML) && i2.previousElementSibling ? "function" == typeof e4.options.input && e4.options.input(a(e4)) : ("insertParagraph" === n2.inputType && "<p><br></p><p><br></p>" === t3.element.innerHTML && i2.previousElementSibling.remove(), ze(e4, r2, n2));
                  }
                }
              }
            }), this.element.addEventListener("click", function(n2) {
              if ("INPUT" === n2.target.tagName) {
                var r2 = n2.target;
                return r2.checked ? r2.setAttribute("checked", "checked") : r2.removeAttribute("checked"), t3.preventInput = true, void Q(e4);
              }
              if ("IMG" !== n2.target.tagName || n2.target.parentElement.classList.contains("vditor-wysiwyg__preview")) {
                var o2 = (0, y.lG)(n2.target, "A");
                if (o2) return e4.options.link.click ? e4.options.link.click(o2) : e4.options.link.isOpen && window.open(o2.getAttribute("href")), void n2.preventDefault();
                var l2 = (0, D.zh)(e4);
                if (n2.target.isEqualNode(t3.element) && t3.element.lastElementChild && l2.collapsed) {
                  var s2 = t3.element.lastElementChild.getBoundingClientRect();
                  n2.y > s2.top + s2.height && ("P" === t3.element.lastElementChild.tagName && "" === t3.element.lastElementChild.textContent.trim().replace(i.g.ZWSP, "") ? (l2.selectNodeContents(t3.element.lastElementChild), l2.collapse(false)) : (t3.element.insertAdjacentHTML("beforeend", '<p data-block="0">' + i.g.ZWSP + "<wbr></p>"), (0, D.ib)(t3.element, l2)));
                }
                ae(e4);
                var d2 = (0, y.fb)(n2.target, "vditor-wysiwyg__preview");
                d2 || (d2 = (0, y.fb)((0, D.zh)(e4).startContainer, "vditor-wysiwyg__preview")), d2 && ie(d2, e4), I(n2, e4);
              } else "link-ref" === n2.target.getAttribute("data-type") ? se(e4, n2.target) : function(e5, t4) {
                var n3 = e5.target;
                t4.wysiwyg.popover.innerHTML = "";
                var r3 = function() {
                  n3.setAttribute("src", o3.value), n3.setAttribute("alt", s3.value), n3.setAttribute("title", c2.value), "function" == typeof t4.options.input && t4.options.input(a(t4));
                }, i2 = document.createElement("span");
                i2.setAttribute("aria-label", window.VditorI18n.imageURL), i2.className = "vditor-tooltipped vditor-tooltipped__n";
                var o3 = document.createElement("input");
                i2.appendChild(o3), o3.className = "vditor-input", o3.setAttribute("placeholder", window.VditorI18n.imageURL), o3.value = n3.getAttribute("src") || "", o3.oninput = function() {
                  r3();
                }, o3.onkeydown = function(e6) {
                  oe(t4, e6);
                };
                var l3 = document.createElement("span");
                l3.setAttribute("aria-label", window.VditorI18n.alternateText), l3.className = "vditor-tooltipped vditor-tooltipped__n";
                var s3 = document.createElement("input");
                l3.appendChild(s3), s3.className = "vditor-input", s3.setAttribute("placeholder", window.VditorI18n.alternateText), s3.style.width = "52px", s3.value = n3.getAttribute("alt") || "", s3.oninput = function() {
                  r3();
                }, s3.onkeydown = function(e6) {
                  oe(t4, e6);
                };
                var d3 = document.createElement("span");
                d3.setAttribute("aria-label", window.VditorI18n.title), d3.className = "vditor-tooltipped vditor-tooltipped__n";
                var c2 = document.createElement("input");
                d3.appendChild(c2), c2.className = "vditor-input", c2.setAttribute("placeholder", window.VditorI18n.title), c2.value = n3.getAttribute("title") || "", c2.oninput = function() {
                  r3();
                }, c2.onkeydown = function(e6) {
                  oe(t4, e6);
                }, ue(n3, t4), t4.wysiwyg.popover.insertAdjacentElement("beforeend", i2), t4.wysiwyg.popover.insertAdjacentElement("beforeend", l3), t4.wysiwyg.popover.insertAdjacentElement("beforeend", d3), le(t4, n3);
              }(n2, e4);
            }), this.element.addEventListener("keyup", function(t4) {
              if (!t4.isComposing && !(0, d.yl)(t4)) {
                "Enter" === t4.key && _e(e4), "Backspace" !== t4.key && "Delete" !== t4.key || "" === e4.wysiwyg.element.innerHTML || 1 !== e4.wysiwyg.element.childNodes.length || !e4.wysiwyg.element.firstElementChild || "P" !== e4.wysiwyg.element.firstElementChild.tagName || 0 !== e4.wysiwyg.element.firstElementChild.childElementCount || "" !== e4.wysiwyg.element.textContent && "\n" !== e4.wysiwyg.element.textContent || (e4.wysiwyg.element.innerHTML = "");
                var n2 = (0, D.zh)(e4);
                if ("Backspace" === t4.key && (0, d.vU)() && "\n" === n2.startContainer.textContent && 1 === n2.startOffset && (n2.startContainer.textContent = ""), te(e4, n2), ae(e4), "ArrowDown" === t4.key || "ArrowRight" === t4.key || "Backspace" === t4.key || "ArrowLeft" === t4.key || "ArrowUp" === t4.key) {
                  "ArrowLeft" !== t4.key && "ArrowRight" !== t4.key || e4.hint.render(e4);
                  var r2 = (0, y.fb)(n2.startContainer, "vditor-wysiwyg__preview");
                  if (!r2 && 3 !== n2.startContainer.nodeType && n2.startOffset > 0) (o2 = n2.startContainer).classList.contains("vditor-wysiwyg__block") && (r2 = o2.lastElementChild);
                  if (r2) if ("none" !== r2.previousElementSibling.style.display) {
                    var i2 = r2.previousElementSibling;
                    if ("PRE" === i2.tagName && (i2 = i2.firstElementChild), "ArrowDown" === t4.key || "ArrowRight" === t4.key) {
                      var o2, a2 = function(e5) {
                        for (var t5 = e5; t5 && !t5.nextSibling; ) t5 = t5.parentElement;
                        return t5.nextSibling;
                      }(o2 = r2.parentElement);
                      if (a2 && 3 !== a2.nodeType) {
                        var l2 = a2.querySelector(".vditor-wysiwyg__preview");
                        if (l2) return void ie(l2, e4);
                      }
                      if (3 === a2.nodeType) {
                        for (; 0 === a2.textContent.length && a2.nextSibling; ) a2 = a2.nextSibling;
                        n2.setStart(a2, 1);
                      } else n2.setStart(a2.firstChild, 0);
                    } else n2.selectNodeContents(i2), n2.collapse(false);
                  } else "ArrowDown" === t4.key || "ArrowRight" === t4.key ? ie(r2, e4) : ie(r2, e4, false);
                }
              }
            });
          }, e3;
        }(), Fn = /* @__PURE__ */ function() {
          var e3 = function(t3, n2) {
            return e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4) t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
            }, e3(t3, n2);
          };
          return function(t3, n2) {
            function r2() {
              this.constructor = t3;
            }
            e3(t3, n2), t3.prototype = null === n2 ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }();
        const Zn = function(e3) {
          function t3(t4, n2) {
            var r2 = e3.call(this) || this;
            if (r2.version = i.H, "string" == typeof t4) {
              if (n2 ? n2.cache ? n2.cache.id || (n2.cache.id = "vditor" + t4) : n2.cache = { id: "vditor" + t4 } : n2 = { cache: { id: "vditor" + t4 } }, !document.getElementById(t4)) return r2.showErrorTip("Failed to get element by id: " + t4), r2;
              t4 = document.getElementById(t4);
            }
            var o2 = new zn(n2).merge();
            if (o2.i18n) window.VditorI18n = o2.i18n, r2.init(t4, o2);
            else {
              if (!["en_US", "fr_FR", "pt_BR", "ja_JP", "ko_KR", "ru_RU", "sv_SE", "zh_CN", "zh_TW"].includes(o2.lang)) throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
              var a2 = "vditorI18nScript", s2 = a2 + o2.lang;
              document.querySelectorAll('head script[id^="vditorI18nScript"]').forEach(function(e4) {
                e4.id !== s2 && document.head.removeChild(e4);
              }), (0, l.G)(o2.cdn + "/dist/js/i18n/" + o2.lang + ".js", s2).then(function() {
                r2.init(t4, o2);
              }).catch(function(e4) {
                r2.showErrorTip("GET " + o2.cdn + "/dist/js/i18n/" + o2.lang + ".js net::ERR_ABORTED 404 (Not Found)");
              });
            }
            return r2;
          }
          return Fn(t3, e3), t3.prototype.showErrorTip = function(e4) {
            var t4 = new Gt();
            document.body.appendChild(t4.element), t4.show(e4, 0);
          }, t3.prototype.setTheme = function(e4, t4, n2, r2) {
            this.vditor.options.theme = e4, G(this.vditor), t4 && (this.vditor.options.preview.theme.current = t4, (0, W.Z)(t4, r2 || this.vditor.options.preview.theme.path)), n2 && (this.vditor.options.preview.hljs.style = n2, (0, Jt.Y)(n2, this.vditor.options.cdn));
          }, t3.prototype.getValue = function() {
            return a(this.vditor);
          }, t3.prototype.getCurrentMode = function() {
            return this.vditor.currentMode;
          }, t3.prototype.focus = function() {
            "sv" === this.vditor.currentMode ? this.vditor.sv.element.focus() : "wysiwyg" === this.vditor.currentMode ? this.vditor.wysiwyg.element.focus() : "ir" === this.vditor.currentMode && this.vditor.ir.element.focus();
          }, t3.prototype.blur = function() {
            "sv" === this.vditor.currentMode ? this.vditor.sv.element.blur() : "wysiwyg" === this.vditor.currentMode ? this.vditor.wysiwyg.element.blur() : "ir" === this.vditor.currentMode && this.vditor.ir.element.blur();
          }, t3.prototype.disabled = function() {
            v(this.vditor, ["subToolbar", "hint", "popover"]), m(this.vditor.toolbar.elements, i.g.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"])), this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "false");
          }, t3.prototype.enable = function() {
            p(this.vditor.toolbar.elements, i.g.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"])), this.vditor.undo.resetIcon(this.vditor), this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "true");
          }, t3.prototype.getSelection = function() {
            return "wysiwyg" === this.vditor.currentMode ? ke(this.vditor.wysiwyg.element) : "sv" === this.vditor.currentMode ? ke(this.vditor.sv.element) : "ir" === this.vditor.currentMode ? ke(this.vditor.ir.element) : void 0;
          }, t3.prototype.renderPreview = function(e4) {
            this.vditor.preview.render(this.vditor, e4);
          }, t3.prototype.getCursorPosition = function() {
            return (0, D.Ny)(this.vditor[this.vditor.currentMode].element);
          }, t3.prototype.isUploading = function() {
            return this.vditor.upload.isUploading;
          }, t3.prototype.clearCache = function() {
            localStorage.removeItem(this.vditor.options.cache.id);
          }, t3.prototype.disabledCache = function() {
            this.vditor.options.cache.enable = false;
          }, t3.prototype.enableCache = function() {
            if (!this.vditor.options.cache.id) throw new Error("need options.cache.id, see https://ld246.com/article/1549638745630#options");
            this.vditor.options.cache.enable = true;
          }, t3.prototype.html2md = function(e4) {
            return this.vditor.lute.HTML2Md(e4);
          }, t3.prototype.exportJSON = function(e4) {
            return this.vditor.lute.RenderJSON(e4);
          }, t3.prototype.getHTML = function() {
            return jt(this.vditor);
          }, t3.prototype.tip = function(e4, t4) {
            this.vditor.tip.show(e4, t4);
          }, t3.prototype.setPreviewMode = function(e4) {
            zt(e4, this.vditor);
          }, t3.prototype.deleteValue = function() {
            window.getSelection().isCollapsed || document.execCommand("delete", false);
          }, t3.prototype.updateValue = function(e4) {
            document.execCommand("insertHTML", false, e4);
          }, t3.prototype.insertValue = function(e4, t4) {
            void 0 === t4 && (t4 = true);
            var n2 = (0, D.zh)(this.vditor);
            n2.collapse(true);
            var r2 = document.createElement("template");
            r2.innerHTML = e4, n2.insertNode(r2.content.cloneNode(true)), n2.collapse(false), "sv" === this.vditor.currentMode ? (this.vditor.sv.preventInput = true, t4 && U(this.vditor)) : "wysiwyg" === this.vditor.currentMode ? t4 && ze(this.vditor, getSelection().getRangeAt(0)) : "ir" === this.vditor.currentMode && (this.vditor.ir.preventInput = true, t4 && R(this.vditor, getSelection().getRangeAt(0), true));
          }, t3.prototype.setValue = function(e4, t4) {
            var n2 = this;
            void 0 === t4 && (t4 = false), "sv" === this.vditor.currentMode ? (this.vditor.sv.element.innerHTML = "<div data-block='0'>" + this.vditor.lute.SpinVditorSVDOM(e4) + "</div>", je(this.vditor, { enableAddUndoStack: true, enableHint: false, enableInput: false })) : "wysiwyg" === this.vditor.currentMode ? ve(this.vditor, e4, { enableAddUndoStack: true, enableHint: false, enableInput: false }) : (this.vditor.ir.element.innerHTML = this.vditor.lute.Md2VditorIRDOM(e4), this.vditor.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(e5) {
              N(e5, n2.vditor);
            }), At(this.vditor, { enableAddUndoStack: true, enableHint: false, enableInput: false })), this.vditor.outline.render(this.vditor), e4 || (v(this.vditor, ["emoji", "headings", "submenu", "hint"]), this.vditor.wysiwyg.popover && (this.vditor.wysiwyg.popover.style.display = "none"), this.clearCache()), t4 && this.clearStack();
          }, t3.prototype.clearStack = function() {
            this.vditor.undo.clearStack(this.vditor), this.vditor.undo.addToUndoStack(this.vditor);
          }, t3.prototype.destroy = function() {
            this.vditor.element.innerHTML = this.vditor.originalInnerHTML, this.vditor.element.classList.remove("vditor"), this.vditor.element.removeAttribute("style");
            var e4 = document.getElementById("vditorIconScript");
            e4 && e4.remove(), this.clearCache(), F(), this.vditor.wysiwyg.unbindListener();
          }, t3.prototype.getCommentIds = function() {
            return "wysiwyg" !== this.vditor.currentMode ? [] : this.vditor.wysiwyg.getComments(this.vditor, true);
          }, t3.prototype.hlCommentIds = function(e4) {
            if ("wysiwyg" === this.vditor.currentMode) {
              var t4 = function(t5) {
                t5.classList.remove("vditor-comment--hover"), e4.forEach(function(e5) {
                  t5.getAttribute("data-cmtids").indexOf(e5) > -1 && t5.classList.add("vditor-comment--hover");
                });
              };
              this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(e5) {
                t4(e5);
              }), "none" !== this.vditor.preview.element.style.display && this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(e5) {
                t4(e5);
              });
            }
          }, t3.prototype.unHlCommentIds = function(e4) {
            if ("wysiwyg" === this.vditor.currentMode) {
              var t4 = function(t5) {
                e4.forEach(function(e5) {
                  t5.getAttribute("data-cmtids").indexOf(e5) > -1 && t5.classList.remove("vditor-comment--hover");
                });
              };
              this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(e5) {
                t4(e5);
              }), "none" !== this.vditor.preview.element.style.display && this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(e5) {
                t4(e5);
              });
            }
          }, t3.prototype.removeCommentIds = function(e4) {
            var t4 = this;
            if ("wysiwyg" === this.vditor.currentMode) {
              var n2 = function(e5, n3) {
                var r2 = e5.getAttribute("data-cmtids").split(" ");
                r2.find(function(e6, t5) {
                  if (e6 === n3) return r2.splice(t5, 1), true;
                }), 0 === r2.length ? (e5.outerHTML = e5.innerHTML, (0, D.zh)(t4.vditor).collapse(true)) : e5.setAttribute("data-cmtids", r2.join(" "));
              };
              e4.forEach(function(e5) {
                t4.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(t5) {
                  n2(t5, e5);
                }), "none" !== t4.vditor.preview.element.style.display && t4.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(t5) {
                  n2(t5, e5);
                });
              }), Q(this.vditor, { enableAddUndoStack: true, enableHint: false, enableInput: false });
            }
          }, t3.prototype.init = function(e4, t4) {
            var n2 = this;
            this.vditor = { currentMode: t4.mode, element: e4, hint: new Ot(t4.hint.extend), lute: void 0, options: t4, originalInnerHTML: e4.innerHTML, outline: new qt(window.VditorI18n.outline), tip: new Gt() }, this.vditor.sv = new Wt(this.vditor), this.vditor.undo = new Wn(), this.vditor.wysiwyg = new Kn(this.vditor), this.vditor.ir = new It(this.vditor), this.vditor.toolbar = new Vn(this.vditor), t4.resize.enable && (this.vditor.resize = new Ut(this.vditor)), this.vditor.toolbar.elements.devtools && (this.vditor.devtools = new s()), (t4.upload.url || t4.upload.handler) && (this.vditor.upload = new We()), (0, l.G)(t4._lutePath || t4.cdn + "/dist/js/lute/lute.min.js", "vditorLuteScript").then(function() {
              n2.vditor.lute = (0, Rt.X)({ autoSpace: n2.vditor.options.preview.markdown.autoSpace, gfmAutoLink: n2.vditor.options.preview.markdown.gfmAutoLink, codeBlockPreview: n2.vditor.options.preview.markdown.codeBlockPreview, emojiSite: n2.vditor.options.hint.emojiPath, emojis: n2.vditor.options.hint.emoji, fixTermTypo: n2.vditor.options.preview.markdown.fixTermTypo, footnotes: n2.vditor.options.preview.markdown.footnotes, headingAnchor: false, inlineMathDigit: n2.vditor.options.preview.math.inlineDigit, linkBase: n2.vditor.options.preview.markdown.linkBase, linkPrefix: n2.vditor.options.preview.markdown.linkPrefix, listStyle: n2.vditor.options.preview.markdown.listStyle, mark: n2.vditor.options.preview.markdown.mark, mathBlockPreview: n2.vditor.options.preview.markdown.mathBlockPreview, paragraphBeginningSpace: n2.vditor.options.preview.markdown.paragraphBeginningSpace, sanitize: n2.vditor.options.preview.markdown.sanitize, toc: n2.vditor.options.preview.markdown.toc }), n2.vditor.preview = new Vt(n2.vditor), function(e5) {
                e5.element.innerHTML = "", e5.element.classList.add("vditor"), e5.options.rtl && e5.element.setAttribute("dir", "rtl"), G(e5), (0, W.Z)(e5.options.preview.theme.current, e5.options.preview.theme.path), "number" == typeof e5.options.height ? e5.element.style.height = e5.options.height + "px" : e5.element.style.height = e5.options.height, "number" == typeof e5.options.minHeight && (e5.element.style.minHeight = e5.options.minHeight + "px"), "number" == typeof e5.options.width ? e5.element.style.width = e5.options.width + "px" : e5.element.style.width = e5.options.width, e5.element.appendChild(e5.toolbar.element);
                var t5 = document.createElement("div");
                if (t5.className = "vditor-content", "left" === e5.options.outline.position && t5.appendChild(e5.outline.element), t5.appendChild(e5.wysiwyg.element.parentElement), t5.appendChild(e5.sv.element), t5.appendChild(e5.ir.element.parentElement), t5.appendChild(e5.preview.element), e5.toolbar.elements.devtools && t5.appendChild(e5.devtools.element), "right" === e5.options.outline.position && (e5.outline.element.classList.add("vditor-outline--right"), t5.appendChild(e5.outline.element)), e5.upload && t5.appendChild(e5.upload.element), e5.options.resize.enable && t5.appendChild(e5.resize.element), t5.appendChild(e5.hint.element), t5.appendChild(e5.tip.element), e5.element.appendChild(t5), t5.addEventListener("click", function() {
                  v(e5, ["subToolbar"]);
                }), e5.toolbar.elements.export && e5.element.insertAdjacentHTML("beforeend", '<iframe id="vditorExportIframe" style="width: 100%;height: 0;border: 0"></iframe>'), we(e5, e5.options.mode, X(e5)), document.execCommand("DefaultParagraphSeparator", false, "p"), navigator.userAgent.indexOf("iPhone") > -1 && void 0 !== window.visualViewport) {
                  var n3 = false, r2 = function(t6) {
                    n3 || (n3 = true, requestAnimationFrame(function() {
                      n3 = false;
                      var t7 = e5.toolbar.element;
                      t7.style.transform = "none", t7.getBoundingClientRect().top < 0 && (t7.style.transform = "translate(0, " + -t7.getBoundingClientRect().top + "px)");
                    }));
                  };
                  window.visualViewport.addEventListener("scroll", r2), window.visualViewport.addEventListener("resize", r2);
                }
              }(n2.vditor), t4.after && t4.after(), t4.icon && (0, l.J)(t4.cdn + "/dist/js/icons/" + t4.icon + ".js", "vditorIconScript");
            });
          }, t3;
        }(t2.default);
      })(), r = r.default;
    })());
  }
});
export default require_index_min();
//# sourceMappingURL=vditor.js.map
