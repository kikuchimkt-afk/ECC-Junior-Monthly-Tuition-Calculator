// =====================================================================
// ECC Junior Monthly Tuition Calculator - script.js
// =====================================================================

// ----- Pricing Storage Keys -----
const PRICING_KEY = 'eccjr_pricing';
const CUSTOM_DEFAULT_KEY = 'eccjr_pricing_default';
const MATERIAL_KEY = 'eccjr_materials';
const MATERIAL_DEFAULT_KEY = 'eccjr_materials_default';

// ----- Course Data (Default / Mutable) -----
const DEFAULT_COURSES = {
    // === 英語・英会話（クラスコード別） ===
    PT: {
        id: 'PT', name: 'PT 英語・英会話（2・3歳児）',
        detail: '週1回 40分', category: 'eigo',
        ages: ['yoji23'],
        entrance: 5500, monthly: 7700, examFee: 2200,
        materials: { yoji23: 21900 },
        materialItems: [
            { name: 'ストーリーブック（2冊）', price: 0, reusable: true },
            { name: 'I Can Do It!〈しつけ絵本〉', price: 0, reusable: true },
            { name: 'ワークシートセット', price: 0, reusable: false },
            { name: 'ピクチャーカードセット', price: 0, reusable: true },
            { name: '知育お道具セット', price: 0, reusable: true },
            { name: 'アルファベットパズル', price: 0, reusable: true },
            { name: '家庭学習用DVD', price: 0, reusable: true },
            { name: 'ActiveTalk（録音・音声ペン）PT SDカード付き', price: 0, reusable: true },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        addons: [{
            id: 'YT', name: 'まなびのさんぽプラス（YT）', detail: '在籍生のみ', monthlyAdd: 3300, materialsAdd: { yoji23: 5500 },
            materialItemsToAdd: [
                { name: 'メインブック 2・3歳児用', price: 5500, reusable: false }
            ]
        }]
    },
    PB: {
        id: 'PB', name: 'PB 英語・英会話（4・5歳児）',
        detail: '週1回 40分', category: 'eigo',
        ages: ['yoji45'],
        entrance: 5500, monthly: 7700, examFee: 2200,
        materials: { yoji45: 21900 },
        materialItems: [
            { name: 'ストーリーブック（2冊）', price: 3300, reusable: true },
            { name: 'コースブック', price: 2750, reusable: false },
            { name: 'ピクチャーディクショナリー', price: 1320, reusable: true },
            { name: 'ピクチャーカードセット', price: 1870, reusable: true },
            { name: '家庭学習用DVD', price: 2750, reusable: true },
            { name: 'ホームワークシート', price: 770, reusable: false },
            { name: 'ワークシートセット', price: 550, reusable: false },
            { name: 'ActiveTalk（録音・音声ペン）PB SDカード付き', price: 3300, reusable: true },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        addons: [{
            id: 'YB', name: 'まなびのさんぽプラス（YB）', detail: '在籍生のみ', monthlyAdd: 3300, materialsAdd: { yoji45: 7700 },
            materialItemsToAdd: [
                { name: 'メインブック 4・5歳児用', price: 5500, reusable: false },
                { name: 'しゅくだいワーク 4・5歳児用', price: 2200, reusable: false }
            ]
        }]
    },
    PF: {
        id: 'PF', name: 'PF 英語・英会話（小学1〜3年）',
        detail: '週1回 60分', category: 'eigo',
        ages: ['elem_low'],
        entrance: 5500, monthly: 7700, examFee: 2200,
        materials: { elem_low: 19910 },
        materialItems: [
            { name: 'コースブック', price: 3210, reusable: false },
            { name: 'シンク・アンド・トーク', price: 3090, reusable: false },
            { name: 'ピクチャーディクショナリー', price: 1830, reusable: true },
            { name: 'アクティビティカードセット', price: 0, reusable: true },
            { name: 'CDセット', price: 0, reusable: true },
            { name: '家庭学習用DVD', price: 0, reusable: true },
            { name: 'ホームワークシート', price: 1050, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        addons: [{
            id: 'SF', name: '読み書きプラス（SF）', detail: 'スーパーラーニング', monthlyAdd: 4400, materialsAdd: { elem_low: 10270 },
            materialItemsToAdd: [
                { name: 'リーダーズ Level 1', price: 0, reusable: true },
                { name: 'CD Level 1', price: 0, reusable: true },
                { name: 'ダイアリー Level 1', price: 530, reusable: false },
                { name: 'ライティングドリル', price: 2520, reusable: false },
                { name: 'タイムドリル', price: 530, reusable: false }
            ]
        }]
    },
    PI: {
        id: 'PI', name: 'PI 英語・英会話（小学3〜4年 中級）',
        detail: '週1回 60分', category: 'eigo',
        ages: ['elem_low', 'elem_high'],
        entrance: 5500, monthly: 7700, examFee: 2200,
        materials: { elem_low: 17920, elem_high: 17920 },
        materialItems: [
            { name: 'コースブック', price: 3210, reusable: false },
            { name: 'ワードブック', price: 1830, reusable: false },
            { name: 'シンク・アンド・トーク', price: 3090, reusable: false },
            { name: 'アクティビティカードセット', price: 0, reusable: true },
            { name: 'CDセット', price: 0, reusable: true },
            { name: '家庭学習用DVD', price: 0, reusable: true },
            { name: 'ホームワークシート', price: 1050, reusable: false }
        ],
        addons: [{
            id: 'SI', name: '読み書きプラス（SI）', detail: 'スーパーラーニング', monthlyAdd: 4400, materialsAdd: { elem_low: 10270, elem_high: 10270 },
            materialItemsToAdd: [
                { name: 'リーダーズ Level 2', price: 4720, reusable: true },
                { name: 'CD Level 2', price: 0, reusable: true },
                { name: 'ダイアリー Level 2', price: 530, reusable: false },
                { name: 'ライティングドリル', price: 2520, reusable: false },
                { name: 'タイムドリル', price: 530, reusable: false }
            ]
        }]
    },
    PE: {
        id: 'PE', name: 'PE 英語・英会話（小学4〜6年）',
        detail: '週1回 60分', category: 'eigo',
        ages: ['elem_high'],
        entrance: 5500, monthly: 7700, examFee: 2200,
        materials: { elem_high: 19910 },
        materialItems: [
            { name: 'コースブック', price: 3780, reusable: false },
            { name: 'ワードブック', price: 2810, reusable: false },
            { name: 'シンク・アンド・トーク', price: 3360, reusable: false },
            { name: 'ホームワークシート', price: 1050, reusable: false },
            { name: 'CDセット', price: 0, reusable: true },
            { name: '家庭学習用DVD', price: 0, reusable: true },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        addons: [{
            id: 'SE', name: '読み書きプラス（SE）', detail: 'スーパーラーニング', monthlyAdd: 4400, materialsAdd: { elem_high: 10270 },
            materialItemsToAdd: [
                { name: 'リーダーズ Level 2', price: 4720, reusable: true },
                { name: 'CD Level 2', price: 0, reusable: true },
                { name: 'ダイアリー Level 2', price: 530, reusable: false },
                { name: 'ライティングドリル', price: 2520, reusable: false },
                { name: 'タイムドリル', price: 530, reusable: false }
            ]
        }]
    },
    PA: {
        id: 'PA', name: 'PA 英語・英会話（小学5〜6年 上級）',
        detail: '週1回 100分', category: 'eigo',
        ages: ['elem_high'],
        entrance: 5500, monthly: 7700, examFee: 2200,
        materials: { elem_high: 18440 },
        materialItems: [
            { name: 'コースブック', price: 3780, reusable: false },
            { name: 'ワードブック', price: 2810, reusable: false },
            { name: 'シンク・アンド・トーク', price: 3360, reusable: false },
            { name: 'ホームワークシート', price: 1050, reusable: false },
            { name: 'CDセット', price: 4200, reusable: true },
            { name: '家庭学習用DVD', price: 2730, reusable: true },
            { name: 'ウィークリーテスト', price: 530, reusable: false }
        ],
        addons: [{
            id: 'SA', name: '読み書きプラス（SA）', detail: 'スーパーラーニング', monthlyAdd: 4400, materialsAdd: { elem_high: 10270 },
            materialItemsToAdd: [
                { name: 'リーダーズ Level 3', price: 4720, reusable: true },
                { name: 'CD Level 3', price: 2000, reusable: true },
                { name: 'ダイアリー Level 3', price: 530, reusable: false },
                { name: 'ライティングドリル', price: 2520, reusable: false },
                { name: 'タイムドリル', price: 530, reusable: false }
            ]
        }]
    },
    JE: {
        id: 'JE', name: 'JE 英語・英会話（中学1年）',
        detail: '週1回 90分', category: 'eigo',
        ages: ['chu12'],
        entrance: 5500, monthly: 9900, examFee: 0,
        materials: { chu12: 21130 },
        materialItems: [
            { name: 'コースブック', price: 0, reusable: false },
            { name: 'アクセスハンドブック', price: 0, reusable: false },
            { name: 'ボイシズ', price: 0, reusable: false },
            { name: 'リーディングストラテジーズ', price: 0, reusable: false },
            { name: 'ウィークリーテスト', price: 0, reusable: false },
            { name: 'ホームワークブック', price: 0, reusable: false },
            { name: '音声・動画教材', price: 0, reusable: true },
            { name: 'ECC Study Assist（学習支援アプリ）', price: 0, reusable: true },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        addons: [{
            id: '1S', name: '中学英語文法プラス（1S）', detail: 'メインコース受講者のみ', monthlyAdd: 4400, materialsAdd: { chu12: 2930 },
            materialItemsToAdd: [
                { name: 'New Super Basics (1)', price: 2930, reusable: false },
                { name: '中間・期末対策テスト (1)（オプション教材）', price: 880, reusable: false }
            ]
        }]
    },
    JI: {
        id: 'JI', name: 'JI 英語・英会話（中学2年）',
        detail: '週1回 90分', category: 'eigo',
        ages: ['chu12'],
        entrance: 5500, monthly: 9900, examFee: 0,
        materials: { chu12: 21130 },
        materialItems: [
            { name: 'コースブック', price: 0, reusable: false },
            { name: 'アクセスハンドブック', price: 0, reusable: false },
            { name: 'ボイシズ', price: 0, reusable: false },
            { name: 'リーディングストラテジーズ', price: 0, reusable: false },
            { name: 'ウィークリーテスト', price: 0, reusable: false },
            { name: 'ホームワークブック', price: 0, reusable: false },
            { name: '音声・動画教材', price: 0, reusable: true },
            { name: 'ECC Study Assist（学習支援アプリ）', price: 0, reusable: true },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        addons: [{
            id: '2S', name: '中学英語文法プラス（2S）', detail: 'メインコース受講者のみ', monthlyAdd: 4400, materialsAdd: { chu12: 2930 },
            materialItemsToAdd: [
                { name: 'New Super Basics (2)', price: 2930, reusable: false },
                { name: '中間・期末対策テスト (2)（オプション教材）', price: 880, reusable: false }
            ]
        }]
    },
    JA: {
        id: 'JA', name: 'JA 英語・英会話（中学3年）',
        detail: '週1回 90分', category: 'eigo',
        ages: ['chu3'],
        entrance: 5500, monthly: 9900, examFee: 0,
        materials: { chu3: 22450 },
        materialItems: [
            { name: 'コースブック', price: 0, reusable: false },
            { name: 'アクセスハンドブック', price: 0, reusable: false },
            { name: 'ボイシズ', price: 0, reusable: false },
            { name: 'リーディングストラテジーズ', price: 0, reusable: false },
            { name: 'ウィークリーテスト', price: 0, reusable: false },
            { name: 'ホームワークブック', price: 0, reusable: false },
            { name: '音声・動画教材', price: 0, reusable: true },
            { name: '中学英語分野別演習', price: 0, reusable: false },
            { name: 'ECC Study Assist（学習支援アプリ）', price: 0, reusable: true },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        addons: [{
            id: '3S', name: '中学英語文法プラス（3S）', detail: 'メインコース受講者のみ', monthlyAdd: 4400, materialsAdd: { chu3: 2930 },
            materialItemsToAdd: [
                { name: 'New Super Basics (3)', price: 2930, reusable: false },
                { name: '中間・期末対策テスト (3)（オプション教材）', price: 880, reusable: false }
            ]
        }]
    },

    // === 高校生英語 ===
    L1: {
        id: 'L1', name: 'L1 英語（高校1〜2年）',
        detail: '週1回 90分', category: 'high_eigo',
        ages: ['high'],
        entrance: 5500, monthly: 12100, examFee: 0,
        materials: { high: 22880 },
        materialItems: [
            { name: 'COURSEBOOK', price: 0, reusable: false },
            { name: 'Access Handbook', price: 0, reusable: false },
            { name: 'VOICES', price: 0, reusable: false },
            { name: 'READING STRATEGIES', price: 0, reusable: false },
            { name: 'Study Record', price: 0, reusable: false },
            { name: 'Weekly Test', price: 0, reusable: false },
            { name: '音声・動画教材', price: 0, reusable: true },
            { name: 'ECC Study Assist（学習支援アプリ）', price: 0, reusable: true }
        ]
    },
    L2: {
        id: 'L2', name: 'L2 英語（高校2〜3年）',
        detail: '週1回 90分', category: 'high_eigo',
        ages: ['high'],
        entrance: 5500, monthly: 12100, examFee: 0,
        materials: { high: 22880 },
        materialItems: [
            { name: 'COURSEBOOK', price: 0, reusable: false },
            { name: 'Access Handbook', price: 0, reusable: false },
            { name: 'VOICES', price: 0, reusable: false },
            { name: 'READING STRATEGIES', price: 0, reusable: false },
            { name: 'Study Record', price: 0, reusable: false },
            { name: 'Weekly Test', price: 0, reusable: false },
            { name: '音声・動画教材', price: 0, reusable: true },
            { name: 'ECC Study Assist（学習支援アプリ）', price: 0, reusable: true }
        ]
    },

    // === BS ===
    bs_shumi: {
        id: 'bs_shumi', name: '趣味の英会話プラン 基礎〜初級（SP）',
        detail: '社会人', category: 'bs',
        ages: ['adult'],
        entrance: 5500, monthly: 7700, examFee: 0,
        materials: { adult: 10480 },
        materialItems: [
            { name: '教材セット（CD付き）', price: 10480, reusable: false }
        ]
    },
    bs_he: {
        id: 'bs_he', name: '趣味の英会話プラン（HE）',
        detail: '社会人', category: 'bs',
        ages: ['adult'],
        entrance: 5500, monthly: 7700, examFee: 0,
        materials: { adult: 6280 },
        materialItems: [
            { name: 'Textbook（CD付き）', price: 6280, reusable: false }
        ]
    },

    // === 中学英語強化 ===
    '1E': {
        id: '1E', name: '1E 中学英語強化（中学1年）',
        detail: '週1回 90分', category: 'eigo_kyouka',
        ages: ['chu12'],
        entrance: 5500, monthly: 9900, examFee: 0,
        materials: { chu12: 10740 },
        materialItems: [
            { name: 'New Breakthrough 問題集（中1）', price: 2920, reusable: false },
            { name: 'Kワーク（中1）', price: 1870, reusable: false },
            { name: '中間・期末対策テスト（中1）', price: 0, reusable: false },
            { name: 'P.S.ノート', price: 440, reusable: false },
            { name: '音声教材', price: 2640, reusable: true },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        addons: [{
            id: '1S', name: '文法プラス（1S）', detail: 'メインコース受講者のみ', monthlyAdd: 4400, materialsAdd: { chu12: 2930 },
            materialItemsToAdd: [
                { name: 'New Super Basics (1)', price: 2930, reusable: false }
            ]
        }]
    },
    '2E': {
        id: '2E', name: '2E 中学英語強化（中学2年）',
        detail: '週1回 90分', category: 'eigo_kyouka',
        ages: ['chu12'],
        entrance: 5500, monthly: 9900, examFee: 0,
        materials: { chu12: 10740 },
        materialItems: [
            { name: 'New Breakthrough 問題集（中2）', price: 2920, reusable: false },
            { name: 'Kワーク（中2）', price: 1870, reusable: false },
            { name: '中間・期末対策テスト（中2）', price: 0, reusable: false },
            { name: 'P.S.ノート', price: 440, reusable: false },
            { name: '音声教材', price: 2640, reusable: true },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        addons: [{
            id: '2S', name: '文法プラス（2S）', detail: 'メインコース受講者のみ', monthlyAdd: 4400, materialsAdd: { chu12: 2930 },
            materialItemsToAdd: [
                { name: 'New Super Basics (2)', price: 2930, reusable: false }
            ]
        }]
    },
    '3E': {
        id: '3E', name: '3E 中学英語強化（中学3年）',
        detail: '週1回 90分', category: 'eigo_kyouka',
        ages: ['chu3'],
        entrance: 5500, monthly: 9900, examFee: 0,
        materials: { chu3: 10740 },
        materialItems: [
            { name: 'New Breakthrough 問題集（中3）', price: 2920, reusable: false },
            { name: 'Kワーク（中3）', price: 1870, reusable: false },
            { name: '中間・期末対策テスト（中3）', price: 0, reusable: false },
            { name: 'P.S.ノート', price: 440, reusable: false },
            { name: '音声教材', price: 2640, reusable: true },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        addons: [{
            id: '3S', name: '文法プラス（3S）', detail: 'メインコース受講者のみ', monthlyAdd: 4400, materialsAdd: { chu3: 2930 },
            materialItemsToAdd: [
                { name: 'New Super Basics (3)', price: 2930, reusable: false },
                { name: '中学英語分野別演習（オプション教材）', price: 1320, reusable: false }
            ]
        }]
    },

    // === 英検対策 ===
    eiken_taisaku: {
        id: 'eiken_taisaku', name: '英検®対策コース',
        detail: '週1回 60〜90分（5級準備〜3級）', category: 'eiken',
        ages: ['elem_low', 'elem_high', 'chu12', 'chu3'],
        entrance: 5500, monthly: 6600, examFee: 0,
        materials: { elem_low: 16440, elem_high: 18020, chu12: 18020, chu3: 18020 },
        materialItems5J: [
            { name: 'ActiveTalk（録音・音声ペン）5級準備 SDカード付き', price: 0, reusable: true },
            { name: '5級準備 Book 1', price: 0, reusable: false },
            { name: '5級準備 Book 2', price: 0, reusable: false },
            { name: '5級準備 ホームワークシート 1', price: 0, reusable: false },
            { name: '5級準備 ホームワークシート 2', price: 0, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        materialItems: [
            { name: 'ActiveTalk（録音・音声ペン）SDカード付き（級別）', price: 0, reusable: true },
            { name: 'Book 1（級別）', price: 0, reusable: false },
            { name: 'Book 2（級別）', price: 0, reusable: false },
            { name: '直前対策 Book（級別）', price: 0, reusable: false },
            { name: 'ホームワークシート 1（級別）', price: 0, reusable: false },
            { name: 'ホームワークシート 2（級別）', price: 0, reusable: false },
            { name: '直前対策ホームワークシート（級別）', price: 0, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ]
    },
    eiken_chokuzen: {
        id: 'eiken_chokuzen', name: '英検®直前対策コース',
        detail: '短期集中（在籍生のみ）', category: 'eiken',
        ages: ['elem_low', 'elem_high', 'chu12', 'chu3', 'high'],
        entrance: 0, monthly: 0, examFee: 0, isOneTime: true,
        options: [
            { label: '5級・4級・3級（全8回）', price: 12100, materialCost: 8710 },
            { label: '準2級（全10回）', price: 19800, materialCost: 9400 },
            { label: '2級（全10回）', price: 19800, materialCost: 9400 }
        ],
        materials: {},
        materialItems543: [
            { name: 'ActiveTalk（録音・音声ペン）SDカード付き（級別）', price: 0, reusable: true },
            { name: '直前対策 Book（級別）', price: 0, reusable: false },
            { name: '直前対策ホームワークシート（級別）', price: 0, reusable: false }
        ],
        materialItems2P2: [
            { name: 'ActiveTalk（録音・音声ペン）SDカード付き（級別）', price: 0, reusable: true },
            { name: '直前対策 Book（級別）／解答・解説リスニングスクリプト小冊子付き／ActiveTalk Bonus Booklet 小冊子付き', price: 0, reusable: false },
            { name: '単熟語完成 Book（級別）', price: 0, reusable: false }
        ]
    },

    // === さんすう・計算 ===
    sansu: {
        id: 'sansu', name: 'さんすう・計算コース',
        detail: '週1回 or 週2回', category: 'sansu',
        ages: ['yoji45', 'elem_low', 'elem_high'],
        entrance: 5500, examFee: 0,
        weeklyOptions: [
            { label: '週1回（Lv1準備〜Lv5）', monthly: 5500, materialCost: 6190 },
            { label: '週1回（Lv6）', monthly: 5500, materialCost: 5660 },
            { label: '週2回', monthly: 7700, materialCost: 3040 }
        ],
        materials: {},
        materialItemsLv1to5: [
            { name: 'ステップ・アルファ（プリント）', price: 0, reusable: false },
            { name: '計算ワーク（レベル別）', price: 0, reusable: false },
            { name: '計算プリント管理ファイルセット', price: 0, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        materialItemsLv6: [
            { name: 'ステップ・アルファ（プリント）', price: 0, reusable: false },
            { name: '計算ワーク Lv6', price: 0, reusable: false },
            { name: '計算プリント管理ファイルセット', price: 0, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        materialItems2kai: [
            { name: 'ステップ・アルファ（プリント）', price: 0, reusable: false },
            { name: '計算プリント管理ファイルセット', price: 0, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ]
    },

    // === 数学・思考力 ===
    sugaku: {
        id: 'sugaku', name: '数学・思考力コース',
        detail: '週1回 90分', category: 'sugaku',
        ages: ['chu12', 'chu3'],
        entrance: 5500, monthly: 8800, examFee: 0,
        materials: { chu12: 7440, chu3: 7960 },
        materialItems: [
            { name: 'ハイロード', price: 2830, reusable: false },
            { name: 'ハイロードワーク', price: 2620, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        materialItemsChu3: [
            { name: 'ハイロード（中3）', price: 2830, reusable: false },
            { name: 'ハイロードワーク（中3）', price: 2620, reusable: false },
            { name: '入試問題研究', price: 520, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        addons: [{
            id: 'sugaku_hokyou', name: '数学特別補強コース', detail: 'メインコース受講者のみ', monthlyAdd: 5500, materialsAdd: { chu12: 2100, chu3: 2100 },
            materialItemsToAdd: [
                { name: 'プログレス', price: 0, reusable: false }
            ]
        }]
    },

    // === かんじ・漢検 ===
    kanji: {
        id: 'kanji', name: 'かんじ・漢検®コース',
        detail: '週1回 30〜50分', category: 'kanji',
        ages: ['yoji45', 'elem_low', 'elem_high', 'chu12', 'chu3', 'high', 'adult'],
        entrance: 5500, monthly: 5500, examFee: 0,
        materials: { yoji45: 3460, elem_low: 3880, elem_high: 4290, chu12: 3880, chu3: 3880, high: 3880, adult: 3880 },
        materialItems10junbi: [
            { name: '漢字プリント', price: 0, reusable: false },
            { name: '10級準備 おてほんブック', price: 0, reusable: false },
            { name: '10級準備 れんしゅうノート', price: 0, reusable: false },
            { name: '漢字プリント管理ファイルセット', price: 0, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        materialItems10: [
            { name: '漢字プリント', price: 0, reusable: false },
            { name: '漢字練習ノート（1冊）', price: 0, reusable: false },
            { name: '漢字プリント管理ファイルセット', price: 0, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        materialItems9: [
            { name: '漢字プリント', price: 0, reusable: false },
            { name: '漢字練習ノート（2冊）', price: 0, reusable: false },
            { name: '漢字プリント管理ファイルセット', price: 0, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        materialItems87: [
            { name: '漢字プリント', price: 0, reusable: false },
            { name: '漢字練習ノート（3冊）', price: 0, reusable: false },
            { name: '漢字プリント管理ファイルセット', price: 0, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        materialItems65: [
            { name: '漢字プリント', price: 0, reusable: false },
            { name: '漢字練習ノート（2冊）', price: 0, reusable: false },
            { name: '漢字プリント管理ファイルセット', price: 0, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ],
        materialItems43jun2: [
            { name: '漢字プリント', price: 0, reusable: false },
            { name: '漢字練習ノート（2冊）', price: 0, reusable: false },
            { name: '漢字プリント管理ファイルセット', price: 0, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ]
    },

    // === すらすらマイプリント ===
    surasura: {
        id: 'surasura', name: 'すらすらマイプリントコース',
        detail: '週1〜4コマ', category: 'surasura',
        ages: ['elem_low', 'elem_high'],
        entrance: 5500, examFee: 0,
        weeklyOptions: [
            { label: '週1コマ', monthly: 6600, materialCost: 1990 },
            { label: '週2コマ', monthly: 8800, materialCost: 1990 },
            { label: '週3コマ', monthly: 11000, materialCost: 1990 },
            { label: '週4コマ', monthly: 13200, materialCost: 1990 }
        ],
        materials: {},
        materialItems: [
            { name: 'すらすらマイプリント', price: 0, reusable: false },
            { name: 'スクールバッグ', price: 1990, reusable: true }
        ]
    },

    // === まなびのさんぽプラス ===
    manabi: {
        id: 'manabi', name: 'まなびのさんぽプラス',
        detail: '在籍生のみ（英語・さんすう・かんじ コース在籍者）', category: 'manabi',
        ages: ['yoji23', 'yoji45'],
        entrance: 0, monthly: 3300, examFee: 0,
        materials: { yoji23: 5500, yoji45: 7700 }
    },

    // --- シニア ---
    senior_eigo: {
        id: 'senior_eigo', name: 'わくわく英語コース（AE）',
        detail: '成人・シニア', category: 'senior',
        ages: ['adult', 'senior'],
        entrance: 5500, monthly: 6600, examFee: 0,
        materials: { adult: 11000, senior: 11000 },
        materialItems: [
            { name: 'Mélange テキスト（CD付き）', price: 0, reusable: false },
            { name: 'ECCの大人が楽しい英語（2巻セット）', price: 0, reusable: false }
        ]
    },
    senior_noukatsu: {
        id: 'senior_noukatsu', name: 'いきいき脳活コース（AB）',
        detail: '成人・シニア', category: 'senior',
        ages: ['adult', 'senior'],
        entrance: 5500, monthly: 6600, examFee: 0,
        materials: { adult: 8800, senior: 8800 },
        materialOptions: [
            { label: '4〜6月受講開始 4冊', materialCost: 8800 },
            { label: '7〜9月受講開始 3冊', materialCost: 6600 },
            { label: '10〜12月受講開始 2冊', materialCost: 4400 },
            { label: '1〜3月受講開始 1冊', materialCost: 2200 }
        ]
    }
};

// Active pricing data (mutable, loaded from localStorage or defaults)
let COURSES = JSON.parse(JSON.stringify(DEFAULT_COURSES));

const AGE_GROUPS = [
    { id: 'yoji23', label: '2・3歳児' },
    { id: 'yoji45', label: '4・5歳児' },
    { id: 'elem_low', label: '小学1〜3年生' },
    { id: 'elem_high', label: '小学4〜6年生' },
    { id: 'chu12', label: '中学1・2年生' },
    { id: 'chu3', label: '中学3年生' },
    { id: 'high', label: '高校生' },
    { id: 'adult', label: '社会人' },
    { id: 'senior', label: 'シニア' }
];

// ----- State -----
const REMARKS_KEY = 'eccjr_remarks';
const ENTRANCE_CONDITIONS_KEY = 'eccjr_entrance_conditions';

const DEFAULT_REMARKS = [
    { text: '月謝は毎月最終授業日までにその翌月分を納入いただきます。', checked: true, custom: false },
    { text: '月半ば（11日〜20日）での入学の場合、月謝は半額となります（開講月4月を除く）。', checked: true, custom: false },
    { text: '在籍生のご家族（同居の2親等まで）が入学される場合は、入学金が全額免除されます。', checked: true, custom: false },
    { text: '一旦納入された入学金・授業料・教材費等は、返金できかねますのでご了承ください。', checked: true, custom: false },
    { text: '1年以内に教室で再受講希望の場合は、入学金を全額免除します。', checked: true, custom: false }
];

const DEFAULT_ENTRANCE_CONDITIONS = {
    half: '',
    full: '在籍生の家族（同居の2親等まで）が入学する場合'
};

function loadRemarks() {
    try {
        const saved = localStorage.getItem(REMARKS_KEY);
        if (saved) return JSON.parse(saved);
    } catch (e) { }
    return DEFAULT_REMARKS.map(r => ({ ...r }));
}

function saveRemarks() {
    localStorage.setItem(REMARKS_KEY, JSON.stringify(state.remarks));
}

function loadEntranceConditions() {
    try {
        const saved = localStorage.getItem(ENTRANCE_CONDITIONS_KEY);
        if (saved) return { ...DEFAULT_ENTRANCE_CONDITIONS, ...JSON.parse(saved) };
    } catch (e) { }
    return { ...DEFAULT_ENTRANCE_CONDITIONS };
}

function saveEntranceConditions() {
    localStorage.setItem(ENTRANCE_CONDITIONS_KEY, JSON.stringify(state.entranceConditions));
}

let state = {
    age: 'elem_low',
    selectedCourses: {},
    entranceType: 'full',
    materialOverrides: {},
    materialItemOverrides: {},
    handmedowns: {},
    studentName: '',
    bagDiscount: 0,
    bagDiscountEnabled: false,
    remarks: [],
    entranceConditions: {}
};

// ----- DOM Cache -----
const $ = id => document.getElementById(id);

// =====================================================================
// Pricing Load / Save / Render / Reset
// =====================================================================

function loadPricing() {
    try {
        const saved = localStorage.getItem(PRICING_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge saved values into COURSES (only overwrite known fields)
            Object.keys(parsed).forEach(id => {
                if (COURSES[id]) {
                    if (parsed[id].entrance !== undefined) COURSES[id].entrance = parsed[id].entrance;
                    if (parsed[id].monthly !== undefined) COURSES[id].monthly = parsed[id].monthly;
                    if (parsed[id].examFee !== undefined) COURSES[id].examFee = parsed[id].examFee;
                    if (parsed[id].materials) COURSES[id].materials = { ...COURSES[id].materials, ...parsed[id].materials };
                    // weeklyOptions
                    if (parsed[id].weeklyOptions && COURSES[id].weeklyOptions) {
                        parsed[id].weeklyOptions.forEach((wo, i) => {
                            if (COURSES[id].weeklyOptions[i]) {
                                if (wo.monthly !== undefined) COURSES[id].weeklyOptions[i].monthly = wo.monthly;
                                if (wo.materialCost !== undefined) COURSES[id].weeklyOptions[i].materialCost = wo.materialCost;
                            }
                        });
                    }
                    // options (one-time)
                    if (parsed[id].options && COURSES[id].options) {
                        parsed[id].options.forEach((opt, i) => {
                            if (COURSES[id].options[i]) {
                                if (opt.price !== undefined) COURSES[id].options[i].price = opt.price;
                                if (opt.materialCost !== undefined) COURSES[id].options[i].materialCost = opt.materialCost;
                            }
                        });
                    }
                    // addons
                    if (parsed[id].addons && COURSES[id].addons) {
                        parsed[id].addons.forEach((addon, i) => {
                            if (COURSES[id].addons[i]) {
                                if (addon.monthlyAdd !== undefined) COURSES[id].addons[i].monthlyAdd = addon.monthlyAdd;
                                if (addon.materialsAdd) COURSES[id].addons[i].materialsAdd = { ...COURSES[id].addons[i].materialsAdd, ...addon.materialsAdd };
                            }
                        });
                    }
                }
            });
        }
    } catch (e) {
        console.error('Failed to load pricing', e);
        COURSES = JSON.parse(JSON.stringify(DEFAULT_COURSES));
    }
}

function extractSaveData() {
    // Extract only the editable numeric fields from COURSES for storage
    const data = {};
    Object.keys(COURSES).forEach(id => {
        const c = COURSES[id];
        const entry = { entrance: c.entrance, monthly: c.monthly, examFee: c.examFee };
        if (c.materials && Object.keys(c.materials).length > 0) entry.materials = { ...c.materials };
        if (c.weeklyOptions) entry.weeklyOptions = c.weeklyOptions.map(wo => ({ monthly: wo.monthly, materialCost: wo.materialCost }));
        if (c.options) entry.options = c.options.map(o => ({ price: o.price, materialCost: o.materialCost }));
        if (c.addons) entry.addons = c.addons.map(a => ({ monthlyAdd: a.monthlyAdd, materialsAdd: { ...a.materialsAdd } }));
        data[id] = entry;
    });
    return data;
}

function renderPricingModal() {
    const container = $('pricing-tables-container');
    if (!container) return;
    container.innerHTML = '';

    // Group courses by category for display
    const categories = [
        { key: 'eigo', label: '英語・英会話' },
        { key: 'high_eigo', label: '高校生英語' },
        { key: 'eigo_kyouka', label: '中学英語強化' },
        { key: 'eiken', label: '英検®対策' },
        { key: 'sansu', label: 'さんすう・計算' },
        { key: 'sugaku', label: '数学・思考力' },
        { key: 'kanji', label: 'かんじ・漢検®' },
        { key: 'surasura', label: 'すらすらマイプリント' },
        { key: 'manabi', label: 'まなびのさんぽプラス' },
        { key: 'bs', label: 'BS（ベストスタディ）' },
        { key: 'senior', label: 'シニア' }
    ];

    categories.forEach(cat => {
        const courses = Object.values(COURSES).filter(c => c.category === cat.key);
        if (courses.length === 0) return;

        const section = document.createElement('div');
        section.style.marginBottom = '25px';
        section.innerHTML = `<h3 style="color:var(--primary);margin:0 0 10px;font-size:1rem;border-bottom:2px solid var(--primary);padding-bottom:5px;">${cat.label}</h3>`;

        courses.forEach(course => {
            const table = document.createElement('table');
            table.className = 'pricing-edit-table';
            table.style.cssText = 'width:100%;border-collapse:collapse;margin-bottom:12px;font-size:0.85rem;';

            let html = `<thead><tr style="background:#fef2f2;"><th colspan="99" style="text-align:left;padding:6px 8px;color:var(--primary);font-size:0.9rem;">${course.name}</th></tr></thead><tbody>`;

            // Basic fields: entrance, monthly, examFee
            html += `<tr>
                <td style="padding:5px 8px;border-bottom:1px solid #eee;width:120px;">入学金</td>
                <td style="padding:5px 8px;border-bottom:1px solid #eee;"><input type="number" value="${course.entrance}" data-cid="${course.id}" data-field="entrance" style="width:90px;padding:4px;border:1px solid #ddd;border-radius:4px;text-align:right;"> 円</td>
            </tr>`;

            // Monthly (only if not weeklyOptions / isOneTime)
            if (!course.weeklyOptions && !course.isOneTime) {
                html += `<tr>
                    <td style="padding:5px 8px;border-bottom:1px solid #eee;">月謝</td>
                    <td style="padding:5px 8px;border-bottom:1px solid #eee;"><input type="number" value="${course.monthly}" data-cid="${course.id}" data-field="monthly" style="width:90px;padding:4px;border:1px solid #ddd;border-radius:4px;text-align:right;"> 円/月</td>
                </tr>`;
            }

            if (course.examFee > 0) {
                html += `<tr>
                    <td style="padding:5px 8px;border-bottom:1px solid #eee;">検定料</td>
                    <td style="padding:5px 8px;border-bottom:1px solid #eee;"><input type="number" value="${course.examFee}" data-cid="${course.id}" data-field="examFee" style="width:90px;padding:4px;border:1px solid #ddd;border-radius:4px;text-align:right;"> 円</td>
                </tr>`;
            }

            // Weekly options
            if (course.weeklyOptions) {
                course.weeklyOptions.forEach((wo, i) => {
                    html += `<tr>
                        <td style="padding:5px 8px;border-bottom:1px solid #eee;">${wo.label} 月謝</td>
                        <td style="padding:5px 8px;border-bottom:1px solid #eee;"><input type="number" value="${wo.monthly}" data-cid="${course.id}" data-field="weeklyMonthly" data-idx="${i}" style="width:90px;padding:4px;border:1px solid #ddd;border-radius:4px;text-align:right;"> 円/月</td>
                    </tr>`;
                    html += `<tr>
                        <td style="padding:5px 8px;border-bottom:1px solid #eee;">${wo.label} 教材費</td>
                        <td style="padding:5px 8px;border-bottom:1px solid #eee;"><input type="number" value="${wo.materialCost}" data-cid="${course.id}" data-field="weeklyMaterial" data-idx="${i}" style="width:90px;padding:4px;border:1px solid #ddd;border-radius:4px;text-align:right;"> 円</td>
                    </tr>`;
                });
            }

            // One-time options
            if (course.options) {
                course.options.forEach((opt, i) => {
                    html += `<tr>
                        <td style="padding:5px 8px;border-bottom:1px solid #eee;">${opt.label} 受講料</td>
                        <td style="padding:5px 8px;border-bottom:1px solid #eee;"><input type="number" value="${opt.price}" data-cid="${course.id}" data-field="optionPrice" data-idx="${i}" style="width:90px;padding:4px;border:1px solid #ddd;border-radius:4px;text-align:right;"> 円</td>
                    </tr>`;
                    html += `<tr>
                        <td style="padding:5px 8px;border-bottom:1px solid #eee;">${opt.label} 教材費</td>
                        <td style="padding:5px 8px;border-bottom:1px solid #eee;"><input type="number" value="${opt.materialCost}" data-cid="${course.id}" data-field="optionMaterial" data-idx="${i}" style="width:90px;padding:4px;border:1px solid #ddd;border-radius:4px;text-align:right;"> 円</td>
                    </tr>`;
                });
            }

            // Materials per age
            if (course.materials && Object.keys(course.materials).length > 0) {
                Object.entries(course.materials).forEach(([ageKey, cost]) => {
                    const ageLabel = AGE_GROUPS.find(a => a.id === ageKey)?.label || ageKey;
                    html += `<tr>
                        <td style="padding:5px 8px;border-bottom:1px solid #eee;">教材費（${ageLabel}）</td>
                        <td style="padding:5px 8px;border-bottom:1px solid #eee;"><input type="number" value="${cost}" data-cid="${course.id}" data-field="material" data-age="${ageKey}" style="width:90px;padding:4px;border:1px solid #ddd;border-radius:4px;text-align:right;"> 円</td>
                    </tr>`;
                });
            }

            // Addons
            if (course.addons) {
                course.addons.forEach((addon, ai) => {
                    html += `<tr><td colspan="2" style="padding:5px 8px;border-bottom:1px solid #eee;background:#f9f9f9;font-weight:bold;font-size:0.8rem;">┗ ${addon.name}</td></tr>`;
                    html += `<tr>
                        <td style="padding:5px 8px 5px 20px;border-bottom:1px solid #eee;">追加月謝</td>
                        <td style="padding:5px 8px;border-bottom:1px solid #eee;"><input type="number" value="${addon.monthlyAdd}" data-cid="${course.id}" data-field="addonMonthly" data-aidx="${ai}" style="width:90px;padding:4px;border:1px solid #ddd;border-radius:4px;text-align:right;"> 円/月</td>
                    </tr>`;
                    if (addon.materialsAdd) {
                        Object.entries(addon.materialsAdd).forEach(([ageKey, cost]) => {
                            const ageLabel = AGE_GROUPS.find(a => a.id === ageKey)?.label || ageKey;
                            html += `<tr>
                                <td style="padding:5px 8px 5px 20px;border-bottom:1px solid #eee;">教材費（${ageLabel}）</td>
                                <td style="padding:5px 8px;border-bottom:1px solid #eee;"><input type="number" value="${cost}" data-cid="${course.id}" data-field="addonMaterial" data-aidx="${ai}" data-age="${ageKey}" style="width:90px;padding:4px;border:1px solid #ddd;border-radius:4px;text-align:right;"> 円</td>
                            </tr>`;
                        });
                    }
                });
            }

            html += '</tbody>';
            table.innerHTML = html;
            section.appendChild(table);
        });

        container.appendChild(section);
    });
}

function applyPricingFromModal() {
    // Read all input values from the pricing modal and apply to COURSES
    const inputs = document.querySelectorAll('#pricing-tables-container input[type="number"]');
    inputs.forEach(input => {
        const cid = input.dataset.cid;
        const field = input.dataset.field;
        const val = parseInt(input.value) || 0;
        if (!COURSES[cid]) return;

        switch (field) {
            case 'entrance': COURSES[cid].entrance = val; break;
            case 'monthly': COURSES[cid].monthly = val; break;
            case 'examFee': COURSES[cid].examFee = val; break;
            case 'material': {
                const age = input.dataset.age;
                if (COURSES[cid].materials) COURSES[cid].materials[age] = val;
                break;
            }
            case 'weeklyMonthly': {
                const idx = parseInt(input.dataset.idx);
                if (COURSES[cid].weeklyOptions?.[idx]) COURSES[cid].weeklyOptions[idx].monthly = val;
                break;
            }
            case 'weeklyMaterial': {
                const idx = parseInt(input.dataset.idx);
                if (COURSES[cid].weeklyOptions?.[idx]) COURSES[cid].weeklyOptions[idx].materialCost = val;
                break;
            }
            case 'optionPrice': {
                const idx = parseInt(input.dataset.idx);
                if (COURSES[cid].options?.[idx]) COURSES[cid].options[idx].price = val;
                break;
            }
            case 'optionMaterial': {
                const idx = parseInt(input.dataset.idx);
                if (COURSES[cid].options?.[idx]) COURSES[cid].options[idx].materialCost = val;
                break;
            }
            case 'addonMonthly': {
                const aidx = parseInt(input.dataset.aidx);
                if (COURSES[cid].addons?.[aidx]) COURSES[cid].addons[aidx].monthlyAdd = val;
                break;
            }
            case 'addonMaterial': {
                const aidx = parseInt(input.dataset.aidx);
                const age = input.dataset.age;
                if (COURSES[cid].addons?.[aidx]?.materialsAdd) COURSES[cid].addons[aidx].materialsAdd[age] = val;
                break;
            }
        }
    });
}

function savePricing() {
    applyPricingFromModal();
    localStorage.setItem(PRICING_KEY, JSON.stringify(extractSaveData()));
    $('pricing-modal')?.classList.remove('open');
    renderCourses();
    updateCalculations();
    alert('授業料設定を保存しました。');
}

function setDefaultPricing() {
    if (confirm('現在の設定値を「デフォルト（復元ポイント）」として登録しますか？\n\n「デフォルトに戻す」ボタンを押した際に、この値に戻るようになります。')) {
        applyPricingFromModal();
        localStorage.setItem(CUSTOM_DEFAULT_KEY, JSON.stringify(extractSaveData()));
        alert('現在の設定をデフォルトとして登録しました。');
    }
}

function resetPricing() {
    if (confirm('現在編集中の内容を破棄し、デフォルト設定に戻しますか？')) {
        const savedDefault = localStorage.getItem(CUSTOM_DEFAULT_KEY);
        if (savedDefault) {
            COURSES = JSON.parse(JSON.stringify(DEFAULT_COURSES));
            const parsed = JSON.parse(savedDefault);
            // Re-apply saved custom default
            Object.keys(parsed).forEach(id => {
                if (COURSES[id]) {
                    if (parsed[id].entrance !== undefined) COURSES[id].entrance = parsed[id].entrance;
                    if (parsed[id].monthly !== undefined) COURSES[id].monthly = parsed[id].monthly;
                    if (parsed[id].examFee !== undefined) COURSES[id].examFee = parsed[id].examFee;
                    if (parsed[id].materials) COURSES[id].materials = { ...COURSES[id].materials, ...parsed[id].materials };
                    if (parsed[id].weeklyOptions && COURSES[id].weeklyOptions) {
                        parsed[id].weeklyOptions.forEach((wo, i) => {
                            if (COURSES[id].weeklyOptions[i]) {
                                if (wo.monthly !== undefined) COURSES[id].weeklyOptions[i].monthly = wo.monthly;
                                if (wo.materialCost !== undefined) COURSES[id].weeklyOptions[i].materialCost = wo.materialCost;
                            }
                        });
                    }
                    if (parsed[id].options && COURSES[id].options) {
                        parsed[id].options.forEach((opt, i) => {
                            if (COURSES[id].options[i]) {
                                if (opt.price !== undefined) COURSES[id].options[i].price = opt.price;
                                if (opt.materialCost !== undefined) COURSES[id].options[i].materialCost = opt.materialCost;
                            }
                        });
                    }
                    if (parsed[id].addons && COURSES[id].addons) {
                        parsed[id].addons.forEach((addon, i) => {
                            if (COURSES[id].addons[i]) {
                                if (addon.monthlyAdd !== undefined) COURSES[id].addons[i].monthlyAdd = addon.monthlyAdd;
                                if (addon.materialsAdd) COURSES[id].addons[i].materialsAdd = { ...COURSES[id].addons[i].materialsAdd, ...addon.materialsAdd };
                            }
                        });
                    }
                }
            });
        } else {
            COURSES = JSON.parse(JSON.stringify(DEFAULT_COURSES));
        }
        localStorage.setItem(PRICING_KEY, JSON.stringify(extractSaveData()));
        renderPricingModal();
        renderCourses();
        updateCalculations();
        alert('デフォルト設定に戻しました。');
    }
}

// ----- Pricing Excel Export / Import -----
function exportPricingToExcel() {
    const rows = [];
    rows.push(['コースID', 'コース名', '項目', '対象', '金額']);

    Object.values(COURSES).forEach(course => {
        rows.push([course.id, course.name, '入学金', '', course.entrance]);

        if (!course.weeklyOptions && !course.isOneTime) {
            rows.push([course.id, course.name, '月謝', '', course.monthly]);
        }
        if (course.examFee > 0) {
            rows.push([course.id, course.name, '検定料', '', course.examFee]);
        }

        // Materials by age
        if (course.materials) {
            Object.entries(course.materials).forEach(([ageKey, cost]) => {
                const ageLabel = AGE_GROUPS.find(a => a.id === ageKey)?.label || ageKey;
                rows.push([course.id, course.name, '教材費', ageLabel, cost]);
            });
        }

        // Weekly options
        if (course.weeklyOptions) {
            course.weeklyOptions.forEach(wo => {
                rows.push([course.id, course.name, '月謝（' + wo.label + '）', '', wo.monthly]);
                rows.push([course.id, course.name, '教材費（' + wo.label + '）', '', wo.materialCost]);
            });
        }

        // One-time options
        if (course.options) {
            course.options.forEach(opt => {
                rows.push([course.id, course.name, '受講料（' + opt.label + '）', '', opt.price]);
                if (opt.materialCost !== undefined) {
                    rows.push([course.id, course.name, '教材費（' + opt.label + '）', '', opt.materialCost]);
                }
            });
        }

        // Addons
        if (course.addons) {
            course.addons.forEach(addon => {
                rows.push([course.id, course.name, 'アドオン月謝（' + addon.name + '）', '', addon.monthlyAdd]);
                if (addon.materialsAdd) {
                    Object.entries(addon.materialsAdd).forEach(([ageKey, cost]) => {
                        const ageLabel = AGE_GROUPS.find(a => a.id === ageKey)?.label || ageKey;
                        rows.push([course.id, course.name, 'アドオン教材費（' + addon.name + '）', ageLabel, cost]);
                    });
                }
            });
        }
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [
        { wch: 16 },
        { wch: 36 },
        { wch: 30 },
        { wch: 18 },
        { wch: 12 }
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '授業料設定');

    const today = new Date();
    const dateStr = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
    XLSX.writeFile(wb, `ECC授業料設定_${dateStr}.xlsx`);
}

function importPricingFromExcel(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const wb = XLSX.read(data, { type: 'array' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

            if (rows.length < 2) {
                alert('データが見つかりません。');
                return;
            }

            const dataRows = rows.slice(1);
            let updated = 0;

            // Build reverse age lookup
            const ageLabelToKey = {};
            AGE_GROUPS.forEach(a => { ageLabelToKey[a.label] = a.id; });

            dataRows.forEach(row => {
                if (!row[0]) return;
                const courseId = String(row[0]).trim();
                const item = String(row[2] || '').trim();
                const target = String(row[3] || '').trim();
                const value = parseInt(row[4]) || 0;

                if (!COURSES[courseId]) return;
                const course = COURSES[courseId];

                if (item === '入学金') { course.entrance = value; updated++; }
                else if (item === '月謝') { course.monthly = value; updated++; }
                else if (item === '検定料') { course.examFee = value; updated++; }
                else if (item === '教材費' && target) {
                    const ageKey = ageLabelToKey[target] || target;
                    if (course.materials) { course.materials[ageKey] = value; updated++; }
                }
                else if (item.startsWith('月謝（') && course.weeklyOptions) {
                    const label = item.replace('月謝（', '').replace('）', '');
                    const wo = course.weeklyOptions.find(w => w.label === label);
                    if (wo) { wo.monthly = value; updated++; }
                }
                else if (item.startsWith('教材費（') && !item.includes('アドオン')) {
                    const label = item.replace('教材費（', '').replace('）', '');
                    if (course.weeklyOptions) {
                        const wo = course.weeklyOptions.find(w => w.label === label);
                        if (wo) { wo.materialCost = value; updated++; }
                    }
                    if (course.options) {
                        const opt = course.options.find(o => o.label === label);
                        if (opt) { opt.materialCost = value; updated++; }
                    }
                }
                else if (item.startsWith('受講料（') && course.options) {
                    const label = item.replace('受講料（', '').replace('）', '');
                    const opt = course.options.find(o => o.label === label);
                    if (opt) { opt.price = value; updated++; }
                }
                else if (item.startsWith('アドオン月謝（') && course.addons) {
                    const addonName = item.replace('アドオン月謝（', '').replace('）', '');
                    const addon = course.addons.find(a => a.name === addonName);
                    if (addon) { addon.monthlyAdd = value; updated++; }
                }
                else if (item.startsWith('アドオン教材費（') && course.addons) {
                    const addonName = item.replace('アドオン教材費（', '').replace('）', '');
                    const ageKey = ageLabelToKey[target] || target;
                    const addon = course.addons.find(a => a.name === addonName);
                    if (addon && addon.materialsAdd) { addon.materialsAdd[ageKey] = value; updated++; }
                }
            });

            renderPricingModal();
            alert(`${updated} 件の授業料データをインポートしました。\n「保存して閉じる」で確定してください。`);

        } catch (err) {
            console.error('Import error:', err);
            alert('ファイルの読み込みに失敗しました。正しいExcelファイルを選択してください。');
        }
    };
    reader.readAsArrayBuffer(file);
}

function renderMaterialModal() {
    const container = $('material-tables-container');
    if (!container) return;
    container.innerHTML = '';

    const categories = [
        { key: 'eigo', label: '英語・英会話' },
        { key: 'high_eigo', label: '高校生英語' },
        { key: 'eigo_kyouka', label: '中学英語強化' },
        { key: 'eiken', label: '英検®対策' },
        { key: 'sansu', label: 'さんすう・計算' },
        { key: 'sugaku', label: '数学・思考力' },
        { key: 'kanji', label: 'かんじ・漢検®' },
        { key: 'surasura', label: 'すらすらマイプリント' },
        { key: 'manabi', label: 'まなびのさんぽプラス' },
        { key: 'bs', label: 'BS' },
        { key: 'senior', label: 'シニア' }
    ];

    categories.forEach(cat => {
        const courses = Object.values(COURSES).filter(c => c.category === cat.key);
        if (courses.length === 0) return;
        const relevant = courses.filter(c => (c.materialItems && c.materialItems.length > 0) || c.addons?.some(a => a.materialItemsToAdd?.length > 0));
        if (relevant.length === 0) return;

        const section = document.createElement('div');
        section.style.marginBottom = '25px';
        section.innerHTML = `<h3 style="color:var(--primary);margin:0 0 10px;font-size:1rem;border-bottom:2px solid var(--primary);padding-bottom:5px;">${cat.label}</h3>`;

        relevant.forEach(course => {
            const block = document.createElement('div');
            block.style.cssText = 'margin-bottom:16px;border:1px solid #eee;border-radius:8px;overflow:hidden;';
            let html = `<div style="background:#fef2f2;padding:8px 12px;font-weight:bold;color:var(--primary);font-size:0.9rem;">${course.name}</div>`;
            html += '<table style="width:100%;border-collapse:collapse;font-size:0.85rem;"><tbody>';

            if (course.materialItems) {
                course.materialItems.forEach((item, idx) => {
                    html += `<tr>
                        <td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;width:40%;">
                            <input type="text" value="${item.name}" data-cid="${course.id}" data-mfield="name" data-mtype="main" data-midx="${idx}" style="width:100%;padding:4px;border:1px solid #ddd;border-radius:4px;font-size:0.85rem;">
                        </td>
                        <td style="padding:6px 8px;border-bottom:1px solid #f0f0f0;width:25%;">
                            <input type="number" value="${item.price}" data-cid="${course.id}" data-mfield="price" data-mtype="main" data-midx="${idx}" style="width:80px;padding:4px;border:1px solid #ddd;border-radius:4px;text-align:right;"> 円
                        </td>
                        <td style="padding:6px 8px;border-bottom:1px solid #f0f0f0;width:20%;text-align:center;">
                            <label style="font-size:0.8rem;cursor:pointer;"><input type="checkbox" ${item.reusable ? 'checked' : ''} data-cid="${course.id}" data-mfield="reusable" data-mtype="main" data-midx="${idx}"> ♻お下がり可</label>
                        </td>
                        <td style="padding:6px 4px;border-bottom:1px solid #f0f0f0;width:15%;text-align:center;">
                            <button onclick="removeMaterialItem('${course.id}','main',${idx})" style="background:none;border:none;color:#c00;cursor:pointer;font-size:1rem;" title="削除">✕</button>
                        </td>
                    </tr>`;
                });
            }
            html += `<tr><td colspan="4" style="padding:6px 12px;border-bottom:1px solid #eee;">
                <button onclick="addMaterialItem('${course.id}','main')" style="background:none;border:1px dashed #ccc;color:#888;padding:4px 12px;border-radius:4px;cursor:pointer;font-size:0.8rem;">+ 品目を追加</button>
            </td></tr>`;

            if (course.addons) {
                course.addons.forEach((addon, ai) => {
                    if (!addon.materialItemsToAdd || addon.materialItemsToAdd.length === 0) return;
                    html += `<tr><td colspan="4" style="padding:6px 12px;background:#f9f5ff;border-bottom:1px solid #eee;font-weight:bold;font-size:0.8rem;color:#7c3aed;">└ ${addon.name}</td></tr>`;
                    addon.materialItemsToAdd.forEach((item, idx) => {
                        html += `<tr>
                            <td style="padding:6px 12px 6px 24px;border-bottom:1px solid #f0f0f0;">
                                <input type="text" value="${item.name}" data-cid="${course.id}" data-mfield="name" data-mtype="addon" data-aidx="${ai}" data-midx="${idx}" style="width:100%;padding:4px;border:1px solid #ddd;border-radius:4px;font-size:0.85rem;">
                            </td>
                            <td style="padding:6px 8px;border-bottom:1px solid #f0f0f0;">
                                <input type="number" value="${item.price}" data-cid="${course.id}" data-mfield="price" data-mtype="addon" data-aidx="${ai}" data-midx="${idx}" style="width:80px;padding:4px;border:1px solid #ddd;border-radius:4px;text-align:right;"> 円
                            </td>
                            <td style="padding:6px 8px;border-bottom:1px solid #f0f0f0;text-align:center;">
                                <label style="font-size:0.8rem;cursor:pointer;"><input type="checkbox" ${item.reusable ? 'checked' : ''} data-cid="${course.id}" data-mfield="reusable" data-mtype="addon" data-aidx="${ai}" data-midx="${idx}"> ♻お下がり可</label>
                            </td>
                            <td style="padding:6px 4px;border-bottom:1px solid #f0f0f0;text-align:center;">
                                <button onclick="removeMaterialItem('${course.id}','addon',${idx},${ai})" style="background:none;border:none;color:#c00;cursor:pointer;font-size:1rem;" title="削除">✕</button>
                            </td>
                        </tr>`;
                    });
                    html += `<tr><td colspan="4" style="padding:6px 12px 6px 24px;border-bottom:1px solid #eee;">
                        <button onclick="addMaterialItem('${course.id}','addon',${ai})" style="background:none;border:1px dashed #ccc;color:#888;padding:4px 12px;border-radius:4px;cursor:pointer;font-size:0.8rem;">+ 品目を追加</button>
                    </td></tr>`;
                });
            }

            html += '</tbody></table>';
            block.innerHTML = html;
            section.appendChild(block);
        });
        container.appendChild(section);
    });
}

function addMaterialItem(courseId, type, addonIdx) {
    applyMaterialFromModal();
    const course = COURSES[courseId];
    if (!course) return;
    const newItem = { name: '新しい品目', price: 0, reusable: false };
    if (type === 'main') {
        if (!course.materialItems) course.materialItems = [];
        course.materialItems.push(newItem);
    } else if (type === 'addon' && course.addons?.[addonIdx]) {
        if (!course.addons[addonIdx].materialItemsToAdd) course.addons[addonIdx].materialItemsToAdd = [];
        course.addons[addonIdx].materialItemsToAdd.push(newItem);
    }
    renderMaterialModal();
}

function removeMaterialItem(courseId, type, idx, addonIdx) {
    applyMaterialFromModal();
    const course = COURSES[courseId];
    if (!course) return;
    if (type === 'main' && course.materialItems) {
        course.materialItems.splice(idx, 1);
    } else if (type === 'addon' && course.addons?.[addonIdx]?.materialItemsToAdd) {
        course.addons[addonIdx].materialItemsToAdd.splice(idx, 1);
    }
    renderMaterialModal();
}

function applyMaterialFromModal() {
    const container = $('material-tables-container');
    if (!container) return;
    container.querySelectorAll('input[type="text"][data-mfield="name"]').forEach(input => {
        const cid = input.dataset.cid, mtype = input.dataset.mtype, idx = parseInt(input.dataset.midx);
        if (mtype === 'main' && COURSES[cid]?.materialItems?.[idx]) {
            COURSES[cid].materialItems[idx].name = input.value;
        } else if (mtype === 'addon') {
            const ai = parseInt(input.dataset.aidx);
            if (COURSES[cid]?.addons?.[ai]?.materialItemsToAdd?.[idx]) COURSES[cid].addons[ai].materialItemsToAdd[idx].name = input.value;
        }
    });
    container.querySelectorAll('input[type="number"][data-mfield="price"]').forEach(input => {
        const cid = input.dataset.cid, mtype = input.dataset.mtype, idx = parseInt(input.dataset.midx), val = parseInt(input.value) || 0;
        if (mtype === 'main' && COURSES[cid]?.materialItems?.[idx]) {
            COURSES[cid].materialItems[idx].price = val;
        } else if (mtype === 'addon') {
            const ai = parseInt(input.dataset.aidx);
            if (COURSES[cid]?.addons?.[ai]?.materialItemsToAdd?.[idx]) COURSES[cid].addons[ai].materialItemsToAdd[idx].price = val;
        }
    });
    container.querySelectorAll('input[type="checkbox"][data-mfield="reusable"]').forEach(input => {
        const cid = input.dataset.cid, mtype = input.dataset.mtype, idx = parseInt(input.dataset.midx);
        if (mtype === 'main' && COURSES[cid]?.materialItems?.[idx]) {
            COURSES[cid].materialItems[idx].reusable = input.checked;
        } else if (mtype === 'addon') {
            const ai = parseInt(input.dataset.aidx);
            if (COURSES[cid]?.addons?.[ai]?.materialItemsToAdd?.[idx]) COURSES[cid].addons[ai].materialItemsToAdd[idx].reusable = input.checked;
        }
    });
}

function extractMaterialData() {
    const data = {};
    Object.values(COURSES).forEach(course => {
        const entry = {};
        if (course.materialItems) entry.materialItems = JSON.parse(JSON.stringify(course.materialItems));
        if (course.addons) {
            entry.addons = course.addons.map(a => ({ id: a.id, materialItemsToAdd: a.materialItemsToAdd ? JSON.parse(JSON.stringify(a.materialItemsToAdd)) : [] }));
        }
        data[course.id] = entry;
    });
    return data;
}

function applyMaterialData(data) {
    Object.keys(data).forEach(id => {
        if (!COURSES[id]) return;
        if (data[id].materialItems) COURSES[id].materialItems = data[id].materialItems;
        if (data[id].addons && COURSES[id].addons) {
            data[id].addons.forEach((sa, i) => {
                if (COURSES[id].addons[i]) COURSES[id].addons[i].materialItemsToAdd = sa.materialItemsToAdd || [];
            });
        }
    });
}

function saveMaterial() {
    applyMaterialFromModal();
    localStorage.setItem(MATERIAL_KEY, JSON.stringify(extractMaterialData()));
    $('material-modal')?.classList.remove('open');
    renderMaterialTable();
    updateCalculations();
    alert('教材費設定を保存しました。');
}

function setDefaultMaterial() {
    if (confirm('現在の教材費設定を「デフォルト（復元ポイント）」として登録しますか？')) {
        applyMaterialFromModal();
        localStorage.setItem(MATERIAL_DEFAULT_KEY, JSON.stringify(extractMaterialData()));
        alert('現在の教材費設定をデフォルトとして登録しました。');
    }
}

function resetMaterial() {
    if (confirm('教材費設定をデフォルトに戻しますか？')) {
        const savedDefault = localStorage.getItem(MATERIAL_DEFAULT_KEY);
        Object.values(DEFAULT_COURSES).forEach(dc => {
            if (COURSES[dc.id]) {
                COURSES[dc.id].materialItems = JSON.parse(JSON.stringify(dc.materialItems || []));
                if (dc.addons && COURSES[dc.id].addons) {
                    dc.addons.forEach((da, i) => {
                        if (COURSES[dc.id].addons[i]) COURSES[dc.id].addons[i].materialItemsToAdd = JSON.parse(JSON.stringify(da.materialItemsToAdd || []));
                    });
                }
            }
        });
        if (savedDefault) applyMaterialData(JSON.parse(savedDefault));
        localStorage.setItem(MATERIAL_KEY, JSON.stringify(extractMaterialData()));
        renderMaterialModal();
        renderMaterialTable();
        updateCalculations();
        alert('教材費設定をデフォルトに戻しました。');
    }
}

// ----- Excel Export / Import -----
function exportMaterialToExcel() {
    const rows = [];
    // Header row
    rows.push(['コースID', 'コース名', '種別', '品目名', '価格', 'お下がり可']);

    Object.values(COURSES).forEach(course => {
        // Main material items
        if (course.materialItems && course.materialItems.length > 0) {
            course.materialItems.forEach(item => {
                rows.push([
                    course.id,
                    course.name,
                    'メイン教材',
                    item.name,
                    item.price,
                    item.reusable ? '○' : ''
                ]);
            });
        }
        // Addon material items
        if (course.addons) {
            course.addons.forEach(addon => {
                if (addon.materialItemsToAdd && addon.materialItemsToAdd.length > 0) {
                    addon.materialItemsToAdd.forEach(item => {
                        rows.push([
                            course.id,
                            course.name,
                            'アドオン: ' + addon.name,
                            item.name,
                            item.price,
                            item.reusable ? '○' : ''
                        ]);
                    });
                }
            });
        }
        // Multiple materialItems variants (eiken etc.)
        const variantKeys = Object.keys(course).filter(k => k.startsWith('materialItems') && k !== 'materialItems');
        variantKeys.forEach(key => {
            const label = key.replace('materialItems', '') || 'バリアント';
            if (Array.isArray(course[key])) {
                course[key].forEach(item => {
                    rows.push([
                        course.id,
                        course.name,
                        'バリアント: ' + label,
                        item.name,
                        item.price,
                        item.reusable ? '○' : ''
                    ]);
                });
            }
        });
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    // Set column widths
    ws['!cols'] = [
        { wch: 16 },  // コースID
        { wch: 36 },  // コース名
        { wch: 28 },  // 種別
        { wch: 44 },  // 品目名
        { wch: 10 },  // 価格
        { wch: 10 }   // お下がり可
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '教材データ');

    const today = new Date();
    const dateStr = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
    XLSX.writeFile(wb, `ECC教材データ_${dateStr}.xlsx`);
}

function importMaterialFromExcel(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const wb = XLSX.read(data, { type: 'array' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

            if (rows.length < 2) {
                alert('データが見つかりません。');
                return;
            }

            // Skip header row
            const dataRows = rows.slice(1);

            // Group by course ID
            const courseMap = {};
            dataRows.forEach(row => {
                if (!row[0]) return;
                const courseId = String(row[0]).trim();
                const type = String(row[2] || '').trim();
                const itemName = String(row[3] || '').trim();
                const price = parseInt(row[4]) || 0;
                const reusable = String(row[5] || '').trim() === '○';

                if (!itemName) return;

                if (!courseMap[courseId]) courseMap[courseId] = { main: [], addons: {} };

                if (type === 'メイン教材') {
                    courseMap[courseId].main.push({ name: itemName, price, reusable });
                } else if (type.startsWith('アドオン: ')) {
                    const addonName = type.replace('アドオン: ', '');
                    if (!courseMap[courseId].addons[addonName]) courseMap[courseId].addons[addonName] = [];
                    courseMap[courseId].addons[addonName].push({ name: itemName, price, reusable });
                }
                // バリアント types are informational, not imported back
            });

            // Apply to COURSES
            let updated = 0;
            Object.keys(courseMap).forEach(courseId => {
                if (!COURSES[courseId]) return;
                const course = COURSES[courseId];
                const imported = courseMap[courseId];

                // Update main materialItems
                if (imported.main.length > 0) {
                    course.materialItems = imported.main;
                    updated++;
                }

                // Update addon materialItemsToAdd
                if (course.addons) {
                    course.addons.forEach(addon => {
                        if (imported.addons[addon.name]) {
                            addon.materialItemsToAdd = imported.addons[addon.name];
                        }
                    });
                }
            });

            // Re-render modal
            renderMaterialModal();
            alert(`${updated} コースの教材データをインポートしました。\n「保存して閉じる」で確定してください。`);

        } catch (err) {
            console.error('Import error:', err);
            alert('ファイルの読み込みに失敗しました。正しいExcelファイルを選択してください。');
        }
    };
    reader.readAsArrayBuffer(file);
}

// ----- Init -----
function init() {
    // Load remarks and entrance conditions from storage
    state.remarks = loadRemarks();
    state.entranceConditions = loadEntranceConditions();

    renderAgeSelector();
    renderCourses();
    setupEntranceListeners();
    renderRemarksEditor();
    setupRemarksListeners();
    updateCalculations();

    $('student-name')?.addEventListener('input', e => { state.studentName = e.target.value; });
    $('generate-btn')?.addEventListener('click', generateEstimate);

    // Config modal
    $('open-config-btn')?.addEventListener('click', () => $('config-modal').classList.add('open'));
    $('close-config-btn')?.addEventListener('click', () => $('config-modal').classList.remove('open'));
    $('save-config-btn')?.addEventListener('click', saveConfig);

    // Pricing modal
    $('open-pricing-btn')?.addEventListener('click', () => {
        renderPricingModal();
        $('pricing-modal').classList.add('open');
    });
    $('close-pricing-btn')?.addEventListener('click', () => $('pricing-modal').classList.remove('open'));
    $('save-pricing-btn')?.addEventListener('click', savePricing);
    $('set-default-btn')?.addEventListener('click', setDefaultPricing);
    $('reset-pricing-btn')?.addEventListener('click', resetPricing);

    // Pricing Excel export/import
    $('export-pricing-btn')?.addEventListener('click', () => {
        applyPricingFromModal();
        exportPricingToExcel();
    });
    $('import-pricing-btn')?.addEventListener('click', () => {
        $('import-pricing-file').click();
    });
    $('import-pricing-file')?.addEventListener('change', e => {
        const file = e.target.files[0];
        if (file) {
            importPricingFromExcel(file);
            e.target.value = '';
        }
    });

    // Material modal
    $('open-material-btn')?.addEventListener('click', () => {
        renderMaterialModal();
        $('material-modal').classList.add('open');
    });
    $('close-material-btn')?.addEventListener('click', () => $('material-modal').classList.remove('open'));
    $('save-material-btn')?.addEventListener('click', saveMaterial);
    $('set-default-material-btn')?.addEventListener('click', setDefaultMaterial);
    $('reset-material-btn')?.addEventListener('click', resetMaterial);

    // Material Excel export/import
    $('export-material-btn')?.addEventListener('click', () => {
        applyMaterialFromModal();
        exportMaterialToExcel();
    });
    $('import-material-btn')?.addEventListener('click', () => {
        $('import-material-file').click();
    });
    $('import-material-file')?.addEventListener('change', e => {
        const file = e.target.files[0];
        if (file) {
            importMaterialFromExcel(file);
            e.target.value = '';
        }
    });

    // Load saved material data
    const savedMaterial = localStorage.getItem(MATERIAL_KEY);
    if (savedMaterial) {
        try { applyMaterialData(JSON.parse(savedMaterial)); } catch (e) { }
    }

    // Bag discount
    $('bag-discount-toggle')?.addEventListener('change', e => {
        state.bagDiscountEnabled = e.target.checked;
        const area = $('bag-discount-input-area');
        if (area) area.style.display = e.target.checked ? 'block' : 'none';
        if (e.target.checked) {
            state.bagDiscount = 1990;
            const input = $('bag-discount-amount');
            if (input) input.value = '1990';
        } else {
            state.bagDiscount = 0;
            const input = $('bag-discount-amount');
            if (input) input.value = '0';
        }
        updateCalculations();
    });
    $('bag-discount-amount')?.addEventListener('input', e => {
        state.bagDiscount = parseInt(e.target.value) || 0;
        updateCalculations();
    });
}

// ----- Age Selector -----
function renderAgeSelector() {
    const select = $('age-selector');
    if (!select) return;
    select.innerHTML = '';
    AGE_GROUPS.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g.id;
        opt.textContent = g.label;
        if (g.id === state.age) opt.selected = true;
        select.appendChild(opt);
    });
    select.addEventListener('change', e => {
        state.age = e.target.value;
        state.selectedCourses = {};
        state.materialOverrides = {};
        renderCourses();
        updateCalculations();
    });
}

// ----- Course Rendering -----
function renderCourses() {
    const container = $('course-list');
    if (!container) return;
    container.innerHTML = '';

    const availableCourses = Object.values(COURSES).filter(c => c.ages.includes(state.age));

    if (availableCourses.length === 0) {
        container.innerHTML = '<div class="empty-state">この年齢に対応するコースはありません。</div>';
        return;
    }

    availableCourses.forEach(course => {
        const card = document.createElement('label');
        card.className = 'course-card' + (state.selectedCourses[course.id]?.selected ? ' selected' : '');

        const isSelected = !!state.selectedCourses[course.id]?.selected;
        const monthlyDisplay = getMonthlyDisplay(course);

        // Show code badge for English courses
        const hasBadge = ['eigo', 'high_eigo', 'eigo_kyouka'].includes(course.category);
        const codeBadge = hasBadge ? `<span class="course-code-badge">${course.id}</span> ` : '';
        const displayName = hasBadge ? course.name.replace(course.id + ' ', '') : course.name;

        let html = `
      <input type="checkbox" data-course="${course.id}" ${isSelected ? 'checked' : ''}>
      <div class="course-info">
        <div class="course-name">${codeBadge}${displayName}</div>
        <div class="course-detail">${course.detail}</div>`;

        // Sub-options (weekly options)
        if (course.weeklyOptions && isSelected) {
            html += '<div class="course-sub-options">';
            html += `<select data-course="${course.id}" data-type="weekly">`;
            course.weeklyOptions.forEach((opt, i) => {
                const sel = (state.selectedCourses[course.id]?.weeklyIndex || 0) === i ? 'selected' : '';
                html += `<option value="${i}" ${sel}>${opt.label} — ¥${opt.monthly.toLocaleString()}/月</option>`;
            });
            html += '</select></div>';
        }

        // One-time options (eiken chokuzen)
        if (course.options && isSelected) {
            html += '<div class="course-sub-options">';
            html += `<select data-course="${course.id}" data-type="oneTimeOption">`;
            course.options.forEach((opt, i) => {
                const sel = (state.selectedCourses[course.id]?.optionIndex || 0) === i ? 'selected' : '';
                html += `<option value="${i}" ${sel}>${opt.label} — ¥${opt.price.toLocaleString()}</option>`;
            });
            html += '</select></div>';
        }

        // Addons
        if (course.addons && isSelected) {
            html += '<div class="course-sub-options">';
            course.addons.forEach(addon => {
                const addonChecked = !!state.selectedCourses[course.id]?.addons?.[addon.id];
                html += `<label>
          <input type="checkbox" data-course="${course.id}" data-addon="${addon.id}" ${addonChecked ? 'checked' : ''}>
          ${addon.name}（+¥${addon.monthlyAdd.toLocaleString()}/月）
          <span style="font-size:0.75rem;color:#888;">— ${addon.detail}</span>
        </label>`;
            });
            html += '</div>';
        }

        html += `</div><div class="course-price-tag">${monthlyDisplay}</div>`;
        card.innerHTML = html;

        // Event: main checkbox
        const mainCb = card.querySelector(`input[data-course="${course.id}"]:not([data-addon])`);
        if (mainCb && !mainCb.dataset.type) {
            mainCb.addEventListener('change', e => {
                e.stopPropagation();
                if (e.target.checked) {
                    state.selectedCourses[course.id] = { selected: true, addons: {}, optionIndex: 0, weeklyIndex: 0 };
                } else {
                    delete state.selectedCourses[course.id];
                    delete state.materialOverrides[course.id];
                }
                renderCourses();
                updateCalculations();
            });
        }

        container.appendChild(card);

        // Event: weekly / oneTime select
        card.querySelectorAll('select').forEach(sel => {
            sel.addEventListener('change', e => {
                e.stopPropagation();
                const cid = e.target.dataset.course;
                if (e.target.dataset.type === 'weekly') {
                    state.selectedCourses[cid].weeklyIndex = parseInt(e.target.value);
                    delete state.materialOverrides[cid];
                } else if (e.target.dataset.type === 'oneTimeOption') {
                    state.selectedCourses[cid].optionIndex = parseInt(e.target.value);
                    delete state.materialOverrides[cid];
                }
                renderCourses();
                updateCalculations();
            });
            sel.addEventListener('click', e => e.stopPropagation());
        });

        // Event: addon checkboxes
        card.querySelectorAll('input[data-addon]').forEach(cb => {
            cb.addEventListener('change', e => {
                e.stopPropagation();
                const cid = e.target.dataset.course;
                const aid = e.target.dataset.addon;
                if (!state.selectedCourses[cid].addons) state.selectedCourses[cid].addons = {};
                state.selectedCourses[cid].addons[aid] = e.target.checked;
                delete state.materialOverrides[cid];
                renderMaterialTable();
                updateCalculations();
            });
            cb.addEventListener('click', e => e.stopPropagation());
        });
    });

    renderMaterialTable();
}

function getMonthlyDisplay(course) {
    if (course.isOneTime) return '短期';
    if (course.weeklyOptions) {
        const idx = state.selectedCourses[course.id]?.weeklyIndex || 0;
        return `¥${course.weeklyOptions[idx].monthly.toLocaleString()}/月`;
    }
    return `¥${course.monthly.toLocaleString()}/月`;
}

// ----- Entrance Fee -----
function setupEntranceListeners() {
    document.querySelectorAll('input[name="entrance-fee"]').forEach(r => {
        r.addEventListener('change', e => {
            if (e.target.checked) {
                state.entranceType = e.target.value;
                updateCalculations();
            }
        });
    });

    // Condition text click-to-edit
    document.querySelectorAll('.entrance-condition').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const type = el.dataset.conditionType; // 'half' or 'full'
            const editor = $('entrance-condition-editor');
            const label = $('condition-edit-label');
            const input = $('condition-edit-input');
            if (!editor || !label || !input) return;
            label.textContent = type === 'half' ? '半額免除の条件：' : '全額免除の条件：';
            input.value = state.entranceConditions[type] || '';
            editor.style.display = 'block';
            editor._editType = type;
            input.focus();
        });
    });

    $('condition-save-btn')?.addEventListener('click', () => {
        const editor = $('entrance-condition-editor');
        const input = $('condition-edit-input');
        if (!editor) return;
        const type = editor._editType;
        const newVal = input.value.trim();
        state.entranceConditions[type] = newVal;
        saveEntranceConditions();
        const desc = $(type === 'half' ? 'half-waiver-desc' : 'full-waiver-desc');
        if (desc) desc.textContent = newVal || '条件を入力してください';
        editor.style.display = 'none';
    });

    $('condition-cancel-btn')?.addEventListener('click', () => {
        const editor = $('entrance-condition-editor');
        if (editor) editor.style.display = 'none';
    });

    // Load saved conditions
    const conds = state.entranceConditions;
    const halfDesc = $('half-waiver-desc');
    const fullDesc = $('full-waiver-desc');
    if (halfDesc) halfDesc.textContent = conds.half || '条件を入力してください';
    if (fullDesc) fullDesc.textContent = conds.full || '条件を入力してください';
}

// ----- Remarks Editor -----
function renderRemarksEditor() {
    const container = $('remarks-editor-list');
    if (!container) return;
    container.innerHTML = '';

    state.remarks.forEach((remark, idx) => {
        const item = document.createElement('div');
        item.className = 'remark-item' + (remark.checked ? ' checked' : '');
        item.innerHTML = `
            <label class="remark-label">
                <input type="checkbox" class="remark-cb" data-idx="${idx}" ${remark.checked ? 'checked' : ''}>
                <span class="remark-text">${remark.text}</span>
            </label>
            ${remark.custom ? `<button type="button" class="remark-delete-btn" data-idx="${idx}" title="削除">✕</button>` : ''}
        `;
        container.appendChild(item);
    });

    // Event: checkbox toggle
    container.querySelectorAll('.remark-cb').forEach(cb => {
        cb.addEventListener('change', e => {
            const idx = parseInt(e.target.dataset.idx);
            state.remarks[idx].checked = e.target.checked;
            e.target.closest('.remark-item').classList.toggle('checked', e.target.checked);
            saveRemarks();
        });
    });

    // Event: delete custom remark
    container.querySelectorAll('.remark-delete-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = parseInt(e.target.dataset.idx);
            state.remarks.splice(idx, 1);
            saveRemarks();
            renderRemarksEditor();
        });
    });
}

function setupRemarksListeners() {
    $('add-remark-btn')?.addEventListener('click', () => {
        const input = $('new-remark-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;
        state.remarks.push({ text, checked: true, custom: true });
        saveRemarks();
        input.value = '';
        renderRemarksEditor();
    });

    // Enter key support
    $('new-remark-input')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            $('add-remark-btn')?.click();
        }
    });
}

// ----- Material Fee Table -----
function renderMaterialTable() {
    const container = $('material-items-container');
    if (!container) return;
    container.innerHTML = '';

    const selected = getSelectedCoursesList();
    if (selected.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:#999;padding:20px;">コースを選択してください</div>';
        return;
    }

    selected.forEach(({ course, courseState }) => {
        // Collect all material items for this course (base + addons)
        let items = [];
        if (course.materialItems) {
            items = items.concat(course.materialItems.map((item, i) => ({ ...item, source: course.id, index: i })));
        }
        // Addon material items
        if (course.addons && courseState.addons) {
            course.addons.forEach(addon => {
                if (courseState.addons[addon.id] && addon.materialItemsToAdd) {
                    addon.materialItemsToAdd.forEach((item, i) => {
                        items.push({ ...item, source: course.id + '__' + addon.id, index: i });
                    });
                }
            });
        }

        if (items.length === 0 && !course.isOneTime && !course.weeklyOptions) {
            // Fallback: show total only (like before)
            const refTotal = getDefaultMaterialCost(course, courseState);
            const section = document.createElement('div');
            section.className = 'material-course-section';
            section.innerHTML = `
                <div class="material-course-header">${course.name}</div>
                <table class="material-table"><tbody>
                    <tr>
                        <td>教材費一式</td>
                        <td class="auto-filled">¥${refTotal.toLocaleString()}</td>
                        <td><input type="number" value="${state.materialOverrides[course.id] ?? refTotal}" min="0" data-course="${course.id}" data-material-total="true" style="width:90px;text-align:right;"></td>
                        <td></td>
                    </tr>
                </tbody></table>`;
            container.appendChild(section);
            section.querySelector('input').addEventListener('input', e => {
                const val = parseInt(e.target.value);
                if (isNaN(val) || val === refTotal) delete state.materialOverrides[course.id];
                else state.materialOverrides[course.id] = val;
                updateCalculations();
            });
            return;
        }

        const refTotal = getDefaultMaterialCost(course, courseState);
        const section = document.createElement('div');
        section.className = 'material-course-section';

        let tableRows = '';
        items.forEach((item, idx) => {
            const key = item.source + '_' + item.index;
            const savedPrice = state.materialItemOverrides?.[key];
            const displayPrice = savedPrice !== undefined ? savedPrice : item.price;
            const isHandmedown = !!state.handmedowns?.[key];
            const reusableLabel = item.reusable ? '<span style="font-size:0.7rem;color:#10b981;margin-left:4px;">♻</span>' : '';

            tableRows += `
                <tr class="${isHandmedown ? 'handmedown-active' : ''}">
                    <td>${item.name}${reusableLabel}</td>
                    <td><input type="number" class="mat-item-price" value="${displayPrice}" min="0" data-key="${key}" style="width:80px;text-align:right;"></td>
                    <td style="text-align:center;">
                        <label style="cursor:pointer;display:flex;align-items:center;gap:4px;justify-content:center;">
                            <input type="checkbox" class="handmedown-cb" data-key="${key}" ${isHandmedown ? 'checked' : ''}>
                            <span style="font-size:0.75rem;">お下がり</span>
                        </label>
                    </td>
                </tr>`;
        });

        section.innerHTML = `
            <div class="material-course-header">
                <span>${course.name}</span>
                <span class="material-ref-total">参考合計: ¥${refTotal.toLocaleString()}</span>
            </div>
            <table class="material-table">
                <thead><tr><th>品目</th><th>価格（税込）</th><th>お下がり</th></tr></thead>
                <tbody>${tableRows}</tbody>
            </table>`;

        container.appendChild(section);

        // Event: price input
        section.querySelectorAll('.mat-item-price').forEach(input => {
            input.addEventListener('input', e => {
                const key = e.target.dataset.key;
                const val = parseInt(e.target.value);
                if (!state.materialItemOverrides) state.materialItemOverrides = {};
                state.materialItemOverrides[key] = isNaN(val) ? 0 : val;
                updateCalculations();
            });
        });

        // Event: handmedown checkbox
        section.querySelectorAll('.handmedown-cb').forEach(cb => {
            cb.addEventListener('change', e => {
                const key = e.target.dataset.key;
                if (!state.handmedowns) state.handmedowns = {};
                state.handmedowns[key] = e.target.checked;
                e.target.closest('tr').classList.toggle('handmedown-active', e.target.checked);
                updateCalculations();
            });
        });
    });
}

function getMaterialItemsTotal(course, courseState) {
    // Collect items
    let items = [];
    if (course.materialItems) {
        items = items.concat(course.materialItems.map((item, i) => ({ ...item, source: course.id, index: i })));
    }
    if (course.addons && courseState.addons) {
        course.addons.forEach(addon => {
            if (courseState.addons[addon.id] && addon.materialItemsToAdd) {
                addon.materialItemsToAdd.forEach((item, i) => {
                    items.push({ ...item, source: course.id + '__' + addon.id, index: i });
                });
            }
        });
    }

    if (items.length === 0) return null; // No items defined

    let total = 0;
    let anyPriceSet = false;
    items.forEach(item => {
        const key = item.source + '_' + item.index;
        const price = state.materialItemOverrides?.[key] !== undefined ? state.materialItemOverrides[key] : item.price;
        if (price > 0) anyPriceSet = true;
        const isHandmedown = !!state.handmedowns?.[key];
        if (!isHandmedown) total += price;
    });

    return anyPriceSet ? total : null; // null means use fallback
}

function getDefaultMaterialCost(course, courseState) {
    if (course.isOneTime && course.options) {
        const idx = courseState.optionIndex || 0;
        return course.options[idx].materialCost || 0;
    }
    if (course.weeklyOptions) {
        const idx = courseState.weeklyIndex || 0;
        return course.weeklyOptions[idx].materialCost || 0;
    }
    let base = course.materials?.[state.age] || 0;
    if (course.addons && courseState.addons) {
        course.addons.forEach(addon => {
            if (courseState.addons[addon.id]) {
                base += (addon.materialsAdd?.[state.age] || 0);
            }
        });
    }
    return base;
}

// ----- Calculations -----
function getSelectedCoursesList() {
    const result = [];
    Object.entries(state.selectedCourses).forEach(([id, cs]) => {
        if (cs.selected && COURSES[id]) {
            result.push({ course: COURSES[id], courseState: cs });
        }
    });
    return result;
}

function updateCalculations() {
    const selected = getSelectedCoursesList();

    // Monthly
    let totalMonthly = 0;
    let totalExamFee = 0;
    let totalEntrance = 0;
    let totalMaterial = 0;
    let totalOneTime = 0;

    const breakdown = [];

    selected.forEach(({ course, courseState }) => {
        let monthly = 0;
        let materialCost = 0;

        if (course.isOneTime && course.options) {
            const opt = course.options[courseState.optionIndex || 0];
            totalOneTime += opt.price;
            materialCost = state.materialOverrides[course.id] ?? opt.materialCost;
            breakdown.push({ name: course.name + '（' + opt.label + '）', monthly: 0, oneTime: opt.price, material: materialCost });
        } else {
            if (course.weeklyOptions) {
                const opt = course.weeklyOptions[courseState.weeklyIndex || 0];
                monthly = opt.monthly;
                materialCost = state.materialOverrides[course.id] ?? opt.materialCost;
            } else {
                monthly = course.monthly;
                // Always use price table (materials[age]) as base material cost
                materialCost = state.materialOverrides[course.id] ?? (course.materials?.[state.age] || 0);
            }

            // Addons
            let addonMonthly = 0;
            let addonMaterial = 0;
            if (course.addons && courseState.addons) {
                course.addons.forEach(addon => {
                    if (courseState.addons[addon.id]) {
                        addonMonthly += addon.monthlyAdd;
                        addonMaterial += (addon.materialsAdd?.[state.age] || 0);
                    }
                });
            }

            // Add addon materials if not manually overridden
            if (state.materialOverrides[course.id] === undefined) {
                materialCost += addonMaterial;
            }

            monthly += addonMonthly;
            totalMonthly += monthly;

            breakdown.push({ name: course.name, monthly, oneTime: 0, material: materialCost });
        }

        totalExamFee += course.examFee || 0;
        totalMaterial += materialCost;

        if (course.entrance > 0) {
            totalEntrance = Math.max(totalEntrance, course.entrance); // Entrance paid once
        }
    });

    // Entrance fee logic
    if (state.entranceType === 'waived') totalEntrance = 0;
    else if (state.entranceType === 'half') totalEntrance = Math.round(totalEntrance / 2);

    // Bag discount
    const bagDiscount = state.bagDiscountEnabled ? (state.bagDiscount || 0) : 0;

    // Update sidebar
    const monthlyEl = $('monthly-total-display');
    const entranceEl = $('entrance-display');
    const materialEl = $('material-display');
    const examEl = $('exam-display');
    const onetimeEl = $('onetime-display');
    const initialEl = $('initial-total-display');
    const grandEl = $('grand-total-display');
    const bagDiscountEl = $('bag-discount-display');
    const bagDiscountRow = $('bag-discount-row');

    const initialTotal = totalEntrance + totalMaterial + totalExamFee + totalOneTime - bagDiscount;
    const grandTotal = totalMonthly + initialTotal;

    // Calculate handmedown deduction details
    let handmedownTotal = 0;
    const handmedownItems = [];
    selected.forEach(({ course, courseState }) => {
        let items = [];
        if (course.materialItems) {
            items = items.concat(course.materialItems.map((item, i) => ({ ...item, source: course.id, index: i })));
        }
        if (course.addons && courseState.addons) {
            course.addons.forEach(addon => {
                if (courseState.addons[addon.id] && addon.materialItemsToAdd) {
                    addon.materialItemsToAdd.forEach((item, i) => {
                        items.push({ ...item, source: course.id + '__' + addon.id, index: i });
                    });
                }
            });
        }
        items.forEach(item => {
            const key = item.source + '_' + item.index;
            const price = state.materialItemOverrides?.[key] !== undefined ? state.materialItemOverrides[key] : item.price;
            if (!!state.handmedowns?.[key] && price > 0) {
                handmedownTotal += price;
                handmedownItems.push({ name: item.name, price });
            }
        });
    });

    // totalMaterial here is already net of handmedowns (from getMaterialItemsTotal)
    // We want to show gross total, so add handmedowns back for display
    const grossMaterial = totalMaterial + handmedownTotal;

    if (monthlyEl) monthlyEl.textContent = `${totalMonthly.toLocaleString()}円`;
    if (entranceEl) entranceEl.textContent = `${totalEntrance.toLocaleString()}円`;
    if (materialEl) materialEl.textContent = `${grossMaterial.toLocaleString()}円`;
    if (examEl) examEl.textContent = `${totalExamFee.toLocaleString()}円`;
    if (onetimeEl) onetimeEl.textContent = `${totalOneTime.toLocaleString()}円`;
    if (bagDiscountEl) bagDiscountEl.textContent = `-${bagDiscount.toLocaleString()}円`;
    if (bagDiscountRow) bagDiscountRow.style.display = bagDiscount > 0 ? 'flex' : 'none';

    // Handmedown deduction display
    const handmedownRow = $('handmedown-deduction-row');
    const handmedownDisplay = $('handmedown-display');
    const handmedownList = $('handmedown-items-list');
    if (handmedownRow) {
        if (handmedownTotal > 0) {
            handmedownRow.style.display = 'block';
            if (handmedownDisplay) handmedownDisplay.textContent = `-${handmedownTotal.toLocaleString()}円`;
            if (handmedownList) {
                handmedownList.innerHTML = handmedownItems.map(h => `• ${h.name} (-¥${h.price.toLocaleString()})`).join('<br>');
            }
        } else {
            handmedownRow.style.display = 'none';
        }
    }

    if (initialEl) initialEl.textContent = `${initialTotal.toLocaleString()}円`;
    if (grandEl) grandEl.textContent = `${grandTotal.toLocaleString()}円`;

    // Breakdown
    const breakdownEl = $('breakdown-list');
    if (breakdownEl) {
        breakdownEl.innerHTML = '';
        if (breakdown.length === 0) {
            breakdownEl.innerHTML = '<div style="opacity:0.6;font-size:0.85rem;">コースを選択してください</div>';
        } else {
            breakdown.forEach(b => {
                if (b.monthly > 0) {
                    breakdownEl.innerHTML += `<div class="breakdown-item"><span>${b.name}</span><span>¥${b.monthly.toLocaleString()}/月</span></div>`;
                }
                if (b.oneTime > 0) {
                    breakdownEl.innerHTML += `<div class="breakdown-item"><span>${b.name}</span><span>¥${b.oneTime.toLocaleString()}</span></div>`;
                }
            });
        }
    }

    // Show/hide exam fee row
    const examRow = $('exam-fee-row');
    if (examRow) examRow.style.display = totalExamFee > 0 ? 'flex' : 'none';
    const onetimeRow = $('onetime-row');
    if (onetimeRow) onetimeRow.style.display = totalOneTime > 0 ? 'flex' : 'none';

    // Store for print
    state._calc = { totalMonthly, totalEntrance, totalMaterial, totalExamFee, totalOneTime, bagDiscount, initialTotal, grandTotal, breakdown };
}

// ----- Generate Estimate -----
function generateEstimate() {
    const calc = state._calc;
    if (!calc || calc.breakdown.length === 0) {
        alert('コースを1つ以上選択してください。');
        return;
    }

    // Date & ID
    const dateStr = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
    const printDate = $('print-date');
    const estId = $('estimate-id');
    if (printDate) printDate.textContent = dateStr;
    if (estId) estId.textContent = Math.floor(100000 + Math.random() * 900000);

    // Estimate expiry & payment deadline
    const formatDate = (val) => {
        if (!val) return '';
        const d = new Date(val);
        return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    const expiryVal = $('estimate-expiry')?.value;
    const deadlineVal = $('payment-deadline')?.value;
    const expiryLine = $('print-expiry-line');
    const deadlineLine = $('print-deadline-line');
    if (expiryLine) {
        if (expiryVal) {
            expiryLine.style.display = 'block';
            $('print-expiry').textContent = formatDate(expiryVal);
        } else {
            expiryLine.style.display = 'none';
        }
    }
    if (deadlineLine) {
        if (deadlineVal) {
            deadlineLine.style.display = 'block';
            $('print-deadline').textContent = formatDate(deadlineVal);
        } else {
            deadlineLine.style.display = 'none';
        }
    }

    // Student name
    const nameEl = $('print-student-name');
    if (nameEl) nameEl.textContent = (state.studentName || '______') + ' 様';

    // Age label
    const ageLabel = AGE_GROUPS.find(a => a.id === state.age)?.label || '';

    // Table body
    const tbody = $('print-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const addRow = (item, detail, price, isNegative) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${item}</td>
      <td>${detail}</td>
      <td style="text-align:right;${isNegative ? 'color:red;' : ''}">${isNegative ? '-' : ''}¥${Math.abs(price).toLocaleString()}</td>`;
        tbody.appendChild(tr);
    };

    const addSectionRow = (label) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="3" style="background:#f9fafb;font-weight:bold;color:#666;font-size:9pt;padding:4px 8px;">${label}</td>`;
        tbody.appendChild(tr);
    };

    const addTotalRow = (label, price, isHighlight) => {
        const tr = document.createElement('tr');
        tr.className = 'summary-row' + (isHighlight ? ' highlight' : '');
        tr.innerHTML = `<td colspan="2">${label}</td><td style="text-align:right;">${isHighlight ? '★ ' : ''}¥${price.toLocaleString()}</td>`;
        tbody.appendChild(tr);
    };

    // --- Monthly section ---
    addSectionRow('【 月額費用 】');
    calc.breakdown.forEach(b => {
        if (b.monthly > 0) addRow('月謝', b.name, b.monthly);
    });
    if (calc.totalMonthly > 0) addTotalRow('月額合計', calc.totalMonthly);

    // --- Initial section ---
    addSectionRow('【 初回諸費用 】');
    if (state.entranceType === 'full' && calc.totalEntrance > 0) {
        addRow('入学金', '通常', calc.totalEntrance);
    } else if (state.entranceType === 'half' && Object.values(state.selectedCourses).some(cs => cs.selected)) {
        const condText = state.entranceConditions.half || '半額免除';
        addRow('入学金', condText, calc.totalEntrance);
    } else if (state.entranceType === 'waived' && Object.values(state.selectedCourses).some(cs => cs.selected)) {
        const condText = state.entranceConditions.full || '全額免除';
        addRow('入学金', condText, 0);
    }
    if (calc.totalExamFee > 0) addRow('検定料', 'ECC全国児童・中学生英語検定', calc.totalExamFee);
    calc.breakdown.forEach(b => {
        if (b.material > 0) addRow('教材費', b.name, b.material);
    });
    calc.breakdown.forEach(b => {
        if (b.oneTime > 0) addRow('受講料', b.name, b.oneTime);
    });
    if (calc.bagDiscount > 0) {
        addRow('スクールバック差引', '代金差引', calc.bagDiscount, true);
    }

    addTotalRow('初回納入金 合計', calc.initialTotal);
    addTotalRow('初回お振込金額（月額 + 初回諸費用）', calc.grandTotal, true);

    // Company info
    const companyContainer = $('print-company-info-container');
    if (companyContainer) {
        const cfg = loadConfigData();
        let html = '<div class="header-company-info">';
        if (cfg.logo) html += `<img src="${cfg.logo}" alt="logo">`;
        html += `<div class="header-company-text">
      <h3>${cfg.company || 'ECCジュニア教室'}</h3>
      <p>〒${cfg.zip || ''}<br>${(cfg.address || '').replace(/\n/g, '<br>')}</p>
      <p>TEL: ${cfg.phone || ''}</p>
      ${cfg.invoice ? `<p style="font-size:8pt;color:#666;">登録番号: ${cfg.invoice}</p>` : ''}
    </div></div>`;
        companyContainer.innerHTML = html;

        // Render active remarks
        const remarksList = $('print-remarks-list');
        if (remarksList) {
            const activeRemarks = state.remarks.filter(r => r.checked);
            if (activeRemarks.length > 0) {
                remarksList.innerHTML = '<ul>' + activeRemarks.map(r => `<li>${r.text}</li>`).join('') + '</ul>';
            } else {
                remarksList.innerHTML = '';
            }
        }

        // Bank info at bottom of remarks
        const bankContainer = $('print-bank-info');
        if (bankContainer) {
            if (cfg.bank) {
                bankContainer.innerHTML = `<p style="margin:0;font-size:9pt;"><strong>【お振込先】</strong><br>${cfg.bank.replace(/\n/g, '<br>')}</p>`;
            } else {
                bankContainer.innerHTML = '';
            }
        }
    }

    // Show print sheet and print
    const sheet = $('printable-estimate');
    if (sheet) {
        sheet.style.display = 'block';
        const originalTitle = document.title;
        const now = new Date();
        const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
        const name = state.studentName || '______';
        document.title = `${ymd}_${name}様`;
        setTimeout(() => {
            window.print();
            document.title = originalTitle;
            sheet.style.display = 'none';
        }, 300);
    }
}

// ----- Config -----
const CONFIG_KEY = 'eccjr_config';
const DEFAULT_CONFIG = {
    company: 'ECCジュニア 藍住教室',
    zip: '771-1252',
    address: '徳島県板野郡藍住町矢上字北分82-1\nテナント新居No.4',
    phone: '088-692-5483',
    invoice: '',
    logo: '',
    bank: 'ゆうちょ銀行\n16210-153351\n名義）犬伏由美'
};

function loadConfigData() {
    try {
        const saved = localStorage.getItem(CONFIG_KEY);
        if (saved) return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    } catch (e) { /* ignore */ }
    return { ...DEFAULT_CONFIG };
}

function loadConfig() {
    const cfg = loadConfigData();
    const set = (id, val) => { const el = $(id); if (el) el.value = val || ''; };
    set('cfg-company', cfg.company);
    set('cfg-zip', cfg.zip);
    set('cfg-address', cfg.address);
    set('cfg-phone', cfg.phone);
    set('cfg-invoice', cfg.invoice);
    set('cfg-bank', cfg.bank);
    if (cfg.logo) {
        const preview = $('logo-preview');
        if (preview) { preview.src = cfg.logo; preview.classList.remove('hidden'); }
    }
}

function saveConfig() {
    const get = id => $(id)?.value || '';
    const cfg = {
        company: get('cfg-company'),
        zip: get('cfg-zip'),
        address: get('cfg-address'),
        phone: get('cfg-phone'),
        invoice: get('cfg-invoice'),
        bank: get('cfg-bank'),
        logo: loadConfigData().logo
    };
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
    $('config-modal')?.classList.remove('open');
}

// Logo
function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
        const cfg = loadConfigData();
        cfg.logo = evt.target.result;
        localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
        const preview = $('logo-preview');
        if (preview) { preview.src = cfg.logo; preview.classList.remove('hidden'); }
    };
    reader.readAsDataURL(file);
}

function clearLogo() {
    const cfg = loadConfigData();
    cfg.logo = '';
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
    const preview = $('logo-preview');
    if (preview) { preview.src = ''; preview.classList.add('hidden'); }
    const input = $('logo-input');
    if (input) input.value = '';
}

// ----- Bootstrap -----
document.addEventListener('DOMContentLoaded', () => {
    loadPricing();
    loadConfig();
    init();

    // Logo handlers
    $('logo-input')?.addEventListener('change', handleLogoUpload);
    $('logo-clear-btn')?.addEventListener('click', clearLogo);
});
