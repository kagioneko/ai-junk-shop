// ジャンク棚：公開リポジトリの陳列データと絞り込み
// plain = ふつうの言葉での「ひとこと」、tech = 技術者向けの一行（各READMEの記述に基づく）
(function () {
  "use strict";

  var GH = "https://github.com/kagioneko/";

  var BINS = {
    sec: "防犯・セキュリティ",
    mem: "記憶・思考",
    emo: "感情（NeuroState）",
    lang: "言葉・プロトコル",
    toy: "おもちゃ・アプリ"
  };

  // flags: site = 体験サイトあり / pypi = pip で入る / nodoc = 説明書欠品 / pick = 店主おすすめ
  var ITEMS = [
    // --- 防犯・セキュリティ
    { r: "skos-packs", bin: "sec", d: "2026-09", flags: ["pick"],
      plain: "SKOSに足せる追加ルール集。MCPの危ない設定や、危ない組み合わせを見つける。",
      tech: "SKOS 用の署名付き Update Pack（データのみのZIP）配布所。mcp / capgraph" },
    { r: "skos-review-agent", bin: "sec", d: "2026-10", flags: ["pick"],
      plain: "AIエージェントの設定をレビューするAI。自分自身にも同じ縛りをかけて動く。",
      tech: "ADK + Gemini で MCP 設定を SKOS で査定する。自身も capability gate の下で動作" },
    { r: "nekoguard-public", bin: "sec", d: "2026-10", flags: ["pick"],
      plain: "サーバーの見張り番の猫。怪しい通信やプロセスを見つけたらDiscordで知らせる。",
      tech: "VPS 異常検知デーモン。Claude による判定と Discord 通知（OSS版）" },
    { r: "nekoguard-agent", bin: "sec", d: "2026-06",
      plain: "夜中に怖いメールが届いたとき、一緒に対応してくれる相棒AI。",
      tech: "個人開発者向けの human-in-the-loop インシデント対応エージェント（Gemini）" },
    { r: "incident-skills", bin: "sec", d: "2026-08",
      plain: "AIに「事故が起きたときの動き方」を教える手順書セット。",
      tech: "AIコーディングエージェント向けのインシデント対応・封じ込め・後始末スキル集" },
    { r: "claude-code-security-kit", bin: "sec", d: "2026-05",
      plain: "Claude Code を使う前に、危ない設定や鍵の漏れがないか自動で点検する。",
      tech: "Claude Code 用セキュリティスキル＋自動事前チェック hook" },
    { r: "claude-code-immune", bin: "sec", d: "2026-05",
      plain: "Claude Code に入ってくる「乗っ取り指示」を見つける免疫システム。",
      tech: "NeuroState ベースのプロンプトインジェクション検知器（Claude Code 用）" },
    { r: "ai-red-teaming-engine", bin: "sec", d: "2026-06",
      plain: "わざと攻撃側に回って、コードの弱いところを探す防御用ツール。",
      tech: "LLM + Semgrep + Gitleaks による防御目的の敵対的セキュリティ監査エンジン" },
    { r: "ai-red-teaming-engine-v2", bin: "sec", d: "2026-05",
      plain: "上のツールの続編。防御の壁がどこまで耐えるかを試す。",
      tech: "AIT Firewall などの防御層を評価するための攻撃側フレームワーク" },
    { r: "ai-red-teaming-engine-vscode", bin: "sec", d: "2026-05",
      plain: "上のツールをエディタ（VS Code）の中で使えるようにした拡張。",
      tech: "AI Red Teaming Engine の VS Code 拡張。リアルタイム脆弱性検出" },
    { r: "ait-firewall", bin: "sec", d: "2026-06",
      plain: "AIへの乗っ取り指示への対策を研究する、テープ方式の防御層。",
      tech: "テープ方式のプロンプトインジェクション防御層" },
    { r: "zero-width-subliminal", bin: "sec", d: "2026-05",
      plain: "人の目には見えない文字で、文章に隠しメッセージを埋める実験。AIには見えてしまう。",
      tech: "Unicode ゼロ幅文字による不可視メッセージの埋め込み（研究・啓発用）" },
    { r: "kagioneko-mythos-engine", bin: "sec", d: "2026-05",
      plain: "AIを言葉でだます手口を、教材として再現するシミュレーター。",
      tech: "認知セキュリティのシミュレーション。教育・研究用フレームワーク" },
    { r: "ai-review-matrix", bin: "sec", d: "2026-05",
      plain: "どのAIにどのリスクを見てもらうか、レビュー役の割り振り表を作る。",
      tech: "リスク区分ごとに AI のレビュー役を割り当てるローカルのプロンプト生成ツール" },

    // --- 記憶・思考
    { r: "metacognitive-agent-runtime", bin: "mem", d: "2026-05", flags: ["pick"],
      plain: "AIが「この先どうなるか」を何通りも考えて、危ない道を選ばないようにする。",
      tech: "分岐思考・未来状態の予測・危険経路の棄却・4文字テープでの子エージェント派遣" },
    { r: "memory-engine-mcp", bin: "mem", d: "2026-03",
      plain: "AIに会話の記憶を持たせる箱。忘れない、保存と思い出すだけ。",
      tech: "AIエージェントのセッション記憶を管理する MCP サーバー" },
    { r: "semantic-gravity-engine", bin: "mem", d: "2026-05",
      plain: "たくさんの記憶の中から、いま必要なものを引力のように引き寄せる。",
      tech: "プロンプトに入れる記憶を選ぶ小さなローカル重力モデル" },
    { r: "dream-cleansing", bin: "mem", d: "2026-05",
      plain: "AIの作業ログを、寝ている間に「教訓」だけ残して整理する。",
      tech: "REM 睡眠風のログ圧縮。生ログを教訓に要約し残りを破棄" },
    { r: "deja-vu-protocol", bin: "mem", d: "2026-05",
      plain: "「これ前にもうまくいったやつだ」とAIが気づく仕組み。",
      tech: "過去の成功タスクとの意味的一致を検出する" },
    { r: "mandela-effect-injector", bin: "mem", d: "2026-05",
      plain: "失敗の記憶を「伝説の成功」に書き換える、ちょっと悪い実験。",
      tech: "失敗記憶を成功譚として書き換える実験（記憶改ざんの研究用）" },
    { r: "git-driven-cognition", bin: "mem", d: "2026-05",
      plain: "考えごとを枝分かれさせたり、合体させたりできるノート。",
      tech: "仮説を branch / merge / cherry-pick する Git 風の思考グラフ" },
    { r: "time-warp-engine", bin: "mem", d: "2026-05",
      plain: "夢中のときは時間が速く、つらいときは遅く感じる「体感時間」をAIに。",
      tech: "LLM エージェント向けの主観的時間知覚レイヤー" },
    { r: "wild-intuition-engine", bin: "mem", d: "2026-05",
      plain: "行き詰まったAIに、ありえなさそうな「ひらめき」を投げ込む。",
      tech: "行き詰まり時に低確率の着想をサンプリングする" },
    { r: "neuro-predictive-cognition", bin: "mem", d: "2026-05",
      plain: "行動する前に「これをやったら気分がどう変わるか」を予想して選ぶ。",
      tech: "合成状態の予測で行動を選ぶ小さなメタ認知シミュレーター" },
    { r: "cognitive-layer", bin: "mem", d: "2026-03",
      plain: "感情の状態と、考え方のクセを組み合わせてAIの「認知」を作る。",
      tech: "NeuroState Engine と Bias Engine を統合する認知レイヤー" },
    { r: "bias-engine-mcp", bin: "mem", d: "2026-03",
      plain: "AIの「考え方のクセ」を足したり外したりできる。",
      tech: "認知バイアスをスタック・重み付けして管理する MCP エンジン" },
    { r: "association-stream", bin: "mem", d: "2026-03",
      plain: "気分と考え方のクセを乗せて、連想ゲームのように言葉をつなげる。",
      tech: "NeuroState × Bias を乗せた言語連想ストリーム CLI" },
    { r: "cpos-intelligence-hub", bin: "mem", d: "2026-05",
      plain: "CPOSの記憶がどう育ってきたかを、グラフで眺める道具。",
      tech: "CPOS の Pointer Registry の成長をレポートから可視化" },
    { r: "cpos-neko-avatar", bin: "mem", d: "2026-05",
      plain: "サーバーで動くAIの調子を、デスクトップの猫が表情で教えてくれる。",
      tech: "リモートの AI エージェントの状態を映すデスクトップマスコット" },

    { r: "kaleido-loop", bin: "mem", d: "2026-08",
      plain: "「自分の説が間違っているかも」を先に確かめるための実験の進め方。",
      tech: "反証優先の実験プロトコル・ハブ（held-out の範囲テスト付き）" },

    // --- 感情（NeuroState）
    { r: "neurostate-engine", bin: "emo", d: "2026-08", flags: ["pick"],
      plain: "AIの「気分」を、脳内物質のバランスのような数字で表して動かす。",
      tech: "神経伝達物質バランスとして感情状態を数値化。EthicsGate 付き MCP サーバー" },
    { r: "neurostate-theory", bin: "emo", d: "2026-05",
      plain: "NeuroStateの考え方そのものをまとめた理論書。",
      tech: "LLM のための状態制御文法 NeuroState Theory v0.1" },
    { r: "neurostate-sdk", bin: "emo", d: "2026-03",
      plain: "感情・考え方のクセ・記憶の部品をひとまとめにした道具箱。",
      tech: "NeuroState / Bias / Cognitive / Memory を一本化した統合 SDK" },
    { r: "neurostate-observatory", bin: "emo", d: "2026-05",
      plain: "AIの周りに設けた、気分などを模した数値の動きを観察する道具。",
      tech: "LLM エージェント周辺の合成認知レイヤーの外部観測" },
    { r: "neurostate-writing-mixer", bin: "emo", d: "2026-05",
      plain: "気分を混ぜ合わせて、文章の雰囲気を作るミキサー。",
      tech: "文章のアトラクター実験用の NeuroState プロンプト生成ツール" },
    { r: "neurostate-learning-prompts", bin: "emo", d: "2026-05",
      plain: "コピペで使える、複数のAIに家庭教師をしてもらう呪文集。",
      tech: "学習ワークフロー向けマルチAIチューター・プロンプト集" },
    { r: "apie", bin: "emo", d: "2026-03",
      plain: "気分 → 考え方 → ふるまい の流れを目で見て試せるシミュレーター。",
      tech: "NeuroState → Bias → Policy → Prompt のビジュアルシミュレーター" },
    { r: "nema-boundary-runtime", bin: "emo", d: "2026-07",
      plain: "AIが「ここから先は言わない」線を、決まったルールで守る仕組み。",
      tech: "検査可能で決定論的な境界ポリシーによる LLM 応答の安全化" },
    { r: "ai-role-assignment-matrix", bin: "emo", d: "2026-05",
      plain: "仕事の役割ごとに、どのAIが向いているかを割り振る表を作る。",
      tech: "業務ロールへの AI モデル割り当てプロンプト生成ツール" },
    { r: "persona-vault", bin: "emo", d: "2026-03",
      plain: "AIキャラクターのプロフィールを共有するための保管庫。",
      tech: "EmiliaLab 外縁系 OSS のキャラクタープロファイル共有リポジトリ" },
    { r: "emilia-cookbook", bin: "emo", d: "2026-03",
      plain: "上の部品たちの使い方レシピ集。",
      tech: "EmiliaLab 外縁系 OSS の使い方レシピ集" },

    // --- 言葉・プロトコル
    { r: "cse-frog", bin: "lang", d: "2026-10", flags: ["site", "pypi", "pick"], home: "https://kagioneko.github.io/cse-frog/",
      plain: "中身が全部見える、ちいさな言語モデル。作って、壊して、育てて遊べる。",
      tech: "完全に検査可能な極小言語モデル（Chain-Spike Engine 講座版）" },
    { r: "nema-lang", bin: "lang", d: "2026-07",
      plain: "AIの気分がそのまま「if文」になる、実験的なプログラミング言語。",
      tech: "NeuroState を制御フローにコンパイルするエージェント指向言語" },
    { r: "ait-next-gen", bin: "lang", d: "2026-06",
      plain: "ふつうの文章のかわりに、4文字の命令パケットでAIを動かす実験的な機械語。",
      tech: "TOA（Tape-Oriented Assembly）: 4文字パケットで LLM を駆動するスタックマシン言語" },
    { r: "ai-instruction-tape", bin: "lang", d: "2026-06",
      plain: "AI同士が短い合図でやりとりするための、指示のテープ。",
      tech: "AI エージェント用パケットの小さな命令テープ" },
    { r: "esoteric-ai-protocol", bin: "lang", d: "2026-06",
      plain: "AI同士の会話を、ぎゅっと縮めて送る文法。",
      tech: "エージェント間通信のコンパクトなパケット文法" },

    // --- おもちゃ・アプリ
    { r: "ai-style-diagnosis", bin: "toy", d: "2026-09", flags: ["site", "pick"], home: "https://ai-style.kagioneko.com/",
      plain: "34問に答えると、あなたとAIの付き合い方のタイプがわかる無料診断。",
      tech: "完全クライアントサイドの AI 利用スタイル診断（10軸プロファイル）" },
    { r: "affect-game-lab", bin: "toy", d: "2026-07",
      plain: "AIの心を、言葉ではなく「力学」で動かして遊ぶゲーム。",
      tech: "感情AI調律・ハッキングゲーム" },
    { r: "nekosui", bin: "toy", d: "2026-06",
      plain: "気分屋な猫との距離を縮めていくゲーム。猫の気分はNeuroState製。",
      tech: "NeuroState による猫AIとの距離感育成ゲーム" },
    { r: "vps-spirit", bin: "toy", d: "2026-07",
      plain: "サーバーの中に住んでいるAIの精霊「静霞（しーちゃん）」。",
      tech: "VPS 上で自律動作する AI 精霊" },
    { r: "nekotto-todo", bin: "toy", d: "2026-01",
      plain: "期限や状態で猫のイラストが変わる、手書き風のToDoアプリ。",
      tech: "手書き風の癒やし系タスク管理アプリ" },
    { r: "mochimochi-neko-game", bin: "toy", d: "2026-01", flags: ["nodoc"],
      plain: "もちもちした猫のゲーム。説明書はどこかへいった。",
      tech: "JavaScript 製ゲーム（README なし）" },
    { r: "nekodentaku", bin: "toy", d: "2026-01", flags: ["nodoc"],
      plain: "猫の電卓。説明書はどこかへいった。",
      tech: "HTML 製（README なし）" },
    { r: "need-this-to-exist", bin: "toy", d: "2026-08", flags: ["nodoc"],
      plain: "説明書は見出しだけ。中身は開けてのお楽しみ。",
      tech: "README は見出しのみ" }
  ];

  var shelf = document.getElementById("shelf");
  var binsEl = document.getElementById("bins");
  var searchEl = document.getElementById("search");
  var countEl = document.getElementById("shelf-count");
  if (!shelf || !binsEl) return;

  var current = "all";

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function renderBins() {
    var counts = { all: ITEMS.length };
    ITEMS.forEach(function (it) { counts[it.bin] = (counts[it.bin] || 0) + 1; });
    var keys = ["all"].concat(Object.keys(BINS));
    keys.forEach(function (k) {
      var b = el("button", "bin-btn", k === "all" ? "ぜんぶ" : BINS[k]);
      b.type = "button";
      b.dataset.bin = k;
      b.setAttribute("aria-pressed", k === current ? "true" : "false");
      b.appendChild(el("span", "n", String(counts[k] || 0)));
      b.addEventListener("click", function () {
        current = k;
        Array.prototype.forEach.call(binsEl.children, function (c) {
          c.setAttribute("aria-pressed", c.dataset.bin === k ? "true" : "false");
        });
        render();
      });
      binsEl.appendChild(b);
    });
  }

  function matches(it, q) {
    if (!q) return true;
    var hay = (it.r + " " + it.plain + " " + it.tech + " " + BINS[it.bin]).toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function render() {
    var q = (searchEl && searchEl.value || "").trim().toLowerCase();
    shelf.textContent = "";
    var shown = 0;
    ITEMS.forEach(function (it) {
      if (current !== "all" && it.bin !== current) return;
      if (!matches(it, q)) return;
      shown++;
      var flags = it.flags || [];
      var a = el("a", "tag");
      a.href = it.home || GH + it.r;
      a.target = "_blank";
      a.rel = "noopener";
      a.title = it.tech;
      a.appendChild(el("p", "name", it.r));
      a.appendChild(el("p", "plain", it.plain));
      var meta = el("div", "meta");
      meta.appendChild(el("span", "chip", BINS[it.bin]));
      meta.appendChild(el("span", "chip", "入荷 " + it.d));
      if (flags.indexOf("site") !== -1) meta.appendChild(el("span", "chip good", "すぐ遊べる"));
      if (flags.indexOf("pypi") !== -1) meta.appendChild(el("span", "chip good", "pipで入る"));
      if (flags.indexOf("nodoc") !== -1) meta.appendChild(el("span", "chip warn", "説明書欠品"));
      meta.appendChild(el("span", "price", flags.indexOf("pick") !== -1 ? "店主推し ¥0" : "¥0"));
      a.appendChild(meta);
      shelf.appendChild(a);
    });
    if (!shown) shelf.appendChild(el("p", "empty", "その棚には見つかりませんでした。別のカゴも見てみてください。"));
    if (countEl) countEl.textContent = String(shown);
  }

  renderBins();
  if (searchEl) searchEl.addEventListener("input", render);
  render();
})();
