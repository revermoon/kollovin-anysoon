/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  INITIAL_KOL_USER,
  INITIAL_CAMPAIGNS,
  INITIAL_ORDERS,
  INITIAL_PREMIUM_FANS,
  INITIAL_EXCLUSIVE_POSTS,
  INITIAL_PRIVATE_GROUPS,
  INITIAL_AD_TRAFFIC_EVENTS,
  INITIAL_KOL_APPLICATIONS,
} from "./data";
import {
  UserKOL,
  Campaign,
  OrderTransaction,
  PremiumFan,
  ExclusivePost,
  PrivateGroup,
  AICreativeInput,
  AICreativeOutput,
  AdTrafficEvent,
  KOLApplication,
} from "./types";
import { LOCALES } from "./locales";

import {
  TrendingUp,
  Users,
  Percent,
  Sparkles,
  Crown,
  Share2,
  Wallet,
  Settings,
  Plus,
  PlusCircle,
  Check,
  CheckCircle2,
  AlertCircle,
  Copy,
  FolderLock,
  MessageSquare,
  QrCode,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Gift,
  Flame,
  ThumbsUp,
  Lock,
  Unlock,
  Radio,
  Clock,
  Search,
  Filter,
  LogOut,
  AppWindow,
  RotateCcw,
  Download,
  Activity,
  MapPin,
  AlertTriangle,
  HeartHandshake,
  UserCheck,
  RefreshCw,
} from "lucide-react";

export default function App() {
  // Navigation views: "landing" (default official presentation portal) or "app" (simulated creator admin workspace)
  const [viewMode, setViewMode] = useState<"landing" | "app">("landing");

  // Language Support State: "en", "zh", "es", "ja", "fr"
  const [lang, setLang] = useState<"en" | "zh" | "es" | "ja" | "fr">("en");

  // User Role View State: "creator" | "advertiser"
  const [userRole, setUserRole] = useState<"creator" | "advertiser">("creator");

  // Advertiser Dashboard tab selection state
  const [advTab, setAdvTab] = useState<"adv-overview" | "adv-campaigns" | "adv-applications" | "adv-payouts">("adv-overview");

  // Advertiser Escrow Balance
  const [advEscrow, setAdvEscrow] = useState(15000.00);

  // Advertiser KOL Partnership Applications
  const [kolApps, setKolApps] = useState<KOLApplication[]>(INITIAL_KOL_APPLICATIONS);

  // Translation helper function
  const t = (key: keyof typeof LOCALES.en) => {
    const dict = LOCALES[lang] || LOCALES.en;
    return (dict as any)[key] || (LOCALES.en as any)[key] || key;
  };


  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    "analytics" | "campaigns" | "ai-generator" | "premium-feed" | "private-domain"
  >("analytics");

  // State engines with initialized mock metrics
  const [kolUser, setKolUser] = useState<UserKOL>(INITIAL_KOL_USER);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [orders, setOrders] = useState<OrderTransaction[]>(INITIAL_ORDERS);
  const [premiumFans, setPremiumFans] = useState<PremiumFan[]>(INITIAL_PREMIUM_FANS);
  const [exclusivePosts, setExclusivePosts] = useState<ExclusivePost[]>(INITIAL_EXCLUSIVE_POSTS);
  const [privateGroups, setPrivateGroups] = useState<PrivateGroup[]>(INITIAL_PRIVATE_GROUPS);
  
  // Ad traffic and conversion performance events states
  const [adTrafficEvents, setAdTrafficEvents] = useState<AdTrafficEvent[]>(INITIAL_AD_TRAFFIC_EVENTS);
  const [eventSearchText, setEventSearchText] = useState("");
  const [eventFilterStatus, setEventFilterStatus] = useState<"all" | "paid" | "failed" | "registered_only">("all");
  const [eventRecoveryModal, setEventRecoveryModal] = useState<AdTrafficEvent | null>(null);
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [recoveryDiscount, setRecoveryDiscount] = useState("8.5折专属立减");
  const [recoveryChannel, setRecoveryChannel] = useState("AI智能追单关怀短信");

  // Campaign filtering states
  const [campaignSearch, setCampaignSearch] = useState("");
  const [campaignCategory, setCampaignCategory] = useState("全部");
  const [campaignTag, setCampaignTag] = useState("全部");

  // Get all unique tags and categories from campaigns dynamically
  const availableCategories = ["全部", ...Array.from(new Set(INITIAL_CAMPAIGNS.map(c => c.category).filter(Boolean)))];
  const availableTags = ["全部", ...Array.from(new Set(INITIAL_CAMPAIGNS.flatMap(c => c.tags || [])))];

  // Filtered campaigns calculation
  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesSearch =
      camp.title.toLowerCase().includes(campaignSearch.toLowerCase()) ||
      camp.description.toLowerCase().includes(campaignSearch.toLowerCase()) ||
      camp.advertiserName.toLowerCase().includes(campaignSearch.toLowerCase()) ||
      camp.targetAudience.toLowerCase().includes(campaignSearch.toLowerCase());
    
    const matchesCategory =
      campaignCategory === "全部" || camp.category === campaignCategory;
      
    const matchesTag =
      campaignTag === "全部" || (camp.tags && camp.tags.includes(campaignTag));
      
    return matchesSearch && matchesCategory && matchesTag;
  });

  // KOL Promotion Application States
  const [appliedCampaignIds, setAppliedCampaignIds] = useState<string[]>(["camp_01", "camp_02"]);
  const [showApplyPromoLink, setShowApplyPromoLink] = useState<string | null>(null);

  // AI Creative Generator states
  const [aiInput, setAiInput] = useState<AICreativeInput>({
    platform: "Instagram",
    productName: "【科大摩登】智能空气净化器PRO",
    productCategory: "智能家居家电",
    sellingPoints: "1. 净化率高达99.9%, 极速祛除二手烟与甲醛\n2. 卧室超静音温润设计，不打扰睡眠\n3. 极速绑定米家App，手机智能风道监测",
    tone: "精打细算干货风",
    audience: "精致白领、新生代宝妈及敏感鼻患者",
  });
  const [aiOutput, setAiOutput] = useState<AICreativeOutput | null>({
    adTitle: "✨ 敏感鼻自救指南！为了孩子和猫咪，我挑剔对比半个月才选出它！",
    adCopy: "🔥 家里有猫主子、吸烟家属或者小宝宝的铁子们看过来！\n今天艾米必须强推这款【智能空气净化器PRO】。这绝对是我今年买过最不后悔的智能家电了！\n\n💡 深度测评干货拆解：\n🌱 **硬核净化力**：活性炭网+医用级过滤，实测甲醛能迅速降到0.01以下，二手烟雾3分钟吸干净！\n🔇 **极致静音**：晚上睡眠档只有21分贝，安静得完全听不到声音，还有温润小夜灯，特别贴心。\n📱 **全屋联动**：一键配网，出门在外也能通过手机实时调节风道，检测空气质量。\n\n📢 **KOL专属变现通道福利**：\n点击我的置顶评论专属粉丝包邮券购买，直降200元！下单还赠送原装可替换滤芯，赶紧为全家健康囤起来！\n#空气净化器推荐 #数码好物推荐 #家居美学 #赛博桌面 #KOL好物合伙人",
    creativeImgPrompt: "A cozy high-aesthetic bedroom corner setup. The white sleek 'Modern Air Purifier PRO' sits next to a warm nightstand. Delicate ambient light glows. In the background, a pet cat sleeps comfortably on a knit blanket. Natural soft shadows, photorealistic, 4k resolution.",
    interactionIdeas: [
      "🎁 【超级宠粉】在评论区留言晒出你和家里的毛孩子或宝宝合照，下周抽1位粉丝送同款空气净化器滤芯一套！",
      "💬 【互动提问】‘经常觉得鼻炎发作，你觉得是柳絮、油烟还是空气浮尘最大元凶？’ 欢迎在下方大PK！",
      "👑 【特权私域】想深入了解除甲醛效果对比报告的宝子，点击右侧‘VIP私域群’私聊发你极密对比PDF手册！"
    ]
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // OnlyFans Style custom post creation
  const [unlockModalPost, setUnlockModalPost] = useState<ExclusivePost | null>(null);
  const [privatePostTitle, setPrivatePostTitle] = useState("");
  const [privatePostText, setPrivatePostText] = useState("");
  const [privatePostPrice, setPrivatePostPrice] = useState(5);
  const [privatePostLocked, setPrivatePostLocked] = useState(true);

  // Private domain custom input
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [selectedCampaignPoolId, setSelectedCampaignPoolId] = useState<string>("all");
  const [showCreatePoolModal, setShowCreatePoolModal] = useState(false);
  const [newPoolCampaignId, setNewPoolCampaignId] = useState("");
  const [newPoolName, setNewPoolName] = useState("");
  const [newPoolPlatform, setNewPoolPlatform] = useState<'WhatsApp' | 'Telegram' | 'Discord' | 'Messenger' | 'Other'>("WhatsApp");
  const [newPoolJoinLink, setNewPoolJoinLink] = useState("");
  const [newPoolRequiredTier, setNewPoolRequiredTier] = useState<'any_fan' | 'premium' | 'super_premium'>("any_fan");
  const [newPoolRules, setNewPoolRules] = useState("");

  const [showAddCouponForm, setShowAddCouponForm] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState("");
  const [newCouponDesc, setNewCouponDesc] = useState("");
  const [newCouponExpiry, setNewCouponExpiry] = useState("2026-12-31");

  // Advertiser states for launching a new campaign
  const [newAdTitle, setNewAdTitle] = useState("");
  const [newAdType, setNewAdType] = useState<'CPS' | 'CPA'>("CPS");
  const [newAdRate, setNewAdRate] = useState(0.15); // e.g., 15% CPS
  const [newAdPayoutBasis, setNewAdPayoutBasis] = useState(200); // e.g., $200 basis product price
  const [newAdBudget, setNewAdBudget] = useState(5000);
  const [newAdUrl, setNewAdUrl] = useState("https://example.com/products/next-gen-purifier");
  const [newAdImg, setNewAdImg] = useState("https://images.unsplash.com/photo-1585338111848-d3e9caddfd1d?auto=format&fit=crop&q=80&w=400");
  const [newAdTarget, setNewAdTarget] = useState("Young adults, pet owners, healthy-living seekers");
  const [newAdCategory, setNewAdCategory] = useState("Smart Home");
  const [newAdTagsStr, setNewAdTagsStr] = useState("Gadget, Health, Eco-Friendly");
  const [newAdDesc, setNewAdDesc] = useState("Launch campaign of our pristine modern air purifier, designed for style and pure clean living rooms.");
  
  // Advertiser modal trigger state
  const [showCreateAdModal, setShowCreateAdModal] = useState(false);

  // Temporary notifications toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdTitle || !newAdUrl || !newAdDesc) {
      triggerToast("⚠️ Please fill in all required fields!");
      return;
    }

    const calculatedPayout = newAdType === 'CPS' ? (newAdPayoutBasis * newAdRate) : newAdRate;

    const newCamp: Campaign = {
      id: `camp_user_${Date.now()}`,
      title: newAdTitle,
      advertiserId: "adv_current_user",
      advertiserName: "Global Tech Brands Inc.",
      advertiserLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100",
      type: newAdType,
      commissionRate: newAdType === 'CPS' ? newAdRate : undefined,
      payoutAmount: parseFloat(calculatedPayout.toFixed(2)),
      description: newAdDesc,
      targetAudience: newAdTarget,
      productUrl: newAdUrl,
      productImg: newAdImg || "https://images.unsplash.com/photo-1585338111848-d3e9caddfd1d?auto=format&fit=crop&q=80&w=400",
      banners: [
        newAdImg,
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400"
      ],
      totalBudget: newAdBudget,
      spent: 0,
      status: "active",
      category: newAdCategory,
      tags: newAdTagsStr.split(",").map(t => t.trim()).filter(Boolean)
    };

    if (advEscrow < newAdBudget) {
      triggerToast("❌ Insufficient Escrow Balance to deploy this campaign! Please deposit more funds first.");
      return;
    }

    setAdvEscrow(prev => prev - newAdBudget);
    setCampaigns([newCamp, ...campaigns]);
    setShowCreateAdModal(false);
    
    setNewAdTitle("");
    setNewAdUrl("");
    setNewAdDesc("");
    triggerToast(`🎉 Successfully launched new campaign "${newAdTitle}" with $${newAdBudget} allocated to Escrow!`);
  };

  const handleAddEscrowBudget = () => {
    setAdvEscrow(prev => prev + 5000);
    triggerToast("💳 Successfully deposited $5,000.00 to Escrow Balance!");
  };

  const handleApproveApp = (appId: string) => {
    const matchedApp = kolApps.find(a => a.id === appId);
    if (!matchedApp) return;

    setKolApps(kolApps.map(a => a.id === appId ? { ...a, status: 'approved' } : a));
    setAppliedCampaignIds([...appliedCampaignIds, matchedApp.campaignId]);

    const mockTx: OrderTransaction = {
      id: `ord_sim_${Date.now()}`,
      campaignId: matchedApp.campaignId,
      campaignTitle: matchedApp.campaignTitle,
      kolId: "kol_user_01",
      userId: `fan_${Date.now()}`,
      userName: `Fan of ${matchedApp.kolName}`,
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      type: "CPS",
      orderValue: 599.00,
      grossPayout: 119.80,
      kolShare: 83.86,
      platformShare: 35.94,
      status: "pending_confirmation",
      highValueUser: Math.random() > 0.5,
      orderTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setOrders([mockTx, ...orders]);

    triggerToast(`🤝 Approved partnership from "${matchedApp.kolName}" for "${matchedApp.campaignTitle}"! Generated tracking-link.`);
  };

  const handleDeclineApp = (appId: string) => {
    setKolApps(kolApps.map(a => a.id === appId ? { ...a, status: 'rejected' } : a));
    triggerToast("🤝 Application declined.");
  };

  const handleSettlePendingPayouts = () => {
    const pendingTxs = orders.filter(o => o.status === 'pending_confirmation');
    if (pendingTxs.length === 0) {
      triggerToast("ℹ️ No pending confirmation payouts to settle.");
      return;
    }

    const updatedOrders = orders.map(o => {
      if (o.status === 'pending_confirmation') {
        return { ...o, status: 'confirmed' as const };
      }
      return o;
    });

    const totalKolShare = pendingTxs.reduce((acc, curr) => acc + curr.kolShare, 0);

    setOrders(updatedOrders);
    setKolUser(prev => ({
      ...prev,
      balance: prev.balance + totalKolShare
    }));

    triggerToast(`💰 Successfully settled ${pendingTxs.length} pending conversions! Transferred $${totalKolShare.toFixed(2)} directly to Creator's ledger.`);
  };


  const handleCreatePool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPoolName || !newPoolJoinLink) {
      triggerToast("⚠️ 请填写完整的名称和跳转链接！");
      return;
    }
    const matchedCampaign = campaigns.find(c => c.id === newPoolCampaignId);
    const newGroup: PrivateGroup = {
      id: `group_user_${Date.now()}`,
      platform: newPoolPlatform,
      name: newPoolName,
      joinLink: newPoolJoinLink,
      requiredTier: newPoolRequiredTier,
      activeMembers: Math.floor(10 + Math.random() * 50),
      rulesDescription: newPoolRules || `针对【${matchedCampaign?.title || "专属广告"}】消费者建立的私域社群。日常解答产品体验，并不定期发放新粉丝福利特权！`,
      campaignId: newPoolCampaignId || undefined,
      campaignTitle: matchedCampaign?.title,
      coupons: [
        {
          id: `cp_init_${Date.now()}`,
          code: "WELCOME_NEW_POOL",
          discount: "首单尊享立减券",
          description: "专属入群见面礼福利优惠券",
          expiry: "2026-12-31",
          distributedCount: 0
        }
      ]
    };
    setPrivateGroups([...privateGroups, newGroup]);
    setShowCreatePoolModal(false);
    setNewPoolName("");
    setNewPoolJoinLink("");
    setNewPoolRules("");
    triggerToast(`🎉 成功为广告 [${matchedCampaign ? matchedCampaign.title.split("】")[0].replace("【", "") : "自主产品"}] 创建了专属私域蓄水池！`);
  };

  const handleAddCouponToPool = (groupId: string) => {
    if (!newCouponCode || !newCouponDiscount) {
      triggerToast("⚠️ 请填写完整的优惠码和折扣额度！");
      return;
    }
    const updatedGroups = privateGroups.map(g => {
      if (g.id === groupId) {
        const couponsList = g.coupons || [];
        return {
          ...g,
          coupons: [
            ...couponsList,
            {
              id: `cp_${Date.now()}`,
              code: newCouponCode.toUpperCase(),
              discount: newCouponDiscount,
              description: newCouponDesc || "社群专属复购特权券",
              expiry: newCouponExpiry,
              distributedCount: 0
            }
          ]
        };
      }
      return g;
    });
    setPrivateGroups(updatedGroups);
    setShowAddCouponForm(false);
    setNewCouponCode("");
    setNewCouponDiscount("");
    setNewCouponDesc("");
    triggerToast(`🎟️ 成功在蓄水池内新增专属福利 [${newCouponCode.toUpperCase()}]！已向该社群所有活跃粉丝推送通知。`);
  };

  // Run initial call check to API health
  const [serverOnline, setServerOnline] = useState(false);
  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        if (res.ok) setServerOnline(true);
      })
      .catch((err) => {
        console.log("Local Express endpoint unreachable. Running with robust simulated mock backup.", err);
      });
  }, []);

  // Request material from Gemini express endpoint
  const handleGenerateAICopy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.productName.trim()) {
      triggerToast("⚠️ 请先输入推广的产品名称");
      return;
    }
    setAiLoading(true);
    setAiError(null);

    try {
      const response = await fetch("/api/creatives/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aiInput),
      });

      if (!response.ok) {
        throw new Error(`Server returned code: ${response.status}`);
      }
      const data = await response.json();
      setAiOutput({
        adTitle: data.adTitle,
        adCopy: data.adCopy,
        creativeImgPrompt: data.creativeImgPrompt,
        interactionIdeas: data.interactionIdeas || []
      });
      triggerToast("🚀 AI 广告创意素材生成成功！");
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "An error occurred");
      triggerToast("⚠️ 无法连接到AI服务器，使用内置极速生成器输出模板。");
    } finally {
      setAiLoading(false);
    }
  };

  // Approve a pending CPS tracking order
  const handleApproveOrder = (orderId: string) => {
    const updated = orders.map((ord) => {
      if (ord.id === orderId) {
        // Adjust balance! Platform fees paid, earnings accrued
        if (ord.status !== "confirmed") {
          const userUpdated = { ...kolUser };
          userUpdated.balance += ord.kolShare;
          userUpdated.totalEarnings += ord.kolShare;
          userUpdated.platformFeesPaid += ord.platformShare;
          setKolUser(userUpdated);
        }
        return { ...ord, status: "confirmed" as const };
      }
      return ord;
    });
    setOrders(updated);
    triggerToast(`💰 成功核销订单并入账佣金：+¥${orders.find(o => o.id === orderId)?.kolShare.toFixed(2)}`);
  };

  // Toggle order dispute
  const handleDisputeOrder = (orderId: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: o.status === "disputed" ? "pending_confirmation" : "disputed" } : o));
    triggerToast("⚖️ 订单异常记录已提交。平台审计人员将在24小时内联系品牌方对账。");
  };

  // Export CSV finance statement for tax declarations and external reconciliation
  const handleExportCSV = () => {
    try {
      const headers = [
        "订单/结算ID",
        "推广商品/项目名称",
        "业务类型(CPS/CPA)",
        "订单总金额(元)",
        "预估总收益(元)",
        "自媒体分成经得70%(元)",
        "平台保留服务费30%(元)",
        "当前核实与结算状态",
        "下单记录时间",
        "推广关联粉丝/支持者",
        "客户联系信息"
      ];

      const rows = orders.map((ord) => {
        const escapeString = (str: string) => `"${str.replace(/"/g, '""')}"`;
        const typeStr = ord.type === "CPS" ? "CPS销售分成" : "CPA注册拉新";
        const valStr = ord.orderValue !== undefined ? ord.orderValue.toFixed(2) : "0.00";
        const totalPayout = ord.grossPayout.toFixed(2);
        const kolShare = ord.kolShare.toFixed(2);
        const platformShare = ord.platformShare.toFixed(2);
        
        let statusStr = "未知状态";
        if (ord.status === "confirmed") statusStr = "已确权/已入账";
        else if (ord.status === "pending_confirmation") statusStr = "待品牌方确权(在途)";
        else if (ord.status === "disputed") statusStr = "商户核销异常争议";

        return [
          ord.id,
          escapeString(ord.campaignTitle),
          typeStr,
          valStr,
          totalPayout,
          kolShare,
          platformShare,
          statusStr,
          ord.orderTime,
          escapeString(ord.userName),
          ord.userContact ? escapeString(ord.userContact) : "未记录"
        ];
      });

      const csvStr = "\uFEFF" + [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
      const blob = new Blob([csvStr], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Kollovin_自媒体财务明细与对账报表_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      triggerToast("📥 KOL 财务报表 (CSV) 导出成功！已包含所有结算明细及 70/30 分税模型。");
    } catch (err: any) {
      console.error(err);
      triggerToast("⚠️ 导出报表失败，发生异常: " + (err.message || err));
    }
  };

  // Add exclusive post
  const handleCreateExclusivePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privatePostTitle.trim() || !privatePostText.trim()) {
      triggerToast("⚠️ 请填写完整的标题与正文内容");
      return;
    }

    const newPost: ExclusivePost = {
      id: `post_${Date.now()}`,
      kolId: kolUser.id,
      title: privatePostTitle,
      content: privatePostText,
      isPremiumLocked: privatePostLocked,
      unlockPrice: privatePostLocked ? privatePostPrice : undefined,
      unlockedByUserIds: [],
      likes: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString().split("T")[0]
    };

    setExclusivePosts([newPost, ...exclusivePosts]);
    setPrivatePostTitle("");
    setPrivatePostText("");
    triggerToast("✨ 秘圈专属动态已成功广播给订阅粉丝！");
  };

  // Pay to unlock a simulation post (OnlyFans emulation)
  const handleUnlockPostSimulated = (post: ExclusivePost) => {
    if (post.unlockedByUserIds.includes(kolUser.id) || !post.isPremiumLocked) return;

    // Direct simulate fan unlocking (add direct CNY to KOL's mock earnings)
    const price = post.unlockPrice || 5;
    const kolShare = parseFloat((price * 0.70).toFixed(2));
    const platformShare = parseFloat((price * 0.30).toFixed(2));

    const updatedPosts = exclusivePosts.map((p) => {
      if (p.id === post.id) {
        return {
          ...p,
          unlockedByUserIds: [...p.unlockedByUserIds, kolUser.id]
        };
      }
      return p;
    });

    setExclusivePosts(updatedPosts);

    // Increase user balance on behalf of random VIP fan support
    const updatedUser = { ...kolUser };
    updatedUser.balance += kolShare;
    updatedUser.totalEarnings += kolShare;
    updatedUser.platformFeesPaid += platformShare;
    setKolUser(updatedUser);

    setUnlockModalPost(null);
    triggerToast(`🎉 解锁成功！KOL实得变现分成：+¥${kolShare} (70%)，平台分成：¥${platformShare} (30%)`);
  };

  // Withdraw simulation
  const handleWithdrawal = () => {
    if (kolUser.balance < 100) {
      triggerToast("⚠️ 当前余额不足¥100起提门槛，快快通过推广赚取吧！");
      return;
    }
    const amt = kolUser.balance;
    setKolUser({
      ...kolUser,
      balance: 0
    });
    triggerToast(`🏦 提现成功！已向您的预留账户划款：¥${amt.toFixed(2)} 元 (到账中)`);
  };

  // ================= ADVERTISER DASHBOARD RENDERERS =================
  const renderAdvertiserOverview = () => {
    const activeCamps = campaigns.filter(c => c.advertiserId === "adv_current_user" || c.id.startsWith("camp_user_"));
    const pendingAppsCount = kolApps.filter(a => a.status === 'pending').length;
    const approvedKolsCount = kolApps.filter(a => a.status === 'approved').length + 3;
    const confirmedOrders = orders.filter(o => o.status === 'confirmed');
    const totalPayoutCompleted = confirmedOrders.reduce((sum, o) => sum + o.kolShare, 0) + 14890.00;
    const pendingPayoutSum = orders.filter(o => o.status === 'pending_confirmation').reduce((sum, o) => sum + o.kolShare, 0);

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              <span>{t("tabAdvOverview")}</span>
              <span className="text-xs bg-indigo-50 text-indigo-600 font-extrabold uppercase px-2 py-0.5 rounded-full border border-indigo-100">Corp Admin</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Analyze micro-KOL conversion ROI, manage global escrow payouts, and coordinate influencer campaigns.
            </p>
          </div>
          <button
            onClick={handleAddEscrowBudget}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold px-4 py-2.5 rounded-xl shadow-md shadow-amber-500/10 text-xs transition-all cursor-pointer group"
          >
            <Plus className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>{t("advAddBudget")}</span>
          </button>
        </div>

        {/* Bento Grid Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Escrow card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/5 to-transparent rounded-full blur-xl"></div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">{t("advBudgetEscrow")}</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1.5 block">
                  ${advEscrow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] text-amber-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Securely held for auto-settlement</span>
            </div>
          </div>

          {/* Active Campaigns Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">{t("advActiveCampaigns")}</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1.5 block">
                  {activeCamps.length + 3}
                </span>
              </div>
              <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-500">
                <PlusCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>CPS & CPA Models</span>
              <span className="text-emerald-500 font-extrabold">{activeCamps.filter(c => c.status === 'active').length + 3} Live</span>
            </div>
          </div>

          {/* Promoters Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">{t("advTotalApprovedKols")}</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1.5 block">
                  {approvedKolsCount}
                </span>
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-500">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>Partnership approved</span>
              {pendingAppsCount > 0 && (
                <span className="text-rose-500 font-bold animate-pulse">{pendingAppsCount} pending</span>
              )}
            </div>
          </div>

          {/* Payout Completed Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">{t("advTotalPayoutSent")}</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1.5 block">
                  ${totalPayoutCompleted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-2.5 bg-rose-50 rounded-xl text-rose-500">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>Accumulated transfers</span>
              {pendingPayoutSum > 0 && (
                <span className="text-amber-500 font-semibold">${pendingPayoutSum.toFixed(2)} uncleared</span>
              )}
            </div>
          </div>
        </div>

        {/* ROI Breakdown & Information split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Campaign Performance visual list */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm">{t("advCampaignPerformanceTitle")}</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Real-time track records from approved influencer affiliate codes.</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 font-extrabold text-[10px] px-2.5 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
                <span>{t("advAverageROI")}: 4.8x</span>
              </span>
            </div>

            <div className="space-y-4">
              {campaigns.map((camp, idx) => {
                const calculatedClicks = 320 + (idx * 145);
                const calculatedSales = 45 + (idx * 23);
                const calculatedRoi = (3.5 + (idx * 0.7)).toFixed(1);
                const budgetProgress = Math.min(100, Math.floor(((camp.totalBudget - (idx * 800)) / camp.totalBudget) * 100));

                return (
                  <div key={camp.id} className="p-3.5 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <img
                        src={camp.productImg}
                        alt={camp.title}
                        className="w-11 h-11 rounded-lg object-cover ring-1 ring-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs truncate max-w-[200px] sm:max-w-[280px]">{camp.title}</h4>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">{camp.type}</span>
                          <span>{camp.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Clicks</span>
                        <span className="font-extrabold text-slate-700 font-mono block mt-0.5">{calculatedClicks}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Sales</span>
                        <span className="font-extrabold text-slate-700 font-mono block mt-0.5">{calculatedSales}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Est. ROI</span>
                        <span className="font-extrabold text-indigo-600 block mt-0.5 font-mono">{calculatedRoi}x</span>
                      </div>
                    </div>

                    <div className="w-full sm:w-28 flex flex-col gap-1 self-center">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Budget allocation</span>
                        <span className="font-bold text-slate-600 font-mono">{budgetProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${budgetProgress}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Split info box & Top micro-KOL list */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-xl"></div>
              <h3 className="font-extrabold text-slate-200 text-xs flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Smart Multi-Country i18n Guard</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed">
                {t("advPlatformShareNote")}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 text-center text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Creator ledger</span>
                  <span className="text-emerald-400 font-extrabold block mt-0.5">70% Net Split</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Platform fee</span>
                  <span className="text-slate-300 font-extrabold block mt-0.5">30% Fixed Fee</span>
                </div>
              </div>
            </div>

            {/* Simulated Hot micro-KOL leaders */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-extrabold text-slate-800 text-xs">Top Active Promoters (This Week)</h3>
                <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Ranked by actual conversions generated</p>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Amy Lin (晓晓)", niche: "Smart Living", followers: "4.5k", conversionRate: "4.8%", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100", sales: "$3,450" },
                  { name: "Kellen Tech", niche: "Geek Gadgets", followers: "8.9k", conversionRate: "4.1%", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100", sales: "$2,890" },
                  { name: "Mona Study", niche: "Office Design", followers: "1.2k", conversionRate: "5.2%", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100", sales: "$1,560" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-100" />
                      <div>
                        <h4 className="font-bold text-slate-700 leading-tight">{item.name}</h4>
                        <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1 py-0.2 rounded mt-0.5 inline-block font-medium">{item.niche}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-800 font-mono block">{item.sales}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">{item.followers} followers</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAdvertiserCampaigns = () => {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-1.5">
              <span>{t("tabAdvCampaigns")}</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {t("advCreateAdDesc")}
            </p>
          </div>
          <button
            onClick={() => setShowCreateAdModal(prev => !prev)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/15 text-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{showCreateAdModal ? "Collapse Creator Form" : t("advCreateAdTitle")}</span>
          </button>
        </div>

        {/* Campaign Creation Form (Bento Interactive style) */}
        {showCreateAdModal && (
          <div className="bg-white rounded-2xl border-2 border-indigo-500/20 p-6 shadow-xl space-y-4 animate-scale-up">
            <div className="border-b pb-3">
              <h2 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>{t("advCreateAdTitle")}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Fill out the specifications below. The campaign will instantly publish to the micro-KOL Campaign Marketplace.
              </p>
            </div>

            <form onSubmit={handleCreateCampaign} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Form Input fields */}
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("formAdTitle")}</label>
                    <input
                      type="text"
                      required
                      value={newAdTitle}
                      onChange={e => setNewAdTitle(e.target.value)}
                      placeholder="e.g. NextGen Ultra-Quiet Air Purifier"
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("formAdType")}</label>
                      <select
                        value={newAdType}
                        onChange={e => setNewAdType(e.target.value as 'CPS' | 'CPA')}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-indigo-700 outline-none"
                      >
                        <option value="CPS">CPS (Commissions %)</option>
                        <option value="CPA">CPA (Fixed Payout)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {newAdType === 'CPS' ? "Commission Rate" : "CPA Fixed Reward ($)"}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={newAdRate}
                        onChange={e => setNewAdRate(parseFloat(e.target.value))}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("formAdAmount")}</label>
                    <input
                      type="number"
                      required
                      value={newAdPayoutBasis}
                      onChange={e => setNewAdPayoutBasis(parseFloat(e.target.value))}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("formAdBudget")}</label>
                    <input
                      type="number"
                      required
                      value={newAdBudget}
                      onChange={e => setNewAdBudget(parseInt(e.target.value))}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("formAdCategory")}</label>
                    <input
                      type="text"
                      required
                      value={newAdCategory}
                      onChange={e => setNewAdCategory(e.target.value)}
                      placeholder="e.g. Smart Home, Tech, Gadget"
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("formAdUrl")}</label>
                    <input
                      type="url"
                      required
                      value={newAdUrl}
                      onChange={e => setNewAdUrl(e.target.value)}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("formAdImg")}</label>
                    <input
                      type="url"
                      required
                      value={newAdImg}
                      onChange={e => setNewAdImg(e.target.value)}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("formAdTarget")}</label>
                    <input
                      type="text"
                      value={newAdTarget}
                      onChange={e => setNewAdTarget(e.target.value)}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("formAdTags")}</label>
                    <input
                      type="text"
                      value={newAdTagsStr}
                      onChange={e => setNewAdTagsStr(e.target.value)}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("formAdDesc")}</label>
                  <textarea
                    required
                    rows={2}
                    value={newAdDesc}
                    onChange={e => setNewAdDesc(e.target.value)}
                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none transition-all focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              {/* LIVE CARD PREVIEW BLOCK */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-500 block">Marketplace Live Preview</span>
                  
                  <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
                    <img
                      src={newAdImg || "https://images.unsplash.com/photo-1585338111848-d3e9caddfd1d?auto=format&fit=crop&q=80&w=400"}
                      alt="Preview"
                      className="w-full h-28 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="p-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{newAdCategory || "Category"}</span>
                        <span className="text-xs font-black text-slate-800 font-mono">
                          {newAdType === 'CPS' ? `${Math.floor(newAdRate * 100)}% CPS` : `$${newAdRate} CPA`}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-[11px] truncate">{newAdTitle || "Your Campaign Title"}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{newAdDesc || "Description overview..."}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Escrow Pledge:</span>
                    <strong className="text-slate-700 font-mono">${newAdBudget.toLocaleString()}</strong>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {t("formAdSubmit")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Campaign Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.map((camp, idx) => {
            const calculatedReward = camp.type === 'CPS' ? `${Math.floor((camp.commissionRate || 0.15) * 100)}%` : `$${camp.payoutAmount}`;

            return (
              <div key={camp.id} className="bg-white rounded-2xl border border-slate-200/85 p-5 shadow-sm hover:border-indigo-500/25 transition-all flex gap-4">
                <img
                  src={camp.productImg}
                  alt={camp.title}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-100 flex-none"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">{camp.category}</span>
                      <span className="text-xs font-black text-indigo-600 font-mono bg-indigo-50 px-2 py-0.5 rounded-full">{calculatedReward} {camp.type}</span>
                    </div>
                    <h3 className="font-extrabold text-slate-800 text-xs truncate" title={camp.title}>{camp.title}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1 leading-relaxed">{camp.description}</p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                    <div className="flex gap-3">
                      <span>Budget: <strong className="text-slate-700 font-mono">${camp.totalBudget.toLocaleString()}</strong></span>
                      <span className="text-emerald-500 font-semibold font-mono">Live</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => triggerToast("📢 Campaign terms copied! Dynamic tracking links updated.")}
                        className="text-indigo-600 hover:underline font-bold"
                      >
                        Edit Terms
                      </button>
                      <span>|</span>
                      <button
                        onClick={() => triggerToast("⏸️ Campaign paused. Micro-KOL application entries are suspended.")}
                        className="text-rose-500 hover:underline font-bold"
                      >
                        Pause
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAdvertiserApplications = () => {
    const pendingApps = kolApps.filter(a => a.status === 'pending');
    const processedApps = kolApps.filter(a => a.status !== 'pending');

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">{t("advApplicationsTitle")}</h1>
          <p className="text-sm text-slate-500 mt-1">{t("advApplicationsDesc")}</p>
        </div>

        {/* Grid Lists split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Pending applicants (2 columns wide) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider text-slate-400">
              Pending Partnerships ({pendingApps.length})
            </h3>

            {pendingApps.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-400 text-xs">
                🎉 All micro-KOL application partnerships have been thoroughly reviewed! Check Approved tab for roster lists.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApps.map(app => (
                  <div key={app.id} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4 hover:border-slate-300 transition-all">
                    {/* Top Row: User details */}
                    <div className="flex items-start justify-between gap-4 border-b pb-3 border-slate-100">
                      <div className="flex items-center gap-3">
                        <img src={app.kolAvatar} alt={app.kolName} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-50" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-extrabold text-slate-800 text-xs">{app.kolName}</h4>
                            <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-mono font-bold">
                              {(app.followers / 1000).toFixed(1)}k Followers
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1 block">Niche: <strong className="text-slate-600">{app.niche}</strong></span>
                        </div>
                      </div>

                      <div className="text-right text-xs">
                        <span className="text-[10px] text-slate-400 block">Trust score</span>
                        <strong className="text-emerald-600 font-extrabold flex items-center gap-1 mt-0.5 justify-end">
                          <StarIcon className="w-3.5 h-3.5 fill-current text-emerald-500" /> {app.creditScore}
                        </strong>
                      </div>
                    </div>

                    {/* Middle Row: Campaign targeted and custom pitch */}
                    <div className="text-xs space-y-2">
                      <div className="flex items-center gap-1 text-slate-500">
                        <span>Applying to promote:</span>
                        <strong className="text-slate-800 font-bold">"{app.campaignTitle}"</strong>
                      </div>
                      
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 italic text-[11px] text-slate-500 leading-relaxed font-sans">
                        "{app.pitch || "I am really excited to share your amazing smart product with my tech-savvy audience in WhatsApp and TikTok! I have planned a customized video review script."}"
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end gap-2 text-xs">
                      <button
                        onClick={() => handleDeclineApp(app.id)}
                        className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg transition-all cursor-pointer"
                      >
                        {t("btnDecline")}
                      </button>
                      <button
                        onClick={() => handleApproveApp(app.id)}
                        className="py-1.5 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-lg shadow-sm transition-all cursor-pointer"
                      >
                        {t("btnApprove")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Processed Applicants (1 column wide) */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider text-slate-400 font-mono">
              Processed Roster ({processedApps.length})
            </h3>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 max-h-[500px] overflow-y-auto">
              {processedApps.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400 italic">No processed applicants yet.</div>
              ) : (
                processedApps.map(app => (
                  <div key={app.id} className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <img src={app.kolAvatar} alt={app.kolName} className="w-8 h-8 rounded-full object-cover" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-700 truncate leading-tight">{app.kolName}</h4>
                        <span className="text-[10px] text-slate-400 mt-0.5 block truncate max-w-[120px]">{app.campaignTitle}</span>
                      </div>
                    </div>

                    <div>
                      {app.status === 'approved' ? (
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">Approved</span>
                      ) : (
                        <span className="bg-rose-50 text-rose-600 text-[9px] px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">Declined</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAdvertiserPayouts = () => {
    const pendingTxs = orders.filter(o => o.status === 'pending_confirmation');
    const confirmedTxs = orders.filter(o => o.status === 'confirmed');

    const totalKOLPendingPayoutSum = pendingTxs.reduce((sum, o) => sum + o.kolShare, 0);
    const totalPlatformFeePendingSum = pendingTxs.reduce((sum, o) => sum + o.platformShare, 0);

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">{t("advBillingTitle")}</h1>
            <p className="text-sm text-slate-500 mt-1">{t("advBillingDesc")}</p>
          </div>
          {pendingTxs.length > 0 && (
            <button
              onClick={handleSettlePendingPayouts}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-extrabold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/10 text-xs transition-all cursor-pointer group"
            >
              <Wallet className="w-4 h-4 text-indigo-100 group-hover:rotate-12 transition-transform" />
              <span>{t("btnSettleAll")}</span>
            </button>
          )}
        </div>

        {/* Dashboard Financial Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-850 relative overflow-hidden">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Deposited Escrow Balance</span>
            <span className="text-2xl font-black text-white font-mono mt-1.5 block">
              ${advEscrow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Fully backed by merchant pledge</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pending Clear Commissions</span>
            <span className="text-2xl font-black text-slate-800 font-mono mt-1.5 block">
              ${totalKOLPendingPayoutSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-amber-500 mt-1.5 block font-semibold">{pendingTxs.length} pending conversions</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Platform support fees</span>
            <span className="text-2xl font-black text-slate-800 font-mono mt-1.5 block">
              ${totalPlatformFeePendingSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-slate-400 mt-1.5 block font-semibold">30% administrative fees</span>
          </div>
        </div>

        {/* Batch Actions and Instructions */}
        {pendingTxs.length > 0 && (
          <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-scale-up">
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                <span>Batch Clear Pending Conversions (${(totalKOLPendingPayoutSum + totalPlatformFeePendingSum).toFixed(2)})</span>
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Clicking batch-clear will instantly settle {pendingTxs.length} outstanding commissions, subtracting from your Escrow Balance and transferring directly to Creator ledgers.
              </p>
            </div>
            <button
              onClick={handleSettlePendingPayouts}
              className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer whitespace-nowrap"
            >
              Confirm and Settlement Payout
            </button>
          </div>
        )}

        {/* Orders Transaction Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b p-4">
            <h3 className="font-extrabold text-slate-800 text-xs">Commission Ledger Ledger Transactions</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                  <th className="p-4">{t("tableTransaction")}</th>
                  <th className="p-4">{t("tableCreator")}</th>
                  <th className="p-4">{t("tableProduct")}</th>
                  <th className="p-4">{t("tablePayout")} (70%)</th>
                  <th className="p-4">{t("tablePlatformFee")} (30%)</th>
                  <th className="p-4">{t("tableStatus")}</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 italic">No conversions generated yet.</td>
                  </tr>
                ) : (
                  orders.map(o => (
                    <tr key={o.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-mono font-bold text-slate-600">{o.id}</td>
                      <td className="p-4 flex items-center gap-2">
                        <img src={o.userAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} alt={o.userName} className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <strong className="text-slate-700 block">Amy Lin (晓晓)</strong>
                          <span className="text-[10px] text-slate-400 font-mono">Fan ID: {o.userName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <strong className="text-slate-700 block">{o.campaignTitle}</strong>
                        <span className="text-[10px] font-mono text-slate-400">Value: ${o.orderValue?.toFixed(2)}</span>
                      </td>
                      <td className="p-4 font-mono font-bold text-slate-950">${o.kolShare.toFixed(2)}</td>
                      <td className="p-4 font-mono text-slate-400">${o.platformShare.toFixed(2)}</td>
                      <td className="p-4">
                        {o.status === 'confirmed' ? (
                          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-extrabold uppercase text-[9px] tracking-wider">Settled & Paid</span>
                        ) : (
                          <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded font-extrabold uppercase text-[9px] tracking-wider animate-pulse">Pending Escrow Release</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const totalGrossOrderSales = orders.reduce((sum, o) => sum + (o.orderValue || 0), 0);
  const totalPlatformFeesCollected = orders.reduce((sum, o) => sum + (o.status === 'confirmed' ? o.platformShare : 0), 0);
  const totalEarningsConfirmed = orders.reduce((sum, o) => sum + (o.status === 'confirmed' ? o.kolShare : 0), 0);
  const pendingEarnings = orders.reduce((sum, o) => sum + (o.status === 'pending_confirmation' ? o.kolShare : 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
      
      {/* Simulation Master Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-4 py-2 flex flex-wrap items-center justify-between gap-3 shadow-inner border-b border-indigo-900">
        <div className="flex items-center gap-3">
          <span className="inline-flex px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-mono text-[10px] font-bold tracking-wider animate-pulse">
            {t("simulatedDualMode")}
          </span>
          <span className="text-slate-300 text-xs font-semibold">
            {t("platformTitle")}
          </span>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 rounded-lg">
            <span className="text-slate-400 text-[10px] font-bold font-mono">{t("langLabel")}</span>
            <select
              value={lang}
              onChange={(e) => {
                setLang(e.target.value as any);
                triggerToast(`🌍 Language changed to ${e.target.value.toUpperCase()}`);
              }}
              className="bg-transparent text-white text-[10px] font-black outline-none cursor-pointer"
            >
              <option value="en" className="text-slate-900 font-medium">English (US)</option>
              <option value="zh" className="text-slate-900 font-medium">简体中文 (ZH)</option>
              <option value="es" className="text-slate-900 font-medium">Español (ES)</option>
              <option value="ja" className="text-slate-900 font-medium">日本語 (JA)</option>
              <option value="fr" className="text-slate-900 font-medium">Français (FR)</option>
            </select>
          </div>

          {/* Perspective Selector (Only when in backoffice app mode) */}
          {viewMode === "app" && (
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 rounded-lg">
              <span className="text-slate-400 text-[10px] font-bold font-mono">{t("changeRole")}</span>
              <select
                value={userRole}
                onChange={(e) => {
                  setUserRole(e.target.value as any);
                  triggerToast(`🔄 Switched to ${e.target.value === "creator" ? "Creator" : "Advertiser"} Workspace!`);
                }}
                className="bg-transparent text-amber-400 text-[10px] font-black outline-none cursor-pointer"
              >
                <option value="creator" className="text-slate-900 font-medium">✍️ Creator Perspective</option>
                <option value="advertiser" className="text-slate-900 font-medium">🏢 Advertiser Perspective</option>
              </select>
            </div>
          )}

          <span className="text-slate-300 text-[11px] hidden sm:inline">
            {t("currentView")}
            <span className="font-extrabold text-amber-400 ml-1">
              {viewMode === "landing" ? t("landingPortal") : (userRole === "creator" ? t("roleCreator") : t("roleAdvertiser"))}
            </span>
          </span>

          <button
            onClick={() => {
              const nextView = viewMode === "landing" ? "app" : "landing";
              setViewMode(nextView);
              triggerToast(nextView === "landing" ? `🌍 ${t("switchToLanding")}` : `⚙️ ${t("switchToConsole")}`);
            }}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black rounded-lg transition-all flex items-center gap-1 border border-white/10 cursor-pointer"
          >
            {viewMode === "landing" ? t("switchToConsole") : t("switchToLanding")}
          </button>
        </div>
      </div>


      {viewMode === "landing" ? (
        <div className="flex-1 flex flex-col animate-fade-in bg-slate-50">
          {/* Custom Landing Page Header */}
          <header className="bg-white/80 sticky top-0 z-40 backdrop-blur-md border-b border-slate-200/50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-rose-500 rounded-xl flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-600/20">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black tracking-tight text-slate-900">Kollovin 平台</span>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-1.5 py-0.5 rounded-md">
                      官方网站
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">中小KOL一站式自媒体成长与自主商业变现网站</p>
                </div>
              </div>

              {/* Nav menu links */}
              <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
                <a href="#services" className="hover:text-indigo-600 transition-colors">核心服务矩阵</a>
                <a href="#stats" className="hover:text-indigo-600 transition-colors">平台真实绩优</a>
                <a href="#vision" className="hover:text-indigo-600 transition-colors">去中心化愿景</a>
              </nav>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setViewMode("app");
                    setActiveTab("analytics");
                    triggerToast("🛠️ 已登录并进入创作者数据对账后台");
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
                >
                  后台对账演示
                </button>
                <button
                  onClick={() => {
                    setViewMode("app");
                    triggerToast("🚀 已快速接入中小博主变现工作台网站！");
                  }}
                  className="px-4.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-xs shadow-md shadow-indigo-600/15 flex items-center gap-1.5 transition-all"
                >
                  <span>立即入驻后台</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </header>

          {/* Live Payout Ticker */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-2 px-6 border-b border-indigo-950 text-xs overflow-hidden relative shadow-inner">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              {/* Left Label */}
              <div className="flex items-center gap-1.5 shrink-0 bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md font-extrabold tracking-wider border border-indigo-500/30 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>平台实时提现播报</span>
              </div>
              
              {/* Scrolling Container */}
              <div className="flex-1 overflow-hidden relative h-5 select-none">
                <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
                  {/* Group 1 */}
                  <div className="flex items-center gap-12">
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      🎨 <strong className="text-white">美妆博主@Lily</strong> <span className="text-slate-400">2分钟前</span> 成功提现 <strong className="text-teal-400">¥3,240.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">CPS销售分成</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      💻 <strong className="text-white">科技KOL@数码小张</strong> <span className="text-slate-400">5分钟前</span> 成功提现 <strong className="text-teal-400">¥1,850.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">CPA拉新结算</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      🍼 <strong className="text-white">母婴达人@宝妈大作战</strong> <span className="text-slate-400">12分钟前</span> 成功提现 <strong className="text-teal-400">¥5,120.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">挚粉秘圈订阅</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      👗 <strong className="text-white">时尚博主@Vicky穿搭记</strong> <span className="text-slate-400">19分钟前</span> 成功提现 <strong className="text-teal-400">¥2,480.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">CPS好物分成</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      🍔 <strong className="text-white">美食博主@七哥爱做饭</strong> <span className="text-slate-400">25分钟前</span> 成功提现 <strong className="text-teal-400">¥1,150.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">CPA推广收益</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      📈 <strong className="text-white">财经博主@老九财经</strong> <span className="text-slate-400">32分钟前</span> 成功提现 <strong className="text-teal-400">¥7,800.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">独家密件解锁</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      🐱 <strong className="text-white">萌宠博主@小猫汪汪</strong> <span className="text-slate-400">45分钟前</span> 成功提现 <strong className="text-teal-400">¥920.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">CPS佣金</span>
                    </span>
                  </div>
                  {/* Group 2 */}
                  <div className="flex items-center gap-12">
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      🎨 <strong className="text-white">美妆博主@Lily</strong> <span className="text-slate-400">2分钟前</span> 成功提现 <strong className="text-teal-400">¥3,240.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">CPS销售分成</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      💻 <strong className="text-white">科技KOL@数码小张</strong> <span className="text-slate-400">5分钟前</span> 成功提现 <strong className="text-teal-400">¥1,850.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">CPA拉新结算</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      🍼 <strong className="text-white">母婴达人@宝妈大作战</strong> <span className="text-slate-400">12分钟前</span> 成功提现 <strong className="text-teal-400">¥5,120.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">挚粉秘圈订阅</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      👗 <strong className="text-white">时尚博主@Vicky穿搭记</strong> <span className="text-slate-400">19分钟前</span> 成功提现 <strong className="text-teal-400">¥2,480.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">CPS好物分成</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      🍔 <strong className="text-white">美食博主@七哥爱做饭</strong> <span className="text-slate-400">25分钟前</span> 成功提现 <strong className="text-teal-400">¥1,150.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">CPA推广收益</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      📈 <strong className="text-white">财经博主@老九财经</strong> <span className="text-slate-400">32分钟前</span> 成功提现 <strong className="text-teal-400">¥7,800.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">独家密件解锁</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      🐱 <strong className="text-white">萌宠博主@小猫汪汪</strong> <span className="text-slate-400">45分钟前</span> 成功提现 <strong className="text-teal-400">¥920.00</strong> <span className="text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.25 rounded">CPS佣金</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <section className="relative overflow-hidden pt-12 pb-20 px-6 bg-radial from-indigo-50/40 via-transparent to-transparent">
            <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold text-[11px] px-3.5 py-1.5 rounded-full mb-6 tracking-wide shadow-sm animate-pulse pointer-events-none">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin-slow" />
                <span>🏆 创作者商业化 · 中小自媒体「高分成、透明对账、自主私域」一站式解绑成长平台</span>
              </div>

              <h1 className="text-3xl sm:text-4.5xl font-black tracking-tight text-slate-900 leading-[1.12]">
                摆脱算法限流与不合规抽成<br />
                <span className="relative inline-block bg-gradient-to-r from-teal-600 via-indigo-600 to-rose-600 bg-clip-text text-transparent px-2.5 py-1">
                  让中小 KOL 拥有高分成、透明的商业化主权
                </span>
              </h1>

              <p className="mt-5 text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
                不作流量的奴隶，不做平台与大MCN压榨下的白工。Kollovin 网站为成长型博主量身研制，主打
                <strong>「安全透明的 70% 高分成 CPS / CPA 选品库」与「OnlyFans 挚粉解密圈」</strong>。
                您辛勤获取的每一份带货实销，皆享行业最高的 <strong>70% 真实分成</strong>，透明结算。
                更有 <strong>Google Gemini 多端文案智写、名片引流 CRM 及精细漏斗数据复盘</strong>，助中小创作者全方位实现体面自由的生活！
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setViewMode("app");
                    setActiveTab("analytics");
                    triggerToast("📊 欢迎！已为您进入创作者精细化数据与收益控制台");
                  }}
                  className="w-full sm:w-auto px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-sm shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all hover:scale-102"
                >
                  <span>立即进入自媒体商业控制后台</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <a
                  href="#services"
                  className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-sm transition-all text-center"
                >
                  了解核心商业化成长套件
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500 font-semibold" id="stats">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  <span>KOL 专属 70% 直分高提成结算</span>
                </div>
                <div className="h-3 w-[1px] bg-slate-300 hidden sm:block"></div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-rose-500" />
                  <span>CPS / CPA 品牌安全高分成实销货源</span>
                </div>
                <div className="h-3 w-[1px] bg-slate-300 hidden sm:block"></div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Google Gemini 生态爆款写作提效 100%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Core Trust Statistics Banner */}
          <section className="py-8 bg-slate-900 text-white border-y border-slate-800 shadow-md">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-2 space-y-1">
                <p className="text-3xl md:text-4.5xl font-black text-indigo-400 font-mono">24,800 +</p>
                <p className="text-[11px] text-slate-400 font-semibold tracking-wider">已入驻变现的中小博主与KOL</p>
              </div>
              <div className="p-2 space-y-1">
                <p className="text-3xl md:text-4.5xl font-black text-cyan-400 font-mono">70 %</p>
                <p className="text-[11px] text-slate-400 font-semibold tracking-wider">自媒体直结净得分成比例</p>
              </div>
              <div className="p-2 space-y-1">
                <p className="text-3xl md:text-4.5xl font-black text-rose-400 font-mono">98.6 %</p>
                <p className="text-[11px] text-slate-400 font-semibold tracking-wider">CPS 防丢单自动对账准确率</p>
              </div>
              <div className="p-2 space-y-1">
                <p className="text-3xl md:text-4.5xl font-black text-emerald-400 font-mono">¥8,940,200</p>
                <p className="text-[11px] text-slate-400 font-semibold tracking-wider">已累计发放博主佣金钱包</p>
              </div>
            </div>
          </section>

          {/* Core Services Section with Direct Sandbox Redirection */}
          <section className="py-16 px-6 max-w-7xl mx-auto" id="services">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
              <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-600 block">核心商业矩阵</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">打通中小 KOL 闭环商业通路</h2>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">
                聚焦高提成货源、私域变现沉淀、智能创作和精细化多端对账，拿回收益主导权。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Service 1: CPS Store */}
              <div
                onClick={() => {
                  setViewMode("app");
                  setActiveTab("campaigns");
                  triggerToast("🛒 已为您直达首发旗舰：CPS / CPA 高佣金智能选品中心");
                }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-rose-500 hover:shadow-lg hover:shadow-rose-500/5 group cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center font-extrabold group-hover:bg-rose-500 group-hover:text-white transition-all">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-rose-600 flex items-center gap-2">
                      <span>CPS/CPA 高分账推广选品中心</span>
                      <span className="text-[9px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-full font-bold">高收益</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      汇聚最新爆款智能家居、个人数码与高成长零食好货。佣金率均在50%-70%范围，由供应链直接结算，杜绝压低分成，拿回每一笔应得款项。
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-600">
                  <span>精选高额佣金商品 (核心变现)</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Service 2: Ad Conversion Analytics & Recovery */}
              <div
                onClick={() => {
                  setViewMode("app");
                  setActiveTab("premium-feed");
                  triggerToast("📊 已为您跳转至：广告效果综合数据分析与智能追单工坊");
                }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 group cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-indigo-600 flex items-center justify-between">
                      <span>广告全链路效果与智能追单</span>
                      <span className="text-[9px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded-md font-bold">精细运营</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      对您的广告数据效果进行多维度穿透分析。查看推广带来的注册量、访客IP地址归属、留存率、实际付费率，全盘掌握CPS推广动态。特别支持“一键追单转化”，精准触达和转化订单失败的流失用户。
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>查看实时广告流量与智能挽回失败订单</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Service 3: Gemini AI Copywriter */}
              <div
                onClick={() => {
                  setViewMode("app");
                  setActiveTab("ai-generator");
                  triggerToast("✨ 已为您跳转至：Gemini AI 种草文案智写台");
                }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/5 group cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-extrabold group-hover:bg-amber-600 group-hover:text-white transition-all">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-amber-600 flex items-center justify-between">
                      <span>Gemini AI 种草与带货文案智写</span>
                      <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md font-bold">尖端 AI</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      依托内置 Google Gemini 大模型系列，提供高热 Instagram/TikTok 风格带货标题、多端痛点安利文案、社群促单话术与带货脚本，高效赋能内容提效 10 倍。
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
                  <span>智能诊断并生成爆款内容</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Service 4: Private CRM */}
              <div
                onClick={() => {
                  setViewMode("app");
                  setActiveTab("private-domain");
                  triggerToast("📱 已为您跳转至：专属私域蓄水池与自建 CRM");
                }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/5 group cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-emerald-600 flex items-center gap-2">
                      <span>专属私域蓄水池与自建 CRM</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">资产自主</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      一键快速配发专属二维码名片与裂变素材引流包。将公域散客粉丝无损、长期、高效沉淀至各人 WhatsApp、Telegram 或 Discord 社群中，确保粉丝资产终身掌控。
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                  <span>设计并获取专属名片</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Service 5: Analytics */}
              <div
                onClick={() => {
                  setViewMode("app");
                  setActiveTab("analytics");
                  triggerToast("📊 已为您跳转至：推广数据精密诊断与透明对账系统");
                }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 group cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-indigo-600 flex items-center gap-2">
                      <span>推广数据精密诊断与透明对账</span>
                      <span className="text-[9px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded-full font-bold">对账不漏</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      拒绝任何一笔漏单、扣量或延期。实时检测交易流水分期记录、对订单待打款进度标记跟踪，提供无懈可击的技术化可视转化率分析面板。
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>查询带货分成对账单</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </section>

          {/* Visions and Corporate Mission Section */}
          <section className="bg-slate-100 py-16 px-6" id="vision">
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
                <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-600 block">我们的立足底色跟愿景</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">消除变现鸿沟 · 拿回个体主动权</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  为什么在全民自媒体时代，最勤恳创作的中尾部博主生活最无确定性？
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Pain Points */}
                <div className="bg-white rounded-2xl p-7 border border-slate-200 flex flex-col justify-between shadow-xs">
                  <div className="space-y-4">
                    <div className="inline-flex px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 font-extrabold text-xs">
                      昔日困局：暗黑榨取与头部围猎
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      在传统的变现丛林中，规则往往令小博主无措：
                    </p>
                    <ul className="space-y-3.5 text-xs text-slate-600 font-medium">
                      <li className="flex items-start gap-2.5">
                        <span className="text-rose-500 flex-none text-base">✕</span>
                        <span><strong>MCN低级压榨</strong>：吃掉大部分利益，分成账目黑盒不公开，KOL净得极少甚至零佣金。</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-rose-500 flex-none text-base">✕</span>
                        <span><strong>高不可攀的接带门槛</strong>：公域平台将派单门槛限死。中尾部博主内容再好也无处获款。</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-rose-500 flex-none text-base">✕</span>
                        <span><strong>结算账目拖欠与黑盒</strong>：带货数据不透明，平台与中介层层克扣，提现困难或结算周期动辄数月。</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-rose-500 flex-none text-base">✕</span>
                        <span><strong>算法清流蒸发</strong>：没有私域沉淀支持，一旦公域平台策略调整，多年的积蓄随封号化为泡影。</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-400">
                    * 导致海量创作者长期陷入付出无变现反馈的死胡同。
                  </div>
                </div>

                {/* Our Mission */}
                <div className="bg-slate-900 text-white rounded-2xl p-7 border border-slate-800 flex flex-col justify-between shadow-lg relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl"></div>
                  <div className="space-y-4 relative z-10">
                    <div className="inline-flex px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-extrabold text-xs">
                      Kollovin远景：共赢共享的平权绿野
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      我们坚信，长尾内容创作者是支撑未来真实的信誉底牌：
                    </p>
                    <ul className="space-y-3.5 text-xs text-slate-300">
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-400 flex-none text-base">✓</span>
                        <span><strong>固定 70% 极高直分分成</strong>：实到每一元的 70% 稳妥归拨入账，平台仅提 30% 做技术托管和AI服务。</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-400 flex-none text-base">✓</span>
                        <span><strong>高爆私密粉订阅圈</strong>：一键搭建极速变现的“挚粉秘圈”，将粉丝转化率大幅拉升，并支持自定义包销价格。</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-400 flex-none text-base">✓</span>
                        <span><strong>Gemini智能化创客辅助</strong>：给个人配备抗衡4A公司的顶级人工智能，高效攻克标题、文案编写难关。</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-400 flex-none text-base">✓</span>
                        <span><strong>完全自治的去中心化私域</strong>：提供高度自动化的社群承接及海报名片输出，让忠粉彻底附属于个体。</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-400 relative z-10">
                    * 赋能尾部毛细血管绽放，让我们依靠内容热忱也能过上体面的自由生活。
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 px-6 max-w-7xl mx-auto" id="testimonials">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
              <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-600 block">博主真实代言与见证</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">在这里找到前行的底气</h2>
              <p className="text-xs text-slate-500">
                看加入本平台的创作者真实反馈：
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-2xl p-6 shadow-xs space-y-4">
                <p className="text-xs text-slate-600 italic leading-relaxed font-serif">
                  “ 以前一个人在家拍视频做自媒体，好物品牌一看我是百粉小号根本不搭理。入驻Kollovin后，有了透明可控的CPS带货体系、一键生成的Gemini科技文案，让我第一期空气净化器就卖出了20几单，实打实分成入账了几百块！还可以顺畅开启核心粉丝专属付费订阅圈与WhatsApp私域闭门沉淀，太友善了！”
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                    alt="Amy"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs text-left">艾米米Amy_Tech</h4>
                    <span className="text-[10px] text-slate-400">数码科技博主 (4.5w 粉丝 Instagram)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-2xl p-6 shadow-xs space-y-4">
                <p className="text-xs text-slate-600 italic leading-relaxed font-serif">
                  “ 自媒体做大最怕公域突然限流。Kollovin教我学会了利用‘独家秘图纸’、‘闭门私域名片’打通去中心化引流WhatsApp/Telegram群的操作。在平台的纯挚粉单篇解锁 and 带货分配模型下，我上个月收益已经顺利超过万元，资金由系统透明对账入账，让人非常有依靠感。”
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                    alt="Qi"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs text-left">美食探店 @七哥爱做饭</h4>
                    <span className="text-[10px] text-slate-400">生活美食KOL (12.4w 粉丝大V)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Landing CTA Card */}
          <section className="px-6 pb-20 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl border border-indigo-800">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 via-indigo-500 to-emerald-500"></div>
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-rose-500/5 rounded-full blur-3xl"></div>

              <div className="relative z-10 max-w-xl mx-auto space-y-6">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                  重掌选择权，兑现长尾价值。<br />
                  免费开启您的自媒体自主时代。
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  加入博主一站式成长生态，无额外隐性扣费，享有行业最具安全保护力量的7:3拆扣引擎。我们为您的热忱铺好底层资产。
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 font-semibold text-xs text-slate-200">
                  <button
                    onClick={() => {
                      setViewMode("app");
                      triggerToast("✨ 成功启动自媒体博主极速商业控制面板！");
                    }}
                    className="w-full sm:w-auto px-8 py-3 bg-white text-indigo-950 hover:bg-slate-100 font-extrabold rounded-xl shadow-lg shadow-black/10 transition-all hover:scale-102 text-xs"
                  >
                    立即进入创作者后台系统 (演示)
                  </button>
                  <button
                    onClick={() => {
                      setViewMode("app");
                      setActiveTab("ai-generator");
                      triggerToast("🤖 已为您拉起内置 Gemini 智能生成大写引擎");
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 hover:bg-indigo-500/35 rounded-xl transition-all text-xs"
                  >
                    体验 Gemini AI 文案工坊
                  </button>
                </div>

                <p className="text-[10px] text-slate-500 pt-1 font-mono">
                  * 平台搭载原生 Express 后端和 Google Cloud 高级安全架构认证
                </p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex flex-1 flex-col md:flex-row max-w-7xl w-full mx-auto p-4 lg:p-6 gap-6">
        
        {/* Left Side Navigation & User Badge Card */}
        <aside className="w-full md:w-64 flex flex-col gap-6" id="aside-sidebar">
          
          {userRole === "creator" ? (
            /* KOL User Profile Panel */
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 overflow-hidden relative animate-fade-in" id="profile-card">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-rose-500/0 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="relative">
                  <img
                    src={kolUser.avatar}
                    alt={kolUser.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/10"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-0.5 rounded-md text-[9px] font-bold shadow">
                    PRO
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 leading-tight">
                    {kolUser.name}
                  </h3>
                  <p className="text-xs text-indigo-600 bg-indigo-50/70 inline-block px-1.5 py-0.5 rounded mt-1 font-medium">
                    {kolUser.niche}
                  </p>
                </div>
              </div>

              {/* Metrics Overview inside dashboard sidebar */}
              <div className="py-4 space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Followers</span>
                  <span className="font-bold text-slate-700 font-mono">{(kolUser.followersCount / 1000).toFixed(1)}k</span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Platform Credit Score</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                    <StarIcon className="w-3 h-3 fill-current" /> {kolUser.creditScore}
                  </span>
                </div>

                {/* Sub Platforms Split */}
                <div className="bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 space-y-1.5">
                  {kolUser.platforms.map((plat, idx) => (
                    <div key={idx} className="flex justify-between text-[11px]">
                      <span className="text-slate-500">{plat.name}</span>
                      <span className="text-slate-700 font-medium font-mono">{plat.username} ({(plat.followers / 1000).toFixed(1)}k)</span>
                    </div>
                  ))}
                </div>

                {/* Balances */}
                <div className="pt-3 border-t border-slate-100 flex flex-col gap-1">
                  <span className="text-[11px] text-slate-400">{t("walletBalance")}</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-black text-indigo-700 font-mono">${kolUser.balance.toFixed(2)}</span>
                    <button
                      onClick={handleWithdrawal}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                    >
                      {t("withdrawBtn")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Brand Advertiser Profile Panel */
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 overflow-hidden relative animate-fade-in" id="advertiser-profile-card">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-indigo-500/0 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-inner">
                    G
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white px-1 py-0.5 rounded text-[8px] font-bold shadow">
                    CORP
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 leading-tight">
                    Global Tech Corp
                  </h3>
                  <p className="text-[10px] text-amber-700 bg-amber-50 inline-block px-1.5 py-0.5 rounded mt-1 font-extrabold uppercase tracking-wide">
                    {t("roleAdvertiser")}
                  </p>
                </div>
              </div>

              {/* Metrics Overview inside dashboard sidebar */}
              <div className="py-4 space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{t("advActiveCampaigns")}</span>
                  <span className="font-extrabold text-slate-700 font-mono">
                    {campaigns.filter(c => c.advertiserId === "adv_current_user" || c.id.startsWith("camp_user_")).length + 3}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Merchant Trust Rating</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                    <StarIcon className="w-3 h-3 fill-current" /> 98%
                  </span>
                </div>

                {/* Escrow Balance */}
                <div className="pt-3 border-t border-slate-100 flex flex-col gap-1">
                  <span className="text-[11px] text-slate-400">{t("advBudgetEscrow")}</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-black text-slate-900 font-mono">${advEscrow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <button
                      onClick={handleAddEscrowBudget}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                    >
                      {t("advAddBudget")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-2" id="navigation-list">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3.5 py-2 block">
              {userRole === "creator" ? t("roleCreator") : t("roleAdvertiser")}
            </span>
            <div className="space-y-1">
              {userRole === "creator" ? (
                <>
                  <button
                    id="tab-analytics"
                    onClick={() => setActiveTab("analytics")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "analytics"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <TrendingUp className="w-4 h-4" />
                      <span>{t("tabAnalytics")}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </button>

                  <button
                    id="tab-campaigns"
                    onClick={() => setActiveTab("campaigns")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "campaigns"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Percent className="w-4 h-4" />
                      <span>{t("tabCampaigns")}</span>
                    </div>
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full ${activeTab === 'campaigns' ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-500'}`}>
                      HOT
                    </span>
                  </button>

                  <button
                    id="tab-ai-generator"
                    onClick={() => setActiveTab("ai-generator")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "ai-generator"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4" />
                      <span>{t("tabAiGenerator")}</span>
                    </div>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto mr-1" />
                  </button>

                  <button
                    id="tab-premium-feed"
                    onClick={() => setActiveTab("premium-feed")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "premium-feed"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Activity className="w-4 h-4 text-indigo-500" />
                      <span>{t("tabPremiumFeed")}</span>
                    </div>
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full ${activeTab === 'premium-feed' ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-600'}`}>
                      PRO
                    </span>
                  </button>

                  <button
                    id="tab-private-domain"
                    onClick={() => setActiveTab("private-domain")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "private-domain"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Share2 className="w-4 h-4" />
                      <span>{t("tabPrivatePool")}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    id="tab-adv-overview"
                    onClick={() => setAdvTab("adv-overview")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      advTab === "adv-overview"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <TrendingUp className="w-4 h-4" />
                      <span>{t("tabAdvOverview")}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </button>

                  <button
                    id="tab-adv-campaigns"
                    onClick={() => setAdvTab("adv-campaigns")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      advTab === "adv-campaigns"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <PlusCircle className="w-4 h-4" />
                      <span>{t("tabAdvCampaigns")}</span>
                    </div>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-50 text-emerald-600">
                      LIVE
                    </span>
                  </button>

                  <button
                    id="tab-adv-applications"
                    onClick={() => setAdvTab("adv-applications")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      advTab === "adv-applications"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4" />
                      <span>{t("tabAdvApplications")}</span>
                    </div>
                    {kolApps.filter(a => a.status === 'pending').length > 0 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-indigo-50 text-indigo-600 animate-pulse">
                        {kolApps.filter(a => a.status === 'pending').length}
                      </span>
                    )}
                  </button>

                  <button
                    id="tab-adv-payouts"
                    onClick={() => setAdvTab("adv-payouts")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      advTab === "adv-payouts"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Wallet className="w-4 h-4" />
                      <span>{t("tabAdvPayouts")}</span>
                    </div>
                    {orders.filter(o => o.status === 'pending_confirmation').length > 0 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-amber-100 text-amber-800">
                        {orders.filter(o => o.status === 'pending_confirmation').length}
                      </span>
                    )}
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Quick Platform Info */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-4.5 border border-slate-800 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold text-slate-200">
                {userRole === "creator" ? "CPS / CPA Shares" : "Escrow Safeguards"}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {userRole === "creator" 
                ? "Payouts are securely stored in a designated bank/escrow. Creators earn an industry-leading 70% share, while 30% platform support handles automatic conversions."
                : "Your deposit stays safe in transparent bank escrow. Fully automated payouts ensure creators promote with high loyalty, driving global traffic on high-trust values."
              }
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
              <span>Platform Split: 30%</span>
              <span className="text-indigo-400">Creator Share: 70%</span>
            </div>
          </div>


        </aside>

        {/* Right Area - Displaying targeted TAB components */}
        <main className="flex-1 flex flex-col gap-6" id="main-content">
          
          {userRole === "creator" ? (
            <>
              {/* Main Dashboard Panel */}
              {activeTab === "analytics" && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Header section inside Analytics */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-800">自媒体精细化运营中心</h1>
                  <p className="text-sm text-slate-500 mt-1">
                    实时监控CPS/CPA推广单、佣金返利点及高价值忠客画像，提升长期转化率。
                  </p>
                </div>
                <div className="flex items-center gap-3 self-start sm:self-center">
                  <button
                    id="export-csv-report-btn"
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-black px-4 py-2.5 rounded-xl shadow-md shadow-emerald-500/15 text-xs transition-all cursor-pointer group"
                  >
                    <Download className="w-4 h-4 text-emerald-100 group-hover:translate-y-0.5 transition-transform" />
                    <span>导出CSV财务报表</span>
                  </button>
                  <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-slate-200 p-2.5 text-xs">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-600">昨日打款日期: 2026-06-15</span>
                  </div>
                </div>
              </div>

              {/* Grid 1: Basic stats block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col">
                  <span className="text-slate-400 font-semibold text-xs">KOL 已确权实得佣金 (70%)</span>
                  <span className="text-2xl font-black text-slate-800 mt-2 font-mono">¥{totalEarningsConfirmed.toFixed(2)}</span>
                  <div className="flex items-center gap-1.5 mt-2.5 text-xs text-emerald-600 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>环比上周增长 +12.4%</span>
                  </div>
                  <div className="absolute top-4 right-4 text-emerald-500/10 bg-emerald-500/5 p-2 rounded-xl">
                    <Wallet className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col">
                  <span className="text-slate-400 font-semibold text-xs">未核销在途待发佣金</span>
                  <span className="text-2xl font-black text-slate-800 mt-2 font-mono">¥{pendingEarnings.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-400 mt-3">需等待在下方的 [订单核销审核] 确认核实</span>
                  <div className="absolute top-4 right-4 text-indigo-500/10 bg-indigo-500/5 p-2 rounded-xl">
                    <Percent className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col">
                  <span className="text-slate-400 font-semibold text-xs">广告主确认订单总销售额</span>
                  <span className="text-2xl font-black text-slate-800 mt-2 font-mono">¥{totalGrossOrderSales.toFixed(2)}</span>
                  <div className="flex items-center gap-1 mt-2.5 text-xs text-indigo-600">
                    <span>平均客单价 ¥{totalGrossOrderSales > 0 ? (totalGrossOrderSales / orders.length).toFixed(1) : "0"} 元</span>
                  </div>
                  <div className="absolute top-4 right-4 text-cyan-500/10 bg-cyan-500/5 p-2 rounded-xl">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col">
                  <span className="text-slate-400 font-semibold text-xs">累计上缴平台 30% 服务费</span>
                  <span className="text-2xl font-black text-slate-800 mt-2 font-mono">¥{totalPlatformFeesCollected.toFixed(2)}</span>
                  <span className="text-[10px] text-emerald-500 font-semibold mt-3">
                    独家秘圈与AI素材工具双重赋能
                  </span>
                  <div className="absolute top-4 right-4 text-amber-500/10 bg-amber-500/5 p-2 rounded-xl">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Interactive graph & statistics analysis card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-50/50 mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-600" />
                      每日粉丝增长及CPS/CPA高阶运营数据图表
                    </h3>
                    <p className="text-xs text-slate-400">折线展现流量汇聚到佣金变现的转化波动链路</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full inline-block"></span>
                      <span className="text-slate-500">粉丝自然日增 (人)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="w-2.5 h-2.5 bg-rose-500 rounded-full inline-block"></span>
                      <span className="text-slate-500">CPS日佣金 (¥)</span>
                    </div>
                  </div>
                </div>

                {/* Bespoke Custom SVG interactive Chart Area - Fully type safe, responsive and stunning */}
                <div className="relative pt-2">
                  <div className="h-64 w-full flex flex-col justify-between relative">
                    
                    {/* Background helper gridlines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      <div className="border-b border-slate-100 w-full h-[1px]"></div>
                      <div className="border-b border-slate-100 w-full h-[1px]"></div>
                      <div className="border-b border-slate-100 w-full h-[1px]"></div>
                      <div className="border-b border-slate-100 w-full h-[1px]"></div>
                    </div>

                    {/* SVG Drawn charts */}
                    <svg className="w-full h-full absolute inset-0 pt-4 z-10 overflow-visible" preserveAspectRatio="none">
                      {/* Gradient for Areas */}
                      <defs>
                        <linearGradient id="indigo-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2"/>
                          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0"/>
                        </linearGradient>
                        <linearGradient id="rose-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.15"/>
                          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0"/>
                        </linearGradient>
                      </defs>

                      {/* Line 1: Fan Growth (simulated points over 6 days: x coordinates spread, y heights) */}
                      {/* points: 6/10: 50, 6/11: 120, 6/12: 80, 6/13: 250, 6/14: 310, 6/15: 450 */}
                      <path
                        d="M 10 180 Q 200 160 380 140 T 750 90 T 1100 40 L 1100 240 L 10 240 Z"
                        fill="url(#indigo-grad)"
                      />
                      <path
                        d="M 10 180 Q 200 160 380 140 T 750 90 T 1100 40"
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Line 2: Commission yield: 100, 240, 150, 390, 520, 480 */}
                      <path
                        d="M 10 210 Q 200 190 380 160 T 750 110 T 1100 75"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                        strokeDasharray="4,4"
                        strokeLinecap="round"
                      />

                      {/* Interactive dots representing key milestones */}
                      <circle cx="1100" cy="40" r="6" fill="#4f46e5" className="animate-pulse" />
                      <circle cx="1100" cy="75" r="5" fill="#f43f5e" />
                    </svg>

                    {/* Left vertical metrics indicators */}
                    <div className="absolute left-2 top-2 z-20 text-[10px] text-slate-400 font-mono flex flex-col justify-between h-48 pointer-events-none">
                      <span>400 (最高)</span>
                      <span>200</span>
                      <span>50 (最低)</span>
                    </div>

                    {/* Space reserve */}
                    <div className="flex-1"></div>

                    {/* Bottom Day-Axis indicators */}
                    <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-200">
                      <span>06-10 (周三)</span>
                      <span>06-11 (周四)</span>
                      <span>06-12 (周五)</span>
                      <span>06-13 (周六)</span>
                      <span>06-14 (周天)</span>
                      <span className="font-bold text-indigo-600">06-15 (昨日/核对)</span>
                    </div>
                  </div>
                </div>
              </div>


              {/* Two-Column split below: Left is order payment checkout verification block, right is High-Value user dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Orders checking to verify high-value and cashouts */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">订单真实度确认与佣金划扣 (CPS防作弊)</h4>
                      <p className="text-xs text-slate-400">核对订单编号与带货日志，确认后佣金即入账至可结资金中</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold text-xs">
                      待确认: {orders.filter(o => o.status === 'pending_confirmation').length} 笔
                    </span>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className={`p-3.5 rounded-xl border transition-all ${
                          order.status === "confirmed"
                            ? "bg-slate-50/50 border-slate-100 opacity-80"
                            : order.status === "disputed"
                            ? "bg-rose-50/50 border-rose-200"
                            : "bg-white border-slate-200 hover:shadow"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={order.userAvatar}
                              alt={order.userName}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-800 text-xs">{order.userName}</span>
                                {order.highValueUser && (
                                  <span className="px-1 text-[8px] bg-rose-500 text-white font-black rounded uppercase">
                                    HIGH LTV
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                下单时间: {order.orderTime} | ID: {order.id}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-slate-500 block">
                              返金率: {order.type === 'CPS' ? 'CPS (20%)' : 'CPA 单发'}
                            </span>
                            <span className="font-mono text-xs font-extrabold text-indigo-700 block">
                              KOL得: +¥{order.kolShare.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs gap-2">
                          <p className="text-slate-500 text-[11px]">
                            广告归属: <span className="text-slate-700 font-semibold">{order.campaignTitle}</span>
                          </p>

                          <div className="flex items-center gap-2">
                            {order.status === "pending_confirmation" ? (
                              <>
                                <button
                                  onClick={() => handleDisputeOrder(order.id)}
                                  className="px-2 py-1 text-[11px] font-bold text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded"
                                >
                                  标记申诉
                                </button>
                                <button
                                  onClick={() => handleApproveOrder(order.id)}
                                  className="px-2.5 py-1 text-[11px] font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-1"
                                >
                                  <CheckCircle2 className="w-3 h-3" />
                                  确认付款
                                </button>
                              </>
                            ) : order.status === "disputed" ? (
                              <div className="flex items-center gap-1.5 text-rose-600 text-[11px] font-bold">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>申诉对账中 · 等待核实</span>
                                <button
                                  onClick={() => handleDisputeOrder(order.id)}
                                  className="text-slate-500 hover:underline ml-1 font-semibold"
                                >
                                  撤销
                                </button>
                              </div>
                            ) : (
                              <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                佣金已结算至钱包 (¥{order.kolShare.toFixed(2)})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: High-Value User Profile Database with private conversion support */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                  <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">高价值付费粉丝画像 (精细化运营)</h4>
                      <p className="text-xs text-slate-400">
                        基于高消费LTV和强活跃度锁定核心贡献粉丝
                      </p>
                    </div>
                    <Crown className="w-4 h-4 text-amber-500 animate-bounce" />
                  </div>

                  <div className="mt-4 space-y-4">
                    {premiumFans.map((fan) => (
                      <div key={fan.id} className="group transition-all">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={fan.avatar}
                              alt={fan.username}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 ring-offset-1 group-hover:scale-105 transition-transform"
                            />
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="font-bold text-slate-800 text-xs">{fan.username}</span>
                                <span className={`text-[8px] px-1 py-0.2 rounded font-black uppercase ${
                                  fan.tier === 'super_premium'
                                    ? 'bg-rose-500 text-white'
                                    : fan.tier === 'premium'
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {fan.tier === 'super_premium' ? 'SVIP 挚爱' : fan.tier === 'premium' ? '黄金 VIP' : '普通会员'}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400">活跃状态: {fan.lastActive}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 font-medium">累计支持消费</span>
                            <p className="text-xs font-black text-slate-800 font-mono">¥{fan.totalPaid.toFixed(2)}</p>
                          </div>
                        </div>

                        {/* Note & specific promotion recommendation */}
                        <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 border border-slate-100 rounded-lg p-2 leading-relaxed">
                          <span className="font-semibold text-indigo-600">运营备注: </span>
                          {fan.notes}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>全量转化效果追踪</span>
                    <button
                      onClick={() => setActiveTab("premium-feed")}
                      className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>进入广告效果数据穿透与智能追单</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* CPS/CPA Campaign board */}
          {activeTab === "campaigns" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-800">CPS / CPA 品牌营销联盟投放库</h1>
                  <p className="text-sm text-slate-500 mt-1">
                    这里是各大广告主发布的优质投放需求。30%由平台完成链路防伪监控及基础税服核销，70%佣金全归KOL。
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-400 bg-white border border-slate-200 shadow-sm p-2 rounded-xl flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5" />
                  <span>全部主流媒体推广挂链</span>
                </div>
              </div>

              {/* Filter Controls (Search, Categories, and Tags) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                {/* Search Bar & Stats */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="campaign-search-input"
                      type="text"
                      placeholder="搜索推广项目名称、品牌主、推荐渠道或受众画像..."
                      value={campaignSearch}
                      onChange={(e) => setCampaignSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-slate-800"
                    />
                    {campaignSearch && (
                      <button
                        onClick={() => setCampaignSearch("")}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] bg-slate-200/60 hover:bg-slate-200 text-slate-500 font-extrabold px-1.5 py-0.5 rounded-md"
                      >
                        清空
                      </button>
                    )}
                  </div>
                  <div className="shrink-0 flex items-center justify-between md:justify-end gap-2.5 text-xs">
                    <span className="text-slate-400 font-bold">符合筛选的项目数:</span>
                    <span className="font-mono font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-xl">
                      {filteredCampaigns.length} / {campaigns.length} 个
                    </span>
                  </div>
                </div>

                {/* Category Navigation Bar */}
                <div className="border-t border-dashed border-slate-100 pt-3">
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider block mb-2">行业类别筛选</span>
                  <div className="flex flex-wrap gap-2">
                    {availableCategories.map((cat) => {
                      const isActive = campaignCategory === cat;
                      let icon = "🌐";
                      if (cat === "智能家居") icon = "🏠";
                      else if (cat === "教育软件") icon = "🎓";
                      else if (cat === "数码外设") icon = "💻";
                      else if (cat === "美妆时尚") icon = "💄";
                      else if (cat === "美食萌宠") icon = "🐱";

                      return (
                        <button
                          key={cat}
                          id={`cat-${cat}`}
                          onClick={() => {
                            setCampaignCategory(cat);
                          }}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            isActive
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15"
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                          }`}
                        >
                          <span>{icon}</span>
                          <span>{cat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tags Guidance List */}
                <div className="border-t border-dashed border-slate-100 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">热门标签引导</span>
                    {(campaignCategory !== "全部" || campaignTag !== "全部" || campaignSearch !== "") && (
                      <button
                        onClick={() => {
                          setCampaignSearch("");
                          setCampaignCategory("全部");
                          setCampaignTag("全部");
                        }}
                        className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        重置所有筛选
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {availableTags.map((tg) => {
                      const isActive = campaignTag === tg;
                      return (
                        <button
                          key={tg}
                          id={`tag-${tg}`}
                          onClick={() => setCampaignTag(tg)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                            isActive
                              ? "bg-slate-900 text-white border border-slate-900"
                              : "bg-slate-50 text-slate-500 border border-slate-200/60 hover:bg-slate-100 hover:text-slate-800"
                          }`}
                        >
                          #{tg}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Campaign Listings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCampaigns.length === 0 ? (
                  <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                    <div className="text-4xl">🔍</div>
                    <h3 className="font-black text-slate-800 text-sm">暂未找到符合条件的推广项目</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      没有找到匹配的广告投放需求。建议您缩短搜索词，或者切换其他行业类别、点击热门标签重新尝试。
                    </p>
                    <button
                      onClick={() => {
                        setCampaignSearch("");
                        setCampaignCategory("全部");
                        setCampaignTag("全部");
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      清空筛选项
                    </button>
                  </div>
                ) : (
                  filteredCampaigns.map((camp) => (
                    <div
                      key={camp.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow relative"
                    >
                      {/* Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className={`px-2 py-0.5 rounded-full font-black text-[10px] tracking-wider uppercase text-white ${
                          camp.type === 'CPS' ? 'bg-indigo-600' : 'bg-rose-500'
                        }`}>
                          {camp.type}
                        </span>
                      </div>

                      <div className="p-5 flex-1">
                        {/* Advertiser info */}
                        <div className="flex items-center gap-2 mb-3">
                          <img
                            src={camp.advertiserLogo}
                            alt={camp.advertiserName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs font-bold text-slate-500">{camp.advertiserName}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold ml-auto">
                            {camp.category}
                          </span>
                        </div>

                        <h3 className="font-black text-slate-800 text-base leading-snug hover:text-indigo-600 transition-colors">
                          {camp.title}
                        </h3>

                        <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                          {camp.description}
                        </p>

                        {/* Card tags */}
                        {camp.tags && camp.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {camp.tags.map((tag) => (
                              <span
                                key={tag}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCampaignTag(tag);
                                  triggerToast(`🔍 已筛选标签: #${tag}`);
                                }}
                                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 text-[10px] font-semibold cursor-pointer transition-colors"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Display image related */}
                        <div className="mt-4 rounded-xl overflow-hidden h-40 relative bg-slate-100">
                          <img
                            src={camp.productImg}
                            alt={camp.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Core parameters */}
                        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
                          <div>
                            <span className="text-slate-400">单笔确认佣金点</span>
                            <p className="font-extrabold text-indigo-700 text-sm font-mono mt-0.5">
                              ¥{camp.payoutAmount.toFixed(2)}
                              {camp.commissionRate && ` (${camp.commissionRate * 100}%)`}
                            </p>
                          </div>
                          <div>
                            <span className="text-slate-400">目标群体画像</span>
                            <p className="font-bold text-slate-700 text-[11px] line-clamp-1 mt-0.5">
                              {camp.targetAudience}
                            </p>
                          </div>
                        </div>

                        {camp.cpaThresholdDescription && (
                          <div className="mt-3 bg-rose-50/50 rounded-lg p-2 border border-rose-100 flex items-start gap-1.5 text-[11px] text-rose-700">
                            <AlertCircle className="w-3.5 h-3.5 flex-none mt-0.5" />
                            <span><strong>转化门槛限制：</strong>{camp.cpaThresholdDescription}</span>
                          </div>
                        )}
                      </div>

                      {/* Bottom promotion link panel */}
                      <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between text-xs gap-3">
                        <div>
                          <span className="text-slate-400 block text-[10px]">总池预算情况</span>
                          <div className="w-24 bg-slate-200 rounded-full h-1.5 mt-1">
                            <div
                              className="bg-indigo-600 h-1.5 rounded-full"
                              style={{ width: `${(camp.spent / camp.totalBudget) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setAiInput({
                                ...aiInput,
                                productName: camp.title.split("】")[1]?.split(" ")[0] || camp.title,
                                productCategory: camp.type === 'CPS' ? '高端好物' : '科技App下载',
                                sellingPoints: camp.description
                              });
                              setActiveTab("ai-generator");
                              triggerToast("🔮 已将产品参数导入AI工坊，快去一键生成爆款引流文案吧！");
                            }}
                            className="px-2 py-1.5 font-bold text-indigo-600 hover:bg-white border border-indigo-100 rounded-xl"
                            title="去一键生成AI文案素材"
                          >
                            AI 素材
                          </button>

                          {appliedCampaignIds.includes(camp.id) ? (
                            <button
                              onClick={() => setShowApplyPromoLink(camp.id)}
                              className="px-3 py-1.5 font-black bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>获取专属挂链</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setAppliedCampaignIds([...appliedCampaignIds, camp.id]);
                                setShowApplyPromoLink(camp.id);
                                triggerToast("🎉 分配专属CPS/CPA跟踪链接成功！");
                              }}
                              className="px-3.5 py-1.5 font-extrabold bg-indigo-600 hover:bg-slate-900 text-white rounded-xl shadow"
                            >
                              立即合作带货
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expand Promo Link Panel */}
                      {showApplyPromoLink === camp.id && (
                        <div className="p-4 bg-emerald-950 text-emerald-200 text-xs border-t border-emerald-800 animate-fade-in flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold flex items-center gap-1">
                              <Radio className="w-3.5 h-3.5 animate-ping text-emerald-400" />
                              专属于您的推广追踪短链（佣金比例：70% 归您）
                            </span>
                            <button
                              onClick={() => setShowApplyPromoLink(null)}
                              className="text-[10px] hover:underline hover:text-white font-mono"
                            >
                              [关闭]
                            </button>
                          </div>
                          <div className="flex items-center gap-2 bg-emerald-900/40 p-2 rounded border border-emerald-800">
                            <span className="font-mono text-[11px] select-all flex-1 truncate">
                              {`https://kollink.com/p/${camp.id}?ref=${kolUser.id}&mode=${camp.type.toLowerCase()}`}
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(`https://kollink.com/p/${camp.id}?ref=${kolUser.id}`);
                                triggerToast("📋 专属带货链接已成功复制到剪贴板！可以直接挂置在您的 Instagram 或 TikTok 简介/评论区。");
                              }}
                              className="p-1 hover:bg-emerald-800 rounded transition-colors text-white"
                              title="复制链接"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[10px] text-emerald-300">
                            💡 提示：本链接集成了防刷与CPA深度回传跟踪，用户每通过此链接下单支付/下载完成测评，佣金将立即显示在您的 [未核销在途] 列表中。
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* AI generator workshop */}
          {activeTab === "ai-generator" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-800">AI 智能广告素材工坊</h1>
                  <p className="text-sm text-slate-500 mt-1">
                    依托 Google Gemini 核心语言大模型，深度针对 Instagram、TikTok 和 YouTube 推荐算法量身定做高点击率、强转化的爆款CPS/CPA带货宣传文案。
                  </p>
                </div>
                <div className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-100 flex items-center gap-2 self-start text-xs font-bold font-mono">
                  <Sparkles className="w-4 h-4 animate-spin text-indigo-500" />
                  <span>Powered by Gemini 3.5 Flash</span>
                </div>
              </div>

              {/* Column split: Form input and material preview output */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Inputs configuration form */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 self-start">
                  <h3 className="font-bold text-slate-800 text-sm pb-2.5 border-b border-slate-100 mb-4 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-indigo-600" />
                    商品参数及风格设定
                  </h3>

                  <form onSubmit={handleGenerateAICopy} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1">投放社交平台目标</label>
                      <select
                        value={aiInput.platform}
                        onChange={(e) => setAiInput({ ...aiInput, platform: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Instagram">Instagram (图文种草与干货文)</option>
                        <option value="TikTok">TikTok (短视频开箱对白与精编台词)</option>
                        <option value="WhatsApp / Discord Group">WhatsApp / Discord 专属高价值群发私域文</option>
                        <option value="YouTube / X">YouTube & X (Twitter) (长评测与快讯推文)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1">主打产品/App 名字</label>
                      <input
                        type="text"
                        value={aiInput.productName}
                        onChange={(e) => setAiInput({ ...aiInput, productName: e.target.value })}
                        placeholder="例如: 智能空气净化器 Pro"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1">所属类目标签</label>
                      <input
                        type="text"
                        value={aiInput.productCategory}
                        onChange={(e) => setAiInput({ ...aiInput, productCategory: e.target.value })}
                        placeholder="例如: 智能家电 / 桌面数码配件 / 潮流玩具"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1">核心卖点与亮点对账 (一行一个)</label>
                      <textarea
                        rows={4}
                        value={aiInput.sellingPoints}
                        onChange={(e) => setAiInput({ ...aiInput, sellingPoints: e.target.value })}
                        placeholder="例如:&#10;1. 性价比爆棚,首发立减150&#10;2. 独立低噪温控电机，极为省电&#10;3. 送专属加厚空气过滤网"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 leading-relaxed focus:ring-2 focus:ring-indigo-500 font-mono"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-500 block mb-1">写作情感基调</label>
                        <select
                          value={aiInput.tone}
                          onChange={(e) => setAiInput({ ...aiInput, tone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-800"
                        >
                          <option value="精打细算干货风">精细干货测评</option>
                          <option value="震惊安利惊叹风">震惊安利咆哮风</option>
                          <option value="幽默自黑亲民风">自卑搞笑吐槽流</option>
                          <option value="温馨日常治愈风">温馨居家氛围感</option>
                          <option value="专业权威实测风">硬核极客参数流</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-500 block mb-1">核心受众人群</label>
                        <input
                          type="text"
                          value={aiInput.audience}
                          onChange={(e) => setAiInput({ ...aiInput, audience: e.target.value })}
                          placeholder="例如: 精致辣妈、敏感鼻白领"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-800"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={aiLoading}
                      className="w-full py-3 px-4 bg-indigo-600 hover:bg-slate-900 text-white rounded-xl font-extrabold text-xs tracking-wider transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {aiLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>AI正在深度撰写中，请稍等...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 animate-bounce" />
                          <span>一键智能生成爆款文案</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Simulated / Real Material Output Preview panel */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {aiLoading && (
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm flex flex-col items-center justify-center text-center py-20">
                      <Sparkles className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                      <h4 className="font-bold text-slate-800 text-base">正在联动 AI 大模型创作...</h4>
                      <p className="text-xs text-slate-400 max-w-sm mt-1">
                        正在针对所选的 {aiInput.platform} 平台用户喜好进行词云权重分析、加入爆款情绪Emoji和精准评论呼应套路...
                      </p>
                    </div>
                  )}

                  {!aiLoading && aiOutput && (
                    <div className="space-y-6">
                      
                      {/* Copy Title & Text Section */}
                      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm relative">
                        
                        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`${aiOutput.adTitle}\n\n${aiOutput.adCopy}`);
                              triggerToast("📋 文案标题与正文已批量复制成功！");
                            }}
                            className="bg-slate-100 hover:bg-indigo-100 text-indigo-600 px-2.5 py-1 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all"
                          >
                            <Copy className="w-3 h-3" />
                            <span>复制全套文案</span>
                          </button>
                        </div>

                        <span className="text-[10px] bg-slate-100 font-bold px-2 py-0.5 rounded text-slate-500">
                          文案详情 (支持带货主干)
                        </span>

                        <h3 className="font-black text-slate-800 text-base mt-2.5 border-b border-dashed border-slate-100 pb-3 leading-snug">
                          {aiOutput.adTitle}
                        </h3>

                        <div className="whitespace-pre-wrap text-xs text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100 font-mono mt-4 max-h-96 overflow-y-auto">
                          {aiOutput.adCopy}
                        </div>
                      </div>

                      {/* Image Prompt Concept Suggestion */}
                      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                        <span className="text-[10px] bg-indigo-50 font-bold px-2 py-0.5 rounded text-indigo-600">
                          视觉底稿概念 suggestion (KOL实物配图参考指南)
                        </span>
                        
                        <div className="mt-3.5 bg-slate-50 border border-indigo-100/60 p-4 rounded-xl flex items-start gap-3">
                          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                            <AppWindow className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">建议图像生成/配图提词</p>
                            <p className="text-xs text-slate-700 mt-1 leading-relaxed italic">
                              "{aiOutput.creativeImgPrompt}"
                            </p>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(aiOutput.creativeImgPrompt);
                                triggerToast("📋 视觉配图英文提词提示语已成功复制到剪贴板！");
                              }}
                              className="text-[11px] text-indigo-600 font-bold hover:underline mt-2 flex items-center gap-0.5"
                            >
                              <span>复制提示语</span>
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Comment section and fan attraction strategies */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                        <span className="text-[10px] bg-rose-50 font-bold px-2 py-0.5 rounded text-rose-600">
                          3步互动带转化高阶技巧 (引导评论/锁定私域)
                        </span>

                        <div className="mt-4 space-y-3">
                          {aiOutput.interactionIdeas.map((idea, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                              <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-none font-bold text-[10px]">
                                {idx + 1}
                              </span>
                              <span>{idea}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {aiError && (
                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-800 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-none mt-0.5" />
                      <div>
                        <strong>API 请求异常：</strong> {aiError}
                        <p className="mt-2 text-slate-500">
                          本环境支持服务器级 Gemini SDK。如果您看到错误，可以在平台 [Secret] 配置有效密钥，或直接享用我们的智能本地响应生成。
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* Ad Conversion Analytics & Smart Recovery Tab */}
          {activeTab === "premium-feed" && (
            <div className="space-y-6 animate-fade-in">
              {/* Header section with stats & info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-indigo-600" />
                    <span>广告全链路效果与智能追单工坊</span>
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    穿透分析CPA/CPS推广的注册量、访问IP地址、留存率与实际付费转换。一键AI追单挽回那些付款失败/流失的受众，将流失流量变现为丰厚佣金！
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      triggerToast("🔄 已成功获取最新CPA/CPS全链路推广状态与订单流水");
                    }}
                    className="px-3.5 py-2 text-xs font-black bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-indigo-600" />
                    <span>刷新实时数据流</span>
                  </button>
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 text-xs rounded-xl border border-emerald-100 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>深度数据实时回传中</span>
                  </span>
                </div>
              </div>

              {/* Stats overview cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Card 1: Registered */}
                <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">CPA 注册用户数</span>
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-800 font-mono">
                      {adTrafficEvents.length + 2480}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-extrabold font-mono">人</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="text-emerald-500 font-extrabold font-mono">↑ 12.4%</span>
                    <span>较昨日新增回传</span>
                  </div>
                </div>

                {/* Card 2: IP Visited */}
                <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">独立IP访问源</span>
                    <MapPin className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-800 font-mono">
                      {adTrafficEvents.length * 12 + 18450}
                    </span>
                    <span className="text-[10px] text-slate-400 font-extrabold font-mono">个</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="text-slate-500 font-bold font-mono">覆盖全国</span>
                    <span>32个省级行政区</span>
                  </div>
                </div>

                {/* Card 3: Retention Days */}
                <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">首周活跃留存率</span>
                    <Percent className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-800 font-mono">
                      {((adTrafficEvents.filter(e => e.retentionDays > 0).length / adTrafficEvents.length) * 100 + 22).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="text-emerald-500 font-extrabold">高粘度</span>
                    <span>有助于长期拉新裂变</span>
                  </div>
                </div>

                {/* Card 4: Paid Conversion */}
                <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">CPS 支付付费率</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-800 font-mono">
                      {((adTrafficEvents.filter(e => e.orderStatus === 'paid').length / adTrafficEvents.length) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span>支付成功单数: </span>
                    <span className="font-bold text-emerald-600 font-mono">
                      {adTrafficEvents.filter(e => e.orderStatus === 'paid').length} / {adTrafficEvents.length}
                    </span>
                  </div>
                </div>

                {/* Card 5: Failed Orders Pending Recovery */}
                <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs space-y-1 bg-gradient-to-br from-rose-50/20 to-transparent">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider text-rose-700">待挽回失败订单</span>
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-rose-600 font-mono">
                      {adTrafficEvents.filter(e => e.orderStatus === 'failed').length}
                    </span>
                    <span className="text-[10px] text-rose-500 font-bold">单</span>
                  </div>
                  <div className="text-[10px] text-rose-600 flex items-center gap-1">
                    <span className="font-extrabold animate-pulse">🎯 价值 ¥{adTrafficEvents.filter(e => e.orderStatus === 'failed').reduce((sum, e) => sum + e.payoutAmount, 0).toFixed(1)} 元佣金</span>
                  </div>
                </div>
              </div>

              {/* Conversion Funnel Graph & Adjustments suggestions panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Column 1: Funnel visualization */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm pb-2 border-b border-slate-100 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-600" />
                      <span>广告流量全链路转化漏斗</span>
                    </h3>
                    
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      多级漏斗可以直观展示用户从接触广告到最终分成入账的损耗节点。找出痛点可以更有针对性地在 Instagram/TikTok 等渠道调整内容策略。
                    </p>

                    {/* Funnel chart with HTML / Tailwind */}
                    <div className="space-y-3 text-xs">
                      {/* Step 1 */}
                      <div>
                        <div className="flex justify-between items-center mb-1 text-slate-600">
                          <span className="font-bold flex items-center gap-1">
                            <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-mono flex items-center justify-center text-[9px]">1</span>
                            <span>广告点击 (总漏斗源)</span>
                          </span>
                          <span className="font-mono font-bold text-slate-800">100.0%</span>
                        </div>
                        <div className="h-6.5 bg-slate-100 rounded-lg overflow-hidden relative flex items-center pl-3">
                          <div className="absolute inset-y-0 left-0 bg-slate-200/80 rounded-lg transition-all" style={{ width: "100%" }}></div>
                          <span className="relative font-bold text-[11px] text-slate-700">14,800 次点击</span>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div>
                        <div className="flex justify-between items-center mb-1 text-slate-600">
                          <span className="font-bold flex items-center gap-1">
                            <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-mono flex items-center justify-center text-[9px]">2</span>
                            <span>激活与注册用户 (CPA)</span>
                          </span>
                          <span className="font-mono font-bold text-indigo-600">16.8%</span>
                        </div>
                        <div className="h-6.5 bg-slate-100 rounded-lg overflow-hidden relative flex items-center pl-3">
                          <div className="absolute inset-y-0 left-0 bg-indigo-100 rounded-lg transition-all" style={{ width: "75%" }}></div>
                          <span className="relative font-bold text-[11px] text-indigo-800">2,488 位新注册</span>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div>
                        <div className="flex justify-between items-center mb-1 text-slate-600">
                          <span className="font-bold flex items-center gap-1">
                            <span className="w-4 h-4 rounded-full bg-indigo-800 text-white font-mono flex items-center justify-center text-[9px]">3</span>
                            <span>提交支付意向订单</span>
                          </span>
                          <span className="font-mono font-bold text-indigo-800">
                            {((adTrafficEvents.filter(e => e.orderStatus !== 'registered_only').length / adTrafficEvents.length) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-6.5 bg-slate-100 rounded-lg overflow-hidden relative flex items-center pl-3">
                          <div className="absolute inset-y-0 left-0 bg-indigo-200/60 rounded-lg transition-all" style={{ width: `${(adTrafficEvents.filter(e => e.orderStatus !== 'registered_only').length / adTrafficEvents.length) * 100}%` }}></div>
                          <span className="relative font-bold text-[11px] text-indigo-900">
                            已尝试支付用户比例
                          </span>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div>
                        <div className="flex justify-between items-center mb-1 text-slate-600">
                          <span className="font-bold flex items-center gap-1">
                            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-mono flex items-center justify-center text-[9px]">4</span>
                            <span>成功付款入账 (CPS)</span>
                          </span>
                          <span className="font-mono font-bold text-emerald-600">
                            {((adTrafficEvents.filter(e => e.orderStatus === 'paid').length / adTrafficEvents.length) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-6.5 bg-slate-100 rounded-lg overflow-hidden relative flex items-center pl-3">
                          <div className="absolute inset-y-0 left-0 bg-emerald-100 rounded-lg transition-all" style={{ width: `${(adTrafficEvents.filter(e => e.orderStatus === 'paid').length / adTrafficEvents.length) * 100}%` }}></div>
                          <span className="relative font-bold text-[11px] text-emerald-800">
                            佣金已锁死归账
                          </span>
                        </div>
                      </div>

                      {/* Step 5 */}
                      <div>
                        <div className="flex justify-between items-center mb-1 text-rose-700">
                          <span className="font-bold flex items-center gap-1">
                            <span className="w-4 h-4 rounded-full bg-rose-600 text-white font-mono flex items-center justify-center text-[9px]">5</span>
                            <span>支付失败待智能挽回</span>
                          </span>
                          <span className="font-mono font-bold">
                            {((adTrafficEvents.filter(e => e.orderStatus === 'failed').length / adTrafficEvents.length) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-6.5 bg-rose-50/50 rounded-lg overflow-hidden relative flex items-center pl-3 border border-rose-100">
                          <div className="absolute inset-y-0 left-0 bg-rose-100/60 rounded-lg transition-all" style={{ width: `${(adTrafficEvents.filter(e => e.orderStatus === 'failed').length / adTrafficEvents.length) * 100}%` }}></div>
                          <span className="relative font-black text-[11px] text-rose-700 flex items-center gap-1 animate-pulse">
                            <span>{adTrafficEvents.filter(e => e.orderStatus === 'failed').length} 单正在呼唤召回</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 bg-indigo-50/40 p-3 rounded-xl border border-indigo-100/50 text-[11px] text-slate-600 leading-relaxed space-y-1.5">
                    <span className="font-bold text-indigo-700 block">💡 广告调整运营锦囊：</span>
                    <p>
                      1. <strong>首日留存低</strong>：多发生在数码外设产品，可能用户感觉使用门槛偏高。建议在AI素材工坊中生成更多“零门槛入门白话指南”短视频脚本。
                    </p>
                    <p>
                      2. <strong>支付失败率高 (如余额不足/超时)</strong>：通常意味着价格决策阻力。点击右侧列表中那些失败订单右侧的 <strong>[🎯 一键AI追单]</strong> 发送专属立减券或赠品特权，能立刻成功唤醒 <strong>80% 以上</strong> 的高意向客户！
                    </p>
                  </div>
                </div>

                {/* Column 2: Events List with Search & Actions */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                          <Search className="w-4 h-4 text-slate-400" />
                          <span>CPA/CPS 实时流转回传流水</span>
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          包含完整的注册状态、归属IP地址、留存、订单支付成败历史记录
                        </p>
                      </div>
                    </div>

                    {/* Filters bar */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      {/* Search */}
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="搜索访客姓名/IP地址/目标产品..."
                          value={eventSearchText}
                          onChange={(e) => setEventSearchText(e.target.value)}
                          className="w-full pl-8.5 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-slate-800"
                        />
                        {eventSearchText && (
                          <button
                            onClick={() => setEventSearchText("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] bg-slate-200/70 hover:bg-slate-200 text-slate-500 font-extrabold px-1 rounded"
                          >
                            ×
                          </button>
                        )}
                      </div>

                      {/* Filter Pills */}
                      <div className="flex flex-wrap gap-1 items-center">
                        <button
                          onClick={() => setEventFilterStatus("all")}
                          className={`px-2 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                            eventFilterStatus === "all"
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          全部回传
                        </button>
                        <button
                          onClick={() => setEventFilterStatus("paid")}
                          className={`px-2 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                            eventFilterStatus === "paid"
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
                          }`}
                        >
                          支付成功
                        </button>
                        <button
                          onClick={() => setEventFilterStatus("failed")}
                          className={`px-2 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                            eventFilterStatus === "failed"
                              ? "bg-rose-600 text-white border-rose-600"
                              : "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
                          }`}
                        >
                          支付失败 (待追)
                        </button>
                        <button
                          onClick={() => setEventFilterStatus("registered_only")}
                          className={`px-2 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                            eventFilterStatus === "registered_only"
                              ? "bg-amber-600 text-white border-amber-600"
                              : "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
                          }`}
                        >
                          仅注册
                        </button>
                      </div>
                    </div>

                    {/* Events List */}
                    <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                      {adTrafficEvents.filter((evt) => {
                        const matchesSearch =
                          evt.username.toLowerCase().includes(eventSearchText.toLowerCase()) ||
                          evt.ipAddress.includes(eventSearchText) ||
                          evt.location.toLowerCase().includes(eventSearchText.toLowerCase()) ||
                          evt.campaignTitle.toLowerCase().includes(eventSearchText.toLowerCase());

                        const matchesStatus =
                          eventFilterStatus === "all" ||
                          (eventFilterStatus === "paid" && evt.orderStatus === "paid") ||
                          (eventFilterStatus === "failed" && evt.orderStatus === "failed") ||
                          (eventFilterStatus === "registered_only" && evt.orderStatus === "registered_only");

                        return matchesSearch && matchesStatus;
                      }).length === 0 ? (
                        <div className="p-8 text-center bg-slate-50 border border-dashed rounded-xl space-y-2">
                          <p className="text-xs text-slate-400">没有找到符合筛选条件的回传事件流水</p>
                          <button
                            onClick={() => {
                              setEventSearchText("");
                              setEventFilterStatus("all");
                            }}
                            className="text-[10px] text-indigo-600 font-extrabold hover:underline"
                          >
                            重置筛选规则
                          </button>
                        </div>
                      ) : (
                        adTrafficEvents.filter((evt) => {
                          const matchesSearch =
                            evt.username.toLowerCase().includes(eventSearchText.toLowerCase()) ||
                            evt.ipAddress.includes(eventSearchText) ||
                            evt.location.toLowerCase().includes(eventSearchText.toLowerCase()) ||
                            evt.campaignTitle.toLowerCase().includes(eventSearchText.toLowerCase());

                          const matchesStatus =
                            eventFilterStatus === "all" ||
                            (eventFilterStatus === "paid" && evt.orderStatus === "paid") ||
                            (eventFilterStatus === "failed" && evt.orderStatus === "failed") ||
                            (eventFilterStatus === "registered_only" && evt.orderStatus === "registered_only");

                          return matchesSearch && matchesStatus;
                        }).map((evt) => {
                          const isPaid = evt.orderStatus === "paid";
                          const isFailed = evt.orderStatus === "failed";
                          const isRegOnly = evt.orderStatus === "registered_only";

                          return (
                            <div
                              key={evt.id}
                              className={`p-3.5 rounded-xl border transition-all flex flex-col md:flex-row justify-between gap-3 text-xs ${
                                isFailed
                                  ? evt.isRecovered
                                    ? "bg-emerald-50/20 border-emerald-100 hover:border-emerald-200"
                                    : "bg-rose-50/30 border-rose-100 hover:border-rose-200 animate-pulse"
                                  : isPaid
                                  ? "bg-emerald-50/5 border-emerald-100/50 hover:border-emerald-200"
                                  : "bg-white border-slate-200/80 hover:border-slate-300"
                              }`}
                            >
                              {/* Left column: User info & technical metadata */}
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={evt.avatar}
                                    alt={evt.username}
                                    className="w-6 h-6 rounded-full object-cover border animate-fade-in"
                                  />
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-extrabold text-slate-800">{evt.username}</span>
                                      <span className="text-[9px] px-1.5 py-0.5 rounded-sm font-semibold bg-slate-100 text-slate-500 font-mono">
                                        ID: {evt.id}
                                      </span>
                                    </div>
                                    <span className="text-[10px] text-slate-400">回传注册时间: {evt.registeredAt}</span>
                                  </div>
                                </div>

                                {/* Technical Tracking Indicators: IP Address, Geolocation, Retention Rate */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100 text-[10px]">
                                  <div>
                                    <span className="text-slate-400 block font-bold">访客IP地址</span>
                                    <code className="text-slate-600 font-mono font-bold select-all">{evt.ipAddress}</code>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 block font-bold">IP所属归属地</span>
                                    <span className="text-slate-700 font-bold flex items-center gap-0.5">
                                      <MapPin className="w-3 h-3 text-rose-500" />
                                      {evt.location}
                                    </span>
                                  </div>
                                  <div className="col-span-2 md:col-span-1 font-mono">
                                    <span className="text-slate-400 block font-sans font-bold">广告留存度</span>
                                    {evt.retentionDays > 0 ? (
                                      <span className="text-emerald-700 font-extrabold">
                                        🔥 留存 {evt.retentionDays} 天 ({evt.retentionStatus === "active" ? "高活" : "休眠"})
                                      </span>
                                    ) : (
                                      <span className="text-slate-400 font-medium font-sans">
                                        ❄️ 无留存 (即开即走)
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Campaign targets */}
                                <div className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                                  <span className="text-slate-400 font-normal">推广带货关联:</span>
                                  <span className="text-indigo-600 font-bold max-w-xs truncate">{evt.campaignTitle}</span>
                                </div>
                              </div>

                              {/* Right column: Status with Action */}
                              <div className="flex flex-col justify-between items-end gap-2.5 min-w-[140px] text-right shrink-0">
                                <div className="space-y-1">
                                  {isPaid && (
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-block">
                                      🟢 支付成功 (佣金入账)
                                    </span>
                                  )}
                                  {isRegOnly && (
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 inline-block">
                                      🟡 仅完成注册 (未下单)
                                    </span>
                                  )}
                                  {isFailed && (
                                    <div className="space-y-0.5">
                                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200 inline-block">
                                        🔴 支付失败 ({evt.failureReason})
                                      </span>
                                      {evt.isRecovered && (
                                        <p className="text-[10px] text-emerald-600 font-bold">
                                          🎉 AI追回成功 ({evt.recoveryNote})
                                        </p>
                                      )}
                                    </div>
                                  )}

                                  <div className="font-mono text-[11px] font-black text-slate-700">
                                    预计佣金分账: <strong className="text-indigo-700">¥{evt.payoutAmount.toFixed(2)}</strong>
                                  </div>
                                </div>

                                {/* Dynamic action handler */}
                                <div>
                                  {isPaid && (
                                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                                      <UserCheck className="w-3.5 h-3.5" />
                                      分账已计入您的钱包
                                    </span>
                                  )}

                                  {isRegOnly && (
                                    <button
                                      onClick={() => {
                                        triggerToast(`💡 已自动向 [${evt.username}] 推送首单专属免单红包！刺激消费中...`);
                                        // Change status to paid
                                        const updated = adTrafficEvents.map(e => e.id === evt.id ? { ...e, orderStatus: "paid" as const } : e);
                                        setAdTrafficEvents(updated);
                                      }}
                                      className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                                    >
                                      <Gift className="w-3.5 h-3.5" />
                                      <span>一键推送首单立减券</span>
                                    </button>
                                  )}

                                  {isFailed && (
                                    evt.isRecovered ? (
                                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        追单已核销 (70%佣金)
                                      </span>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setEventRecoveryModal(evt);
                                          // pre-generate recovery text template
                                          setRecoveryMessage(`【艾米精选】亲爱的${evt.username}，我们检测到您购买【${evt.campaignTitle.split("】")[1] || evt.campaignTitle}】时付款未成功（原因:${evt.failureReason}）。艾米极力帮您跟品牌方申请了「${recoveryDiscount}」和特权赠品！点击直通付款复原通道：kollink.com/r/${evt.id} 回复TD退订`);
                                        }}
                                        className="px-2.5 py-1.5 bg-indigo-600 hover:bg-slate-900 text-white rounded-lg text-[10px] font-black tracking-wide shadow-sm flex items-center gap-1 transition-all cursor-pointer animate-bounce"
                                      >
                                        <HeartHandshake className="w-3.5 h-3.5 text-rose-300" />
                                        <span>🎯 一键AI追单转化</span>
                                      </button>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Summary of conversion metrics */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold">多链路回传通道：API 3.0 Webhook 即时回传</span>
                    <span>已挽回佣金贡献比例: <strong className="text-emerald-600 font-bold font-mono">
                      {adTrafficEvents.filter(e => e.orderStatus === 'failed').length === 0 ? "100" : ((adTrafficEvents.filter(e => e.isRecovered).length / (adTrafficEvents.filter(e => e.orderStatus === 'failed' || e.isRecovered).length || 1)) * 100).toFixed(0)}%
                    </strong></span>
                  </div>
                </div>

              </div>

              {/* Recovery Workshop Modal */}
              {eventRecoveryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
                    <div className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-rose-50/30 flex items-start justify-between">
                      <div>
                        <span className="text-[10px] bg-indigo-600 text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Gemini 智能挽回工坊
                        </span>
                        <h3 className="font-black text-slate-800 text-base mt-1.5 flex items-center gap-1.5">
                          <span>对流失订单开展精准转化</span>
                        </h3>
                      </div>
                      <button
                        onClick={() => setEventRecoveryModal(null)}
                        className="text-slate-400 hover:text-slate-600 font-extrabold text-xs"
                      >
                        [关闭]
                      </button>
                    </div>

                    <div className="p-6 space-y-4 text-xs">
                      {/* Target customer quick card */}
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={eventRecoveryModal.avatar}
                            alt={eventRecoveryModal.username}
                            className="w-8 h-8 rounded-full border object-cover"
                          />
                          <div>
                            <p className="font-extrabold text-slate-800">{eventRecoveryModal.username}</p>
                            <p className="text-[10px] text-slate-400">来自 IP: {eventRecoveryModal.ipAddress} ({eventRecoveryModal.location})</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-slate-200/60">
                          <div>
                            <span className="text-slate-400 block font-sans">尝试购买商品</span>
                            <span className="font-extrabold text-slate-700 max-w-[150px] truncate block">{eventRecoveryModal.campaignTitle}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-sans">流失损失佣金</span>
                            <span className="font-extrabold text-rose-600 font-mono">¥{eventRecoveryModal.payoutAmount.toFixed(2)} 元</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-sans">订单流失原因</span>
                            <span className="font-black text-rose-500">🔴 {eventRecoveryModal.failureReason}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-sans">广告回传留存度</span>
                            <span className="font-bold text-slate-700 font-mono">{eventRecoveryModal.retentionDays}天长效活跃留存</span>
                          </div>
                        </div>
                      </div>

                      {/* Select Strategy controls */}
                      <div className="space-y-3">
                        <div>
                          <label className="font-bold text-slate-500 block mb-1">选择追单挽回策略 (优惠力度)</label>
                          <select
                            value={recoveryDiscount}
                            onChange={(e) => {
                              const disc = e.target.value;
                              setRecoveryDiscount(disc);
                              // update message text
                              setRecoveryMessage(`【艾米精选】亲爱的${eventRecoveryModal.username}，我们检测到您购买【${eventRecoveryModal.campaignTitle.split("】")[1] || eventRecoveryModal.campaignTitle}】时付款未成功（原因:${eventRecoveryModal.failureReason}）。艾米极力帮您跟品牌方申请了「${disc}」和特权赠品！点击直通付款复原通道：kollink.com/r/${eventRecoveryModal.id} 回复TD退订`);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-semibold text-slate-800"
                          >
                            <option value="8.5折专属立减">8.5折专属立减 (品牌赞助)</option>
                            <option value="首单立减 ¥20 优惠券">首单特大立减 ¥20 优惠券</option>
                            <option value="下单赠 1 个月SVIP高级订阅礼包">下单无门槛附赠 1 个月SVIP高级订阅</option>
                            <option value="品牌免费附带测评试用装">品牌免费附带测评试用装(限时发配)</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-bold text-slate-500 block mb-1">下发智能通道 (防刷与精准送达)</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: "sms", label: "短信通道", icon: "💬" },
                              { id: "dm", label: "Ins/TikTok私信", icon: "📥" },
                              { id: "wx", label: "WhatsApp模板", icon: "🟢" },
                            ].map((ch) => (
                              <button
                                key={ch.id}
                                type="button"
                                onClick={() => setRecoveryChannel(ch.label)}
                                className={`p-2 rounded-xl text-center border font-bold transition-all ${
                                  recoveryChannel.includes(ch.label) || (ch.id === "sms" && recoveryChannel.includes("短信"))
                                    ? "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-xs"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                <span className="block text-base mb-1">{ch.icon}</span>
                                <span>{ch.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="font-bold text-slate-500 block mb-1 flex items-center justify-between font-sans">
                            <span>编辑 AI 追回关怀文案</span>
                            <span className="text-[10px] text-indigo-600 font-extrabold flex items-center gap-0.5">
                              <Sparkles className="w-3 h-3" />
                              <span>已由 Gemini 实时调优</span>
                            </span>
                          </label>
                          <textarea
                            rows={4}
                            value={recoveryMessage}
                            onChange={(e) => setRecoveryMessage(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 leading-relaxed font-mono"
                          ></textarea>
                        </div>
                      </div>

                      {/* Trigger Recovery Action button */}
                      <button
                        onClick={() => {
                          // Change event's state to recovered
                          const updated = adTrafficEvents.map((evt) =>
                            evt.id === eventRecoveryModal.id
                              ? { ...evt, orderStatus: "paid" as const, isRecovered: true, recoveryNote: recoveryDiscount }
                              : evt
                          );
                          setAdTrafficEvents(updated);
                          
                          // Also add to global transactions list so the stats elsewhere in the app are consistent!
                          const newOrder: OrderTransaction = {
                            id: `ord_rec_${eventRecoveryModal.id}`,
                            campaignId: "camp_02",
                            campaignTitle: eventRecoveryModal.campaignTitle,
                            kolId: kolUser.id,
                            userId: eventRecoveryModal.id,
                            userName: eventRecoveryModal.username,
                            userAvatar: eventRecoveryModal.avatar,
                            userContact: "138****" + Math.floor(1000 + Math.random() * 9000),
                            type: "CPS",
                            orderValue: eventRecoveryModal.payoutAmount * 5,
                            grossPayout: eventRecoveryModal.payoutAmount,
                            kolShare: eventRecoveryModal.payoutAmount * 0.7,
                            platformShare: eventRecoveryModal.payoutAmount * 0.3,
                            status: "confirmed",
                            highValueUser: eventRecoveryModal.retentionDays > 3,
                            orderTime: "刚刚"
                          };
                          setOrders([newOrder, ...orders]);

                          triggerToast(`🎉 成功触发 ${recoveryChannel} 追回策略！文案已下发给 [${eventRecoveryModal.username}]。用户已通过社交私信/WhatsApp完成秒级复原，已为您成功挽回并锁定 ¥${eventRecoveryModal.payoutAmount.toFixed(2)} 的分账！`);
                          setEventRecoveryModal(null);
                        }}
                        className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-xs shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <HeartHandshake className="w-4 h-4 text-rose-300" />
                        <span>发送并挽回订单 (锁定 ¥{eventRecoveryModal.payoutAmount.toFixed(2)} 佣金)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Private domain settlement */}
          {activeTab === "private-domain" && (
            <div className="space-y-6 animate-fade-in z-10">
              
              {/* Top Title & Pitch */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-indigo-100/40 p-6 rounded-2xl border border-indigo-100">
                <div>
                  <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                    <span>📢 广告专属「私域蓄水池」与粉丝沉淀体系</span>
                    <span className="text-[10px] bg-indigo-600 text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                      CPS 70/30 裂变核武器
                    </span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1.5 max-w-3xl leading-relaxed">
                    在自媒体变现中，将购买与点击您广告的粉丝导入专属私域群（WhatsApp、Telegram、Discord等），是应对平台限流、进行二次复购裂变的最核心手段。在本系统，您可以为<strong>每一个广告或推广合作单独建立专属蓄水池</strong>，对参与该广告的粉丝提供一对一针对性维护并持续分发优惠券！
                  </p>
                </div>
                <button
                  onClick={() => {
                    setNewPoolCampaignId(campaigns[0]?.id || "");
                    setShowCreatePoolModal(!showCreatePoolModal);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-sm transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>建立广告专属私域群</span>
                </button>
              </div>

              {/* Establish New Pool Slide-down Form */}
              {showCreatePoolModal && (
                <div className="bg-white border border-indigo-200 rounded-2xl p-5 shadow-md animate-scale-up space-y-4">
                  <div className="flex items-center justify-between border-b pb-2.5">
                    <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      为广告建立专属私域蓄水池
                    </h3>
                    <button
                      onClick={() => setShowCreatePoolModal(false)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      取消
                    </button>
                  </div>

                  <form onSubmit={handleCreatePool} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">选择要绑定的推广广告 *</label>
                      <select
                        value={newPoolCampaignId}
                        onChange={(e) => setNewPoolCampaignId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 text-slate-700 font-medium"
                      >
                        {campaigns.map((c) => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">私域社区群名称 *</label>
                      <input
                        type="text"
                        placeholder="例如：「科大摩登净化器」CPS复购挚友圈"
                        value={newPoolName}
                        onChange={(e) => setNewPoolName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 text-slate-700 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">渠道类型 *</label>
                      <select
                        value={newPoolPlatform}
                        onChange={(e) => setNewPoolPlatform(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 text-slate-700 font-medium"
                      >
                        <option value="WhatsApp">WhatsApp (群组/商业版)</option>
                        <option value="Messenger">Messenger (群组/粉丝页)</option>
                        <option value="Telegram">Telegram (频道/超级群)</option>
                        <option value="Discord">Discord 服务器</option>
                        <option value="Other">其他第三方直通通道</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">跳转直连短链地址 *</label>
                      <input
                        type="text"
                        placeholder="https://chat.whatsapp.com/mock-link-address"
                        value={newPoolJoinLink}
                        onChange={(e) => setNewPoolJoinLink(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 text-slate-700 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">粉丝准入等级限定</label>
                      <select
                        value={newPoolRequiredTier}
                        onChange={(e) => setNewPoolRequiredTier(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 text-slate-700 font-medium"
                      >
                        <option value="any_fan">任何普通粉丝 (点击/参与广告即可入群)</option>
                        <option value="premium">限定黄金VIP或以上等级粉丝 (购买了产品的老客)</option>
                        <option value="super_premium">限定超级至尊SVIP白金铁粉 (重度消费大户)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">一句话群规及福利亮点 (100字以内)</label>
                      <input
                        type="text"
                        placeholder="例如：专为净化器粉丝提供1v1配件特权折扣、每日抽奖互动！"
                        value={newPoolRules}
                        onChange={(e) => setNewPoolRules(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 text-slate-700 font-medium"
                      />
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-2 pt-2 border-t mt-1">
                      <button
                        type="button"
                        onClick={() => setShowCreatePoolModal(false)}
                        className="px-4 py-2 hover:bg-slate-100 text-slate-500 text-xs font-bold rounded-xl"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-sm"
                      >
                        确认建立并上线
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Horizontal Filter Pill bar */}
              <div className="flex flex-col sm:flex-row gap-2.5 items-start sm:items-center bg-slate-50 border p-3.5 rounded-2xl">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
                  <Filter className="w-3.5 h-3.5 text-indigo-500" />
                  按广告活动筛选蓄水池:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedCampaignPoolId("all");
                      setActiveGroupIndex(0);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedCampaignPoolId === "all"
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    全部私域群 ({privateGroups.length})
                  </button>
                  {campaigns.map((c) => {
                    const count = privateGroups.filter(g => g.campaignId === c.id).length;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedCampaignPoolId(c.id);
                          // Select first matching group
                          const firstMatchIdx = privateGroups.findIndex(g => g.campaignId === c.id);
                          if (firstMatchIdx !== -1) {
                            // Find the index inside the visible groups
                            const filtered = privateGroups.filter(g => g.campaignId === c.id);
                            setActiveGroupIndex(0);
                          }
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedCampaignPoolId === c.id
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {c.title.split("】")[0].replace("【", "") || c.title} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Core Layout Grid */}
              {(() => {
                const visibleGroups = selectedCampaignPoolId === "all"
                  ? privateGroups
                  : privateGroups.filter(g => g.campaignId === selectedCampaignPoolId);

                const selectedGroup = visibleGroups[activeGroupIndex] || visibleGroups[0] || privateGroups[0];
                const selectedGroupIdxInOriginal = privateGroups.findIndex(g => g.id === selectedGroup?.id);

                if (visibleGroups.length === 0) {
                  return (
                    <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center space-y-4">
                      <div className="inline-flex p-4 rounded-full bg-slate-50 text-slate-400">
                        <Users className="w-10 h-10" />
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-base">此广告暂未建立专属私域蓄水池</h3>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        您可以一键为该广告建立一个，后续购买或点击广告的粉丝将会自动引导到对应的 WhatsApp 群或 Telegram / Discord 中，方便精准发放优惠券。
                      </p>
                      <button
                        onClick={() => {
                          setNewPoolCampaignId(selectedCampaignPoolId !== "all" ? selectedCampaignPoolId : (campaigns[0]?.id || ""));
                          setShowCreatePoolModal(true);
                        }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-xs"
                      >
                        立刻为该广告建立蓄水池
                      </button>
                    </div>
                  );
                }

                // Gather target fans list who consumed or click-interacted with this advertisement
                const associatedCampaign = campaigns.find(c => c.id === selectedGroup.campaignId);
                
                // Filtering dynamic mock fans linked to this campaign:
                const poolFans = [
                  // 1. Paid clients from global orders
                  ...orders.filter(o => o.campaignId === selectedGroup.campaignId).map(o => ({
                    id: o.userId || `usr_${o.userName}`,
                    username: o.userName,
                    avatar: o.userAvatar,
                    status: "paid" as const,
                    statusLabel: "🟢 已消费CPS (成功付款)",
                    subInfo: `下单价值 ¥${o.orderValue?.toFixed(0) || "199"} | 贡献佣金 ¥${o.kolShare?.toFixed(1) || "39.8"}`,
                    isHighValue: o.highValueUser || false
                  })),
                  // 2. Clicked or registered fans from active traffic stream (excluding duplicates by name)
                  ...adTrafficEvents.filter(t => t.campaignId === selectedGroup.campaignId && !orders.some(o => o.userName === t.username)).map(t => ({
                    id: t.id,
                    username: t.username,
                    avatar: t.avatar,
                    status: t.orderStatus === "registered_only" ? "registered" as const : "failed" as const,
                    statusLabel: t.orderStatus === "registered_only" ? "🟡 已注册CPA (推广有效)" : `🔴 意向粉丝 (未付钱-${t.failureReason || "放弃付款"})`,
                    subInfo: `访问留存 ${t.retentionDays}天 | 归属地域 ${t.location}`,
                    isHighValue: t.retentionDays > 3
                  }))
                ];

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left Column: Private Groups List */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-4 border-b pb-2">
                          <h3 className="font-extrabold text-slate-800 text-xs">
                            我映射维护的专属蓄水池 ({visibleGroups.length} 个)
                          </h3>
                          <span className="text-[10px] text-slate-400 font-mono">
                            点击切换运营控制台
                          </span>
                        </div>

                        <div className="space-y-3">
                          {visibleGroups.map((group, idx) => {
                            const isSelected = selectedGroup?.id === group.id;
                            const matchedCamp = campaigns.find(c => c.id === group.campaignId);
                            return (
                              <div
                                key={group.id}
                                onClick={() => setActiveGroupIndex(idx)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-slate-50/80 border-indigo-500 shadow-xs ring-1 ring-indigo-500/20"
                                    : "bg-white border-slate-200 hover:bg-slate-50/50"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`p-2 rounded-xl text-white flex-none ${
                                    group.platform === 'WhatsApp' ? 'bg-emerald-500' :
                                    group.platform === 'Telegram' ? 'bg-sky-500' :
                                    group.platform === 'Discord' ? 'bg-indigo-500' :
                                    group.platform === 'Messenger' ? 'bg-blue-500' : 'bg-purple-500'
                                  }`}>
                                    <Users className="w-4 h-4" />
                                  </div>
                                  <div className="space-y-1 min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-1">
                                      <h4 className="font-black text-slate-800 text-xs truncate">
                                        {group.name}
                                      </h4>
                                      <span className="px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase bg-slate-100 text-slate-600 whitespace-nowrap">
                                        {group.platform}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
                                      <span>活跃数: <strong className="text-slate-700 font-bold">{group.activeMembers}</strong> 粉丝</span>
                                      <span>•</span>
                                      <span className="truncate text-indigo-600 font-semibold">
                                        {group.requiredTier === 'premium' ? '限定老客/VIP' : '任意普通粉丝'}
                                      </span>
                                    </p>

                                    {/* Link Campaign indicator badge */}
                                    {matchedCamp ? (
                                      <div className="mt-2 flex items-center gap-1 bg-indigo-50/60 text-indigo-700 border border-indigo-100/50 rounded px-1.5 py-0.5 text-[9px] w-fit">
                                        <span className="font-black shrink-0">🎯 关联广告:</span>
                                        <span className="truncate max-w-[160px]">{matchedCamp.title}</span>
                                      </div>
                                    ) : (
                                      <div className="mt-2 flex items-center gap-1 bg-slate-100 text-slate-500 rounded px-1.5 py-0.5 text-[9px] w-fit">
                                        <span>未绑定特定广告</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Visual QR Card Poster component */}
                      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm text-center">
                        <span className="text-[10px] bg-indigo-50 font-black px-2 py-0.5 rounded text-indigo-600 mb-3 inline-block tracking-wider uppercase">
                          智能私域分流海名片 (粉丝点击直接跳转)
                        </span>

                        <div className="bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/50 p-5 rounded-2xl border border-indigo-100 flex flex-col items-center relative overflow-hidden">
                          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500"></div>

                          <div className="flex items-center gap-2 mt-2">
                            <img
                              src={kolUser.avatar}
                              alt={kolUser.name}
                              className="w-10 h-10 rounded-full border-2 border-white shadow"
                            />
                            <div className="text-left">
                              <h4 className="font-black text-slate-800 text-xs">{kolUser.name} 的专属自留地</h4>
                              <p className="text-[8px] text-slate-400">扫码或直连跳转：尊享品牌联动福利</p>
                            </div>
                          </div>

                          {/* QR Code container */}
                          <div className="my-4 p-3 bg-white rounded-xl border shadow-inner flex flex-col items-center justify-center w-32 h-32 border-indigo-50">
                            <QrCode className="w-20 h-20 text-slate-900" />
                            <span className="text-[8px] font-mono text-indigo-600 mt-1.5 font-bold">
                              [{selectedGroup?.platform} 直达通道]
                            </span>
                          </div>

                          <div className="w-full bg-indigo-600/5 border border-indigo-100/50 rounded-xl p-2.5 text-left text-[10px] text-slate-600 space-y-1">
                            <span className="font-bold text-indigo-700 block text-[9px]">准入说明与福利规则:</span>
                            <p className="line-clamp-2 text-slate-500">
                              {selectedGroup?.rulesDescription}
                            </p>
                          </div>

                          <button
                            onClick={() => triggerToast(`💾 针对该广告的专属私域海报名片「${selectedGroup?.name}」PNG图包已成功开始导出！尺寸：512x512px`)}
                            className="mt-3.5 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] rounded-xl shadow-xs transition-colors cursor-pointer"
                          >
                            保存/下载本广告私域引流名片
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Selected Group detail operations and targeted fan service */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Active Group Title & Campaign Match Details */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3.5">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400">正在运营的蓄水池：</span>
                            <h2 className="text-base font-black text-slate-800">{selectedGroup?.name}</h2>
                          </div>
                          <div className="flex items-center gap-1.5 bg-slate-100 border p-1 rounded-lg self-start">
                            <span className="font-mono text-[9px] text-slate-500 max-w-[120px] truncate">{selectedGroup?.joinLink}</span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(selectedGroup?.joinLink || "");
                                triggerToast("📋 引流跳转短链已成功复制到剪贴板！");
                              }}
                              className="p-1 hover:bg-slate-200 text-slate-600 rounded"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Associated Advertisement Specs */}
                        <div>
                          <strong className="text-[11px] font-bold text-slate-400 block mb-2.5 uppercase tracking-wider">
                            🎯 本蓄水池关联绑定的广告与转化配置:
                          </strong>
                          {associatedCampaign ? (
                            <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
                              <img
                                src={associatedCampaign.productImg}
                                alt={associatedCampaign.title}
                                className="w-12 h-12 rounded-xl object-cover border bg-white"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-extrabold text-xs text-slate-800 truncate">
                                  {associatedCampaign.title}
                                </h4>
                                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1 text-[10px] text-slate-400">
                                  <span>品牌主: <strong className="text-slate-600">{associatedCampaign.advertiserName}</strong></span>
                                  <span>•</span>
                                  <span>结算模式: <strong className="text-indigo-600 font-bold bg-indigo-50 px-1 rounded">{associatedCampaign.type}</strong></span>
                                  <span>•</span>
                                  <span>博主分成: <strong className="text-emerald-600 font-bold">70%</strong></span>
                                </div>
                              </div>
                              <div className="text-right flex-none">
                                <span className="text-[8px] text-slate-400 block">单笔转化博主分得</span>
                                <span className="text-sm font-black text-slate-800 font-mono">¥{(associatedCampaign.payoutAmount * 0.7).toFixed(1)}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-amber-50/50 text-amber-800 border border-amber-200/50 p-3 rounded-xl text-xs flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-500 flex-none" />
                              <span>当前未绑定特定的推广广告。请点击右上角绑定以拉取参与粉丝列表。</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* TARGETED FANS LIST: Consumed and Interacted fans list */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b pb-3">
                          <div>
                            <h3 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5">
                              <UserCheck className="w-4 h-4 text-indigo-600" />
                              参与本广告并成功消费/互动的粉丝 ({poolFans.length} 人)
                            </h3>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              系统检测到以下用户通过您的 CPS 链接参与了该广告。您可以对他们进行针对性维护。
                            </p>
                          </div>
                          <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full border border-emerald-100">
                            数据穿透已对齐
                          </span>
                        </div>

                        {poolFans.length === 0 ? (
                          <div className="p-8 text-center text-xs text-slate-400">
                            暂未获取到购买或参与该广告的粉丝交易。当有粉丝通过您的 Instagram/TikTok 等渠道下单或注册时，此处将实时展示！
                          </div>
                        ) : (
                          <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1">
                            {poolFans.map((fan) => (
                              <div key={fan.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <img
                                    src={fan.avatar}
                                    alt={fan.username}
                                    className="w-8 h-8 rounded-full border bg-slate-50 flex-none"
                                  />
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-extrabold text-slate-700 truncate">{fan.username}</span>
                                      {fan.isHighValue && (
                                        <span className="bg-rose-50 text-rose-600 text-[8px] font-black px-1 rounded flex-none scale-90 origin-left">
                                          SVIP铁粉
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[9px] text-slate-400 block mt-0.5 leading-none">
                                      {fan.subInfo}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 flex-none">
                                  <span className="text-[9px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                    {fan.statusLabel}
                                  </span>
                                  
                                  {/* Interaction Maintenance buttons */}
                                  <button
                                    onClick={() => {
                                      triggerToast(`🎁 福利专属发放成功！已为SVIP [${fan.username}] 发送 ${selectedGroup.coupons?.[0]?.discount || "20元满减福利券"}！福利短信已同步。`);
                                      // Increment the distributed counter locally
                                      if (selectedGroup.coupons && selectedGroup.coupons.length > 0) {
                                        selectedGroup.coupons[0].distributedCount += 1;
                                        setPrivateGroups([...privateGroups]);
                                      }
                                    }}
                                    className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded transition-colors cursor-pointer"
                                    title="给粉丝赠送专属高额优惠券"
                                  >
                                    发福利
                                  </button>

                                  <button
                                    onClick={() => {
                                      const msg = selectedGroup.campaignId === "camp_01" 
                                        ? `💬 [私聊维护成功] 针对 ${fan.username} 购买的【科大摩登空气净化器】，博主已触发『滤芯定期到期关怀及复购推荐话术』！`
                                        : `💬 [私聊维护成功] 已向 ${fan.username} 推荐『洛斐极地机械键盘独家SVIP试打特权申请』！`;
                                      triggerToast(msg);
                                    }}
                                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded transition-colors cursor-pointer"
                                    title="利用博主预置话术进行深度客户关系维护"
                                  >
                                    跟进
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* ACTIVE COUPONS & BENEFITS DISTRIBUTION PANEL */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b pb-3">
                          <div>
                            <h3 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5">
                              <Gift className="w-4.5 h-4.5 text-indigo-600 animate-pulse" />
                              专属福利券与特权库 ({selectedGroup.coupons?.length || 0} 个)
                            </h3>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              您可以持续为此蓄水池内的粉丝分发优惠券、加湿器返点等独家大福利，提高二次变现复购。
                            </p>
                          </div>
                          
                          <button
                            onClick={() => setShowAddCouponForm(!showAddCouponForm)}
                            className="text-[10px] text-indigo-600 hover:text-indigo-800 font-extrabold flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>发布新福利</span>
                          </button>
                        </div>

                        {/* Add New Coupon Inline Form */}
                        {showAddCouponForm && (
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 animate-scale-up space-y-3">
                            <span className="text-[10px] text-indigo-600 font-extrabold block">🎟️ 录入并群发新的福利优惠券：</span>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div>
                                <label className="block text-[9px] font-bold text-slate-400 mb-0.5">福利/折扣优惠代码 *</label>
                                <input
                                  type="text"
                                  placeholder="例如：MORN_COOL_100"
                                  value={newCouponCode}
                                  onChange={(e) => setNewCouponCode(e.target.value)}
                                  className="w-full bg-white border border-slate-200 p-2 rounded-lg font-mono text-slate-700 uppercase"
                                />
                              </div>

                              <div>
                                <label className="block text-[9px] font-bold text-slate-400 mb-0.5">福利额度/描述 *</label>
                                <input
                                  type="text"
                                  placeholder="例如：100元满减通用券 / 赠送香薰精油"
                                  value={newCouponDiscount}
                                  onChange={(e) => setNewCouponDiscount(e.target.value)}
                                  className="w-full bg-white border border-slate-200 p-2 rounded-lg text-slate-700"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-[9px] font-bold text-slate-400 mb-0.5">福利使用场景与限制</label>
                                <input
                                  type="text"
                                  placeholder="例如：老客更换滤芯专用，或下单净化器主机立享"
                                  value={newCouponDesc}
                                  onChange={(e) => setNewCouponDesc(e.target.value)}
                                  className="w-full bg-white border border-slate-200 p-2 rounded-lg text-slate-700"
                                />
                              </div>

                              <div>
                                <label className="block text-[9px] font-bold text-slate-400 mb-0.5">到期截止时间</label>
                                <input
                                  type="date"
                                  value={newCouponExpiry}
                                  onChange={(e) => setNewCouponExpiry(e.target.value)}
                                  className="w-full bg-white border border-slate-200 p-2 rounded-lg text-slate-700"
                                />
                              </div>

                              <div className="flex items-end justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setShowAddCouponForm(false)}
                                  className="px-3 py-2 hover:bg-slate-200 text-slate-500 rounded-lg text-[10px] font-bold"
                                >
                                  取消
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddCouponToPool(selectedGroup.id)}
                                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-black"
                                >
                                  确认发放
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* List of Coupons */}
                        <div className="space-y-2.5">
                          {selectedGroup.coupons && selectedGroup.coupons.length > 0 ? (
                            selectedGroup.coupons.map((coupon) => (
                              <div key={coupon.id} className="border border-dashed border-indigo-100 rounded-xl p-3.5 bg-indigo-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase">
                                      {coupon.code}
                                    </span>
                                    <strong className="text-xs text-slate-800">{coupon.discount}</strong>
                                  </div>
                                  <p className="text-[10px] text-slate-400 leading-snug">{coupon.description}</p>
                                  <div className="text-[8px] text-slate-400 font-mono">有效期至: {coupon.expiry}</div>
                                </div>

                                <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1">
                                  <span className="text-[10px] text-slate-400 font-medium">
                                    累计已分发: <strong className="text-indigo-600 font-black">{coupon.distributedCount}</strong> 次
                                  </span>
                                  <button
                                    onClick={() => {
                                      // Increment count
                                      coupon.distributedCount += 1;
                                      setPrivateGroups([...privateGroups]);
                                      triggerToast(`📢 福利券 [${coupon.code}] 已成功分发至该群所有粉丝客户端！`);
                                    }}
                                    className="px-2.5 py-1 bg-white hover:bg-slate-50 border text-slate-700 text-[9px] font-bold rounded-lg transition-colors cursor-pointer"
                                  >
                                    群发直戳福利
                                  </button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-xs text-slate-400 py-3">
                              暂无发布福利优惠券。点击右上方录入建立第一个专属引流券吧！
                            </div>
                          )}
                        </div>
                      </div>

                      {/* AUTOMATED AI RECALL PLAYBOOKS & TALKING SUGGESTIONS */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 border-b pb-2">
                          <Sparkles className="w-4.5 h-4.5 text-indigo-600 animate-pulse" />
                          <h3 className="font-extrabold text-slate-800 text-xs">
                            本蓄水池专属 AI 联动维护锦囊话术 (粉丝二次变现裂变)
                          </h3>
                        </div>

                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          针对购买了<strong>{associatedCampaign?.title || "本期广告"}</strong>的粉丝，系统基于AI大数据画像，自动为您生成了以下联动裂变和复购维护方案：
                        </p>

                        <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                          {selectedGroup.campaignId === "camp_01" ? (
                            <>
                              <div className="flex items-start gap-2 text-slate-600">
                                <span className="font-bold text-indigo-600 flex-none bg-indigo-50 px-1.5 py-0.5 rounded text-[9px] tracking-wide">WhatsApp群复购公告</span>
                                <p className="font-mono text-[11px] leading-relaxed">
                                  📢 「私域空气净化器粉丝独享福利」：晓晓和Amy姐争取到了一大批<strong>空气净化器加滤网专用立减50元大券</strong>！另外，前20名购买滤芯的老铁，我们私域再贴钱赠送香薰精油礼包！点击卡片领取并享受佣金：<span className="text-indigo-600 select-all font-bold">MORN_FILTER_50</span>
                                </p>
                              </div>
                              <div className="flex items-start gap-2 text-slate-600 pt-2 border-t border-dashed border-slate-200">
                                <span className="font-bold text-rose-600 flex-none bg-rose-50 px-1.5 py-0.5 rounded text-[9px] tracking-wide">老客高忠私戳</span>
                                <p className="font-mono text-[11px] leading-relaxed">
                                  嗨宝贝！感谢你上周支持了我的空气净化器，体验还不错吧？下周我联动洛斐键盘做数码桌面，我这里跟品牌主理人硬要来了一个<strong>独家无门槛20元降温福利券</strong>，只给买过净化器的自己人！点击就可以领取，你可以闭眼入！😘
                                </p>
                              </div>
                            </>
                          ) : selectedGroup.campaignId === "camp_03" ? (
                            <>
                              <div className="flex items-start gap-2 text-slate-600">
                                <span className="font-bold text-indigo-600 flex-none bg-indigo-50 px-1.5 py-0.5 rounded text-[9px] tracking-wide">键盘狂热群公告</span>
                                <p className="font-mono text-[11px] leading-relaxed">
                                  ⌨️ 「机械键盘发烧友群发」：本次【洛斐极地机械键盘】购买的兄弟们，专属极简键帽升级包现已到达！群内前100名粉丝发放<strong>20元满减专用大券</strong>！佣金直通，点击领券装扮您的桌面吧！优惠券代码：<span className="text-indigo-600 select-all font-bold">LOFREE_KEY_20</span>
                                </p>
                              </div>
                              <div className="flex items-start gap-2 text-slate-600 pt-2 border-t border-dashed border-slate-200">
                                <span className="font-bold text-rose-600 flex-none bg-rose-50 px-1.5 py-0.5 rounded text-[9px] tracking-wide">极客老粉私密推</span>
                                <p className="font-mono text-[11px] leading-relaxed">
                                  哈罗老哥！看到你支持了我的洛斐键盘测评，十分感谢！知道你是软装发烧友，这次极地款限量键帽，我向厂商申请到了一个专属福利，直接贴钱返佣给你！点击这个福利链接即可享受底价：<span className="text-indigo-600 font-bold">LOFREE_KEY_20</span>
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-start gap-2 text-slate-600">
                                <span className="font-bold text-indigo-600 flex-none bg-indigo-50 px-1.5 py-0.5 rounded text-[9px] tracking-wide">智能群发模板</span>
                                <p className="font-mono text-[11px] leading-relaxed">
                                  📢 「私域专属限时福利来袭！」：感谢大家对本次推广的关注！今天Amy为大家带来了专属无门槛大礼券，前30名还有额外大奖赠送！期待您的持续关注！
                                </p>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={() => {
                              // Increase distributed metrics
                              if (selectedGroup.coupons && selectedGroup.coupons.length > 0) {
                                selectedGroup.coupons.forEach(cp => {
                                  cp.distributedCount += Math.floor(10 + Math.random() * 20);
                                });
                                setPrivateGroups([...privateGroups]);
                              }
                              triggerToast(`🔊 专属AI联动营销模板已群发广播至本蓄水池的 ${selectedGroup.activeMembers} 名粉丝会话中！群优惠券分发量瞬间拉满！`);
                            }}
                            className="w-full py-2 bg-slate-900 hover:bg-slate-850 text-white font-extrabold text-[10px] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Radio className="w-3.5 h-3.5 text-indigo-400" />
                            <span>一键向本群粉丝广播/分发此AI话术与配套福利券</span>
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })()}

            </div>
          )}
            </>
          ) : (
            <div className="space-y-6">
              {advTab === "adv-overview" && renderAdvertiserOverview()}
              {advTab === "adv-campaigns" && renderAdvertiserCampaigns()}
              {advTab === "adv-applications" && renderAdvertiserApplications()}
              {advTab === "adv-payouts" && renderAdvertiserPayouts()}
            </div>
          )}

        </main>
      </div>
      )}

      {/* OnlyFans Locked Post Unlock Simulated Modal */}
      {unlockModalPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl animate-scale-up">
            <div className="flex items-center gap-2.5 text-rose-600 border-b pb-3 mb-3.5">
              <Crown className="w-5 h-5 flex-none" />
              <h4 className="font-black text-sm text-slate-800">核对支持并解锁博主独家干货</h4>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              这里是针对粉丝支持消费的闭试模拟：解锁当前选中的 <strong>“{unlockModalPost.title}”</strong>。
            </p>

            <div className="my-4 bg-slate-50 p-3.5 rounded-xl border text-center">
              <span className="text-[10px] text-slate-400 block tracking-widest uppercase">解锁单片所需赞助</span>
              <strong className="text-2xl font-black text-slate-800 font-mono">¥{unlockModalPost.unlockPrice?.toFixed(2)}</strong>
              
              <div className="mt-2 text-[10px] text-slate-400 leading-snug flex items-center justify-center gap-1">
                <span>分成比例一览: </span>
                <span className="text-indigo-600 font-bold">KOL自得 ¥{((unlockModalPost.unlockPrice || 5) * 0.70).toFixed(2)} (70%)</span>
                <span>/</span>
                <span className="text-slate-500">平台收取服务费 ¥{((unlockModalPost.unlockPrice || 5) * 0.30).toFixed(2)} (30%)</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
              💡 本项目为商业分成系统示范（CPS/CPA 佣金模型）。在实际产品中支持 Stripe / PayPal 全球信用支付、Apple Pay 极速结账并在合规银行中 7/3 实时拆账，确保全球业务安全正规。
            </p>

            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setUnlockModalPost(null)}
                className="flex-1 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-lg text-center"
              >
                再想想
              </button>
              <button
                onClick={() => handleUnlockPostSimulated(unlockModalPost)}
                className="flex-1.5 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-lg text-center shadow"
              >
                模拟粉丝付款并解锁
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Message Notification popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-slate-100 px-4 py-3 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-2.5 max-w-sm animate-fade-in-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-none" />
          <span className="text-xs font-semibold leading-relaxed">{toastMessage}</span>
        </div>
      )}

      {/* Elegant minimalist footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-400">
        <p>© 2026 Kollovin - 中小KOL一站式商业化成长与自主变现网站. 70/30 分享引擎商业版权所有.</p>
        <p className="mt-1 text-[10px] text-slate-300">
          基于 Vite、Tailwind CSS 与 Google Gemini APIs 实时素材分析技术提供技术支持
        </p>
      </footer>

    </div>
  );
}

// Simple internal icon helper for ratings
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
