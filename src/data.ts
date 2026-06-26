/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserKOL, Campaign, OrderTransaction, PremiumFan, ExclusivePost, PrivateGroup, AdTrafficEvent } from "./types";

// Dynamic pre-populated high-quality initial states for full simulation

export const INITIAL_KOL_USER: UserKOL = {
  id: "kol_user_01",
  name: "艾米米Amy_Tech",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  niche: "数码科技 & 智能家居",
  followersCount: 45200,
  platforms: [
    { name: "Instagram", username: "@amy_tech_diaries", followers: 28000 },
    { name: "TikTok", username: "@amy_unboxes", followers: 15200 },
    { name: "YouTube", username: "@AmyTech_Official", followers: 2000 }
  ],
  creditScore: 98, // Fair exchange rating
  balance: 3820.00, // 70% share withdrawable
  totalEarnings: 12450.00, // Lifetime total income (70%)
  platformFeesPaid: 5335.71 // 30% service fee paid to platform (12450 / 0.7 * 0.3)
};

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: "camp_01",
    title: "【科大摩登】智能空气净化器PRO 测评招募",
    advertiserId: "adv_01",
    advertiserName: "摩登生活电器",
    advertiserLogo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=100",
    type: "CPS",
    commissionRate: 0.20,
    payoutAmount: 119.80, // $599 sale * 20%
    description: "推广全新科技感流线空气净化器，Instagram图文/TikTok 1分钟视频推荐，下单即返大额佣金。佣金分配：广告主销售结算 -> 30%平台服务费支出，70%归微KOL所有。",
    targetAudience: "年轻白领、精致家庭、高品质家居追求者",
    productUrl: "https://example.com/products/modern-air-purifier",
    productImg: "https://images.unsplash.com/photo-1585338111848-d3e9caddfd1d?auto=format&fit=crop&q=80&w=400",
    banners: [
      "科技流线机身广告主KV海报.jpg",
      "智能APP绑定操控图库.png",
      "静音除菌实验对比动图.gif"
    ],
    totalBudget: 40000,
    spent: 12400,
    status: "active",
    category: "智能家居",
    tags: ["家电", "健康", "Instagram爆款", "智能生活"]
  },
  {
    id: "camp_02",
    title: "【云极云端】AI英语提分助手App 新增注册推广",
    advertiserId: "adv_02",
    advertiserName: "北京极速未来教育",
    advertiserLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=100",
    type: "CPA",
    payoutAmount: 18.00, // 18 CNY per verified registration
    cpaThresholdDescription: "需注册并完成至少1分钟AI英语水平评估测试（有效防作弊）",
    description: "适合学生党、宝妈自媒体博主。引导粉丝下载并体验AI口语互动。CPA佣金18元。30/70拆分后，KOL实得12.6元每次转换。",
    targetAudience: "中小学家长、大学生、口语自学者",
    productUrl: "https://example.com/products/ai-english-tutor",
    productImg: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400",
    banners: [
      "亲子互动体验名师力荐切片.jpg",
      "注册领取5篇精选AI范文流程图.png"
    ],
    totalBudget: 15000,
    spent: 6200,
    status: "active",
    category: "教育软件",
    tags: ["提分", "AI口语", "极速下载", "学生党"]
  },
  {
    id: "camp_03",
    title: "【洛斐复古】极地机械键盘 潮玩测评分享",
    advertiserId: "adv_03",
    advertiserName: "Lofree洛斐精工",
    advertiserLogo: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=100",
    type: "CPS",
    commissionRate: 0.15,
    payoutAmount: 74.85, // $499 sale * 15%
    description: "复古机械开箱美图分享。自带流光背光与温暖键帽音，契合书桌面美学自媒体或科技极简数码KOL投放。",
    targetAudience: "桌面美学党、数码男、潮玩博主、程序员",
    productUrl: "https://example.com/products/retro-keyboard",
    productImg: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=400",
    banners: [
      "莫兰迪暖黄背光精工美感插图.jpg",
      "键轴声波段测试音频下载.wav"
    ],
    totalBudget: 50000,
    spent: 18500,
    status: "active",
    category: "数码外设",
    tags: ["机械键盘", "桌搭美学", "极客", "潮玩"]
  },
  {
    id: "camp_04",
    title: "【肌之秘钥】玻尿酸深层舒缓精华液 爆款分成",
    advertiserId: "adv_04",
    advertiserName: "肌之秘钥美妆集团",
    advertiserLogo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=100",
    type: "CPS",
    commissionRate: 0.35,
    payoutAmount: 90.30, // $258 * 35%
    description: "针对敏感肌定制的深层锁水玻尿酸。35%的高额国货佣金点，适合美妆博主、种草小达人、生活日常分享KOL推广，平台双重防伪追溯保障。",
    targetAudience: "精致女生、敏感肌人群、成分党、美妆控",
    productUrl: "https://example.com/products/hyaluronic-acid-serum",
    productImg: "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&q=80&w=400",
    banners: [
      "美妆成分配方党海报.png",
      "使用前后水润度对比评测.jpg"
    ],
    totalBudget: 60000,
    spent: 24500,
    status: "active",
    category: "美妆时尚",
    tags: ["护肤", "高佣金", "美妆博主", "敏感肌"]
  },
  {
    id: "camp_05",
    title: "【麦格猫粮】鲜肉无谷配方猫粮 宠物号CPS首选",
    advertiserId: "adv_05",
    advertiserName: "麦格宠物食品",
    advertiserLogo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=100",
    type: "CPS",
    commissionRate: 0.25,
    payoutAmount: 49.50, // $198 * 25%
    description: "90%含肉量、无谷无诱食剂的天然健康鲜肉猫粮。支持宠物垂直博主开箱测评和铲屎官博主安利，复购率高、返现极快。",
    targetAudience: "铲屎官、宠物博主、猫咪主子、日常萌宠分享者",
    productUrl: "https://example.com/products/premium-cat-food",
    productImg: "https://images.unsplash.com/photo-1589924691995-400dc9ecc109?auto=format&fit=crop&q=80&w=400",
    banners: [
      "麦格猫粮鲜肉配方细节长图.jpg",
      "多猫试吃好评集锦视频.mp4"
    ],
    totalBudget: 30000,
    spent: 8900,
    status: "active",
    category: "美食萌宠",
    tags: ["猫咪", "铲屎官", "高复购", "宠物推荐"]
  }
];

export const INITIAL_ORDERS: OrderTransaction[] = [
  {
    id: "order_1001",
    campaignId: "camp_01",
    campaignTitle: "摩登生活智能空气净化器PRO",
    kolId: "kol_user_01",
    userId: "fan_vip_01",
    userName: "林晨晨 (Lins)",
    userAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
    userContact: "135****4852",
    type: "CPS",
    orderValue: 599.00,
    grossPayout: 119.80,
    kolShare: 83.86, // 70% of 119.80
    platformShare: 35.94, // 30% of 119.80
    status: "confirmed",
    highValueUser: true, // Spent high
    orderTime: "2026-06-15 14:32"
  },
  {
    id: "order_1002",
    campaignId: "camp_02",
    campaignTitle: "云极AI英语提分助手App",
    kolId: "kol_user_01",
    userId: "fan_vip_02",
    userName: "张晓白",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    userContact: "WhatsApp +1 (415) 555-0102",
    type: "CPA",
    grossPayout: 18.00,
    kolShare: 12.60,
    platformShare: 5.40,
    status: "confirmed",
    highValueUser: false,
    orderTime: "2026-06-15 11:15"
  },
  {
    id: "order_1003",
    campaignId: "camp_01",
    campaignTitle: "摩登生活智能空气净化器PRO",
    kolId: "kol_user_01",
    userId: "fan_vip_03",
    userName: "顾明勋",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    type: "CPS",
    orderValue: 599.00,
    grossPayout: 119.80,
    kolShare: 83.86,
    platformShare: 35.94,
    status: "pending_confirmation", // User has paid, KOL checks / platform auto marks but can dispute
    highValueUser: true,
    orderTime: "2026-06-15 18:22"
  },
  {
    id: "order_1004",
    campaignId: "camp_03",
    campaignTitle: "洛斐极地机械键盘 CPS",
    kolId: "kol_user_01",
    userId: "fan_vip_04",
    userName: "键盘收藏家Tony",
    userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    userContact: "WX id: custom-key-fans",
    type: "CPS",
    orderValue: 499.00,
    grossPayout: 74.85,
    kolShare: 52.40,
    platformShare: 22.45,
    status: "pending_confirmation",
    highValueUser: true,
    orderTime: "2026-06-15 21:05"
  }
];

export const INITIAL_PREMIUM_FANS: PremiumFan[] = [
  {
    id: "fan_vip_01",
    username: "林晨晨 (Lins)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
    tier: "super_premium",
    totalPaid: 1530.00, // Bought purifying air and locked posts
    membershipSince: "2026-03-12",
    isHighValue: true,
    notes: "每次数码测评必看。购买了空气净化器。对智能穿戴、桌面小物件极其有兴趣，乐于高粉赞助。",
    lastActive: "10分钟前"
  },
  {
    id: "fan_vip_03",
    username: "顾明勋",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    tier: "premium",
    totalPaid: 618.00,
    membershipSince: "2026-04-20",
    isHighValue: true,
    notes: "广州粉丝。支持本站桌面升级计划！购买了大摩登净化器。常留言互动讨论降噪效率。",
    lastActive: "1小时前"
  },
  {
    id: "fan_vip_04",
    username: "键盘收藏家Tony",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    tier: "premium",
    totalPaid: 520.00,
    membershipSince: "2026-05-01",
    isHighValue: true,
    notes: "键圈资深玩家。已申请置换洛斐键盘团购福利。高净值桌面垂直粉。",
    lastActive: "刚刚"
  },
  {
    id: "fan_vip_02",
    username: "张晓白",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    tier: "free",
    totalPaid: 18.00, // Downloaded cpa English app
    membershipSince: "2026-06-05",
    isHighValue: false,
    notes: "关注了大学生科技备考。通过AI口语CPA广告进入，活跃度一般。",
    lastActive: "1天前"
  }
];

export const INITIAL_EXCLUSIVE_POSTS: ExclusivePost[] = [
  {
    id: "post_01",
    kolId: "kol_user_01",
    title: "🔒 桌面美学深度拆解 (2026升版计划未公开草案)",
    content: "铁子们！这是我筹备已久的“赛博朋克暖色桌面”的核心配置清单和布光底层公式。包含了3个小众无logo支架品牌、以及双显示器色温平衡技巧。本文章为尊享粉丝专属，解锁后可随时向我私信索要对应精修定制壁纸压缩包！",
    mediaUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800",
    mediaType: "image",
    isPremiumLocked: true,
    unlockPrice: 5.00, // Requires 5 credits / CNY standard
    unlockedByUserIds: ["fan_vip_01", "fan_vip_03"], // Unlocked by VIP
    likes: 24,
    commentsCount: 9,
    createdAt: "2026-06-12"
  },
  {
    id: "post_02",
    kolId: "kol_user_01",
    title: "🔒 极密数码种草避坑：这6款网红家电，谁买谁心碎！",
    content: "很多厂商找过我做这几款的高额CPS，但我良心过不去。今天在闺圈VIP这里，吐槽揭露一些设计存在明显寿命死穴的商品（附带品牌与实机拆解对比图），帮助大家绕开至少上千元的智商税坑！",
    isPremiumLocked: true,
    unlockPrice: 8.00,
    unlockedByUserIds: ["fan_vip_01"],
    likes: 42,
    commentsCount: 15,
    createdAt: "2026-06-14"
  },
  {
    id: "post_03",
    kolId: "kol_user_01",
    title: "📢 【免费放送】自媒体新人的10个无偿工具包（已沉淀私域自取）",
    content: "大家好！今天整理了科技数码排布中我长期使用，不需要版权并且完全可以套用的AE过渡模板、Pr色彩映射LUT预设包、以及无损音频噪音消除软件！全部免费公布！大家可以随时在我右侧「私域社群」卡片扫码加入WhatsApp群在群公告大礼包直接抱走！",
    mediaUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
    mediaType: "image",
    isPremiumLocked: false,
    unlockedByUserIds: [],
    likes: 125,
    commentsCount: 38,
    createdAt: "2026-06-15"
  }
];

export const INITIAL_PRIVATE_GROUPS: PrivateGroup[] = [
  {
    id: "group_01",
    platform: "WhatsApp",
    name: "「科大摩登净化器」CPS复购挚友圈（WhatsApp）",
    qrCode: "WhatsApp群二维码_模拟.png",
    joinLink: "https://chat.whatsapp.com/mock-amy-tech-private-group",
    requiredTier: "premium",
    activeMembers: 148,
    rulesDescription: "专门为购买、咨询【科大摩登空气净化器】的粉丝建立的私域蓄水池。每周一三五，群内直接发专属滤芯立减券、加湿器联动礼包！",
    campaignId: "camp_01",
    campaignTitle: "【科大摩登】智能空气净化器PRO 测评招募",
    coupons: [
      {
        id: "cp_01",
        code: "MORN_FILTER_50",
        discount: "50元无门槛通用券",
        description: "摩登净化器高配除菌滤芯专享优惠券",
        expiry: "2026-09-30",
        distributedCount: 84
      },
      {
        id: "cp_02",
        code: "MORN_VIP_GIFT",
        discount: "免费附赠香薰精油礼盒",
        description: "老客复购净化器主机专享特权礼品券",
        expiry: "2026-08-31",
        distributedCount: 42
      }
    ]
  },
  {
    id: "group_02",
    platform: "Telegram",
    name: "「洛斐Lofree」键盘发烧友极简圈 (Telegram channel)",
    joinLink: "https://t.me/mock_amy_cyber_minimalist",
    requiredTier: "any_fan",
    activeMembers: 840,
    rulesDescription: "针对【洛斐圆点机械键盘】消费者与极客粉丝成立的蓄水池。日常发放限额专属高额大券，深度维护机械键盘爱好者复购及联动键帽采购。",
    campaignId: "camp_03",
    campaignTitle: "【洛斐Lofree】圆点机械键盘春季限定版",
    coupons: [
      {
        id: "cp_03",
        code: "LOFREE_KEY_20",
        discount: "20元满减福利券",
        description: "洛斐圆点机械键盘春季限定版专属福利券",
        expiry: "2026-10-15",
        distributedCount: 192
      }
    ]
  }
];

// Helper to simulate earning metrics
export interface EarningMetrics {
  totalGrossSales: number; // Advertisements total value (e.g. 599+599+599...)
  grossCommissions: number; // Gross payout before split
  kolShare: number; // 70%
  platformShare: number; // 30%
  completedOrdersCount: number;
}

export const INITIAL_AD_TRAFFIC_EVENTS: AdTrafficEvent[] = [
  {
    id: "evt_01",
    username: "数码发烧友阿明",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
    ipAddress: "116.23.119.58",
    location: "广东广州",
    registeredAt: "2026-06-25 10:14:22",
    retentionDays: 7,
    retentionStatus: "active",
    campaignId: "camp_01",
    campaignTitle: "【科大摩登】智能空气净化器PRO",
    payoutAmount: 239.70,
    orderStatus: "paid"
  },
  {
    id: "evt_02",
    username: "甜心草莓派",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100",
    ipAddress: "220.181.108.92",
    location: "北京朝阳",
    registeredAt: "2026-06-25 11:25:01",
    retentionDays: 3,
    retentionStatus: "active",
    campaignId: "camp_04",
    campaignTitle: "【肌之秘钥】玻尿酸深层舒缓精华液",
    payoutAmount: 90.30,
    orderStatus: "failed",
    failureReason: "余额不足",
    isRecovered: false
  },
  {
    id: "evt_03",
    username: "极客老王",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
    ipAddress: "114.242.26.15",
    location: "北京海淀",
    registeredAt: "2026-06-25 12:45:10",
    retentionDays: 1,
    retentionStatus: "active",
    campaignId: "camp_03",
    campaignTitle: "【洛斐Lofree】圆点机械键盘春季限定版",
    payoutAmount: 119.70,
    orderStatus: "registered_only"
  },
  {
    id: "evt_04",
    username: "元气少女小林",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    ipAddress: "117.136.38.112",
    location: "四川成都",
    registeredAt: "2026-06-24 14:22:15",
    retentionDays: 14,
    retentionStatus: "active",
    campaignId: "camp_04",
    campaignTitle: "【肌之秘钥】玻尿酸深层舒缓精华液",
    payoutAmount: 90.30,
    orderStatus: "paid"
  },
  {
    id: "evt_05",
    username: "爱猫猫的小刘",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    ipAddress: "121.33.241.16",
    location: "广东深圳",
    registeredAt: "2026-06-24 16:55:00",
    retentionDays: 7,
    retentionStatus: "active",
    campaignId: "camp_05",
    campaignTitle: "【麦格猫粮】鲜肉无谷配方猫粮",
    payoutAmount: 49.50,
    orderStatus: "failed",
    failureReason: "超时未支付",
    isRecovered: false
  },
  {
    id: "evt_06",
    username: "考研上岸小雷",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    ipAddress: "183.129.210.45",
    location: "浙江杭州",
    registeredAt: "2026-06-23 09:30:12",
    retentionDays: 14,
    retentionStatus: "active",
    campaignId: "camp_02",
    campaignTitle: "【流利英学】AI口语私享课推广包",
    payoutAmount: 18.00,
    orderStatus: "paid"
  },
  {
    id: "evt_07",
    username: "科技探索官",
    avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=100",
    ipAddress: "223.104.20.89",
    location: "上海浦东",
    registeredAt: "2026-06-23 11:15:40",
    retentionDays: 3,
    retentionStatus: "active",
    campaignId: "camp_03",
    campaignTitle: "【洛斐Lofree】圆点机械键盘春季限定版",
    payoutAmount: 119.70,
    orderStatus: "failed",
    failureReason: "风控拦截",
    isRecovered: false
  },
  {
    id: "evt_08",
    username: "键盘侠95",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100",
    ipAddress: "123.125.114.22",
    location: "辽宁沈阳",
    registeredAt: "2026-06-22 17:40:02",
    retentionDays: 0,
    retentionStatus: "inactive",
    campaignId: "camp_03",
    campaignTitle: "【洛斐Lofree】圆点机械键盘春季限定版",
    payoutAmount: 119.70,
    orderStatus: "failed",
    failureReason: "手动放弃付款",
    isRecovered: false
  }
];

export const INITIAL_KOL_APPLICATIONS: any[] = [
  {
    id: "app_01",
    campaignId: "camp_01",
    campaignTitle: "【科大摩登】智能空气净化器PRO",
    kolName: "TechVibe Review",
    kolAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    niche: "Tech & Smart Gadgets",
    followersCount: 84000,
    creditScore: 99,
    platform: "YouTube",
    socialHandle: "@TechVibe_Official",
    pitch: "I make high-production tech reviews. I'd love to review this air purifier on my channel. I can make an unboxing video and share a dedicated discount link.",
    status: "pending"
  },
  {
    id: "app_02",
    campaignId: "camp_01",
    campaignTitle: "【科大摩登】智能空气净化器PRO",
    kolName: "Elena Lifestyle",
    kolAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    niche: "Home Decor & Family",
    followersCount: 12500,
    creditScore: 95,
    platform: "Instagram",
    socialHandle: "@elena_cozy_home",
    pitch: "My audience consists of mothers and interior design enthusiasts. An air purifier with sleek design is exactly what they would buy. I can showcase it in my cozy living room Reels.",
    status: "pending"
  },
  {
    id: "app_03",
    campaignId: "camp_02",
    campaignTitle: "【流利英学】AI口语私享课推广包",
    kolName: "Daily English Hacks",
    kolAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    niche: "Education & ESL",
    followersCount: 230000,
    creditScore: 97,
    platform: "TikTok",
    socialHandle: "@daily_eng_hacks",
    pitch: "This AI-powered English course is perfect for my student base. My videos on TikTok get 50k+ views on average. I will create short funny dialogues using this app.",
    status: "pending"
  }
];


