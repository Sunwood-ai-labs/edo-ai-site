// ==========================================================================
// 江戸×AI サイト JavaScript
// ==========================================================================

// DOM要素が読み込まれてから実行
document.addEventListener('DOMContentLoaded', function() {
    // 初期化
    initNavigation();
    initScrollEffects();
    initCharacterModals();
    initExperiences();
    initParticles();
    initAnimations();
});

// ==========================================================================
// ナビゲーション機能
// ==========================================================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // モバイルメニュートグル
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // スムーズスクロール
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // ナビゲーションの高さを考慮
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // モバイルメニューを閉じる
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // スクロール時のナビゲーション効果
    window.addEventListener('scroll', () => {
        const navigation = document.querySelector('.navigation');
        if (window.scrollY > 100) {
            navigation.style.background = 'rgba(245, 245, 220, 0.98)';
            navigation.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navigation.style.background = 'rgba(245, 245, 220, 0.95)';
            navigation.style.boxShadow = 'none';
        }
    });
}

// ==========================================================================
// スクロールエフェクト
// ==========================================================================
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // 観察対象の要素を追加
    const elementsToAnimate = document.querySelectorAll('.character-item, .experience-card, .knowledge-card, .scenario-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // パララックス効果
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.edo-pattern, .particles');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==========================================================================
// キャラクター詳細モーダル
// ==========================================================================
function initCharacterModals() {
    const characterButtons = document.querySelectorAll('.character-detail-btn');
    const modal = document.getElementById('characterModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');

    // キャラクター詳細データ
    const characterData = {
        samurai: {
            name: '武田信之助',
            role: '武士',
            avatar: '👨‍💼',
            quote: 'このChatGPTとやら、まさに現代の軍師じゃ！',
            description: '江戸城に仕える下級武士。文武両道を重んじ、常に学問に励んでいる。AIの登場により、これまで困難だった漢詩や俳句の創作が飛躍的に向上した。',
            aiUses: [
                '俳句・短歌の創作支援',
                '兵法書の現代語訳と解釈',
                '手紙の代筆（特にラブレター）',
                '武術の動作解析と改善提案'
            ],
            scenarios: [
                '朝の稽古前に、AIに今日の心境を俳句で表現してもらう',
                '複雑な兵法書をAIに分かりやすく説明してもらい、部下への指導に活用',
                '想い人への手紙をAIと共作し、美しい文章で気持ちを伝える'
            ]
        },
        merchant: {
            name: '江戸屋金蔵',
            role: '商人',
            avatar: '🏪',
            quote: '商売のカンがAIで数値化できるとは！',
            description: '日本橋で呉服店を営む商人。商売上手で知られ、常に新しい商機を探している。AIの予測能力により、これまでの経験と勘に基づく商売が科学的根拠を持つようになった。',
            aiUses: [
                '季節商品の需要予測',
                '帳簿管理と売上分析',
                '顧客の好みに応じた商品推薦',
                '効果的な販促文案の作成'
            ],
            scenarios: [
                '桜の開花時期を予測して、花見用品の仕入れタイミングを最適化',
                'AIが顧客の購買履歴を分析し、個別におすすめ商品を提案',
                '江戸っ子の心を掴む呼び込み文句をAIと一緒に考案'
            ]
        },
        artisan: {
            name: '歌麿II',
            role: '浮世絵師',
            avatar: '🎨',
            quote: '絵筆とAIの合わせ技、これぞ新時代の浮世絵じゃ！',
            description: '浮世絵の名門に生まれた絵師。伝統的な技法を受け継ぎながらも、新しい表現を追求している。AIにより下絵制作の時間が短縮され、より創作活動に集中できるようになった。',
            aiUses: [
                '構図とポーズの下絵生成',
                '着物の新しい柄デザイン',
                '建築物の3D設計図作成',
                '色彩パターンの提案'
            ],
            scenarios: [
                'AIが生成した下絵を基に、独自の感性で仕上げる新しい美人画',
                '季節の花鳥風月をAIと共にデザインした革新的な着物柄',
                '橋や建物の設計図をAIで3D化し、より魅力的な構図を発見'
            ]
        },
        geisha: {
            name: '桜子',
            role: '芸者',
            avatar: '🎭',
            quote: '三味線の新曲がこんなに簡単に！お座敷が華やぐわ〜',
            description: '吉原で活躍する人気芸者。舞踊と三味線の名手として知られる。AIの音楽生成により、毎月新しい楽曲でお客様を楽しませることができるようになった。',
            aiUses: [
                '季節に合わせた三味線楽曲の作曲',
                '新しい舞踊の振付け考案',
                'お客様の好みに応じたカスタム演奏',
                '宴席を盛り上げる遊戯の提案'
            ],
            scenarios: [
                '春の訪れを歌った新曲を AIと作曲し、お花見の宴で披露',
                'お客様のリクエストに応じて、その場でオリジナル楽曲を生成',
                'AIが提案する新しい振付けで、伝統とモダンが融合した舞踊を創作'
            ]
        },
        scholar: {
            name: '青木玄道',
            role: '蘭学者',
            avatar: '📚',
            quote: 'オランダ語の文献がこんなに早く読めるとは！',
            description: '長崎で蘭学を学んだ学者。医学と自然科学に精通している。AIの翻訳機能により、海外の最新知識を即座に日本に紹介できるようになった。',
            aiUses: [
                'オランダ語・ラテン語文献の自動翻訳',
                '天体観測データの解析',
                '医学書の図解化とわかりやすい説明',
                '科学実験の結果予測'
            ],
            scenarios: [
                'ヨーロッパの最新医学論文をAIで翻訳し、日本の医療技術向上に貢献',
                '天体の動きをAIが分析し、より正確な暦の作成',
                '複雑な解剖図をAIが3D化し、医学教育の効率を向上'
            ]
        },
        farmer: {
            name: '田中与作',
            role: '農民',
            avatar: '🌾',
            quote: '今年は豊作間違いなし！AIのお陰だべ〜',
            description: '関東平野で稲作を営む農民。代々受け継がれた農法に、AIの科学的アプローチを取り入れている。天候予測と作物管理により、安定した収穫を実現している。',
            aiUses: [
                '気象パターンによる作付け時期の最適化',
                '害虫・病気の早期発見と対策',
                '土壌状態の分析と改善提案',
                '収穫量の予測と出荷計画'
            ],
            scenarios: [
                'AIの天候予測により、台風の被害を最小限に抑える対策を実施',
                '稲の生育状況をAIが画像解析し、適切な水管理と肥料投与',
                '害虫の発生パターンをAIが予測し、被害を未然に防ぐ'
            ]
        }
    };

    // ボタンクリックイベント
    characterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const characterType = button.getAttribute('data-character');
            const character = characterData[characterType];
            
            if (character) {
                showCharacterModal(character);
            }
        });
    });

    // モーダル表示関数
    function showCharacterModal(character) {
        modalContent.innerHTML = `
            <div class="modal-character">
                <div class="modal-header">
                    <div class="modal-avatar">${character.avatar}</div>
                    <div class="modal-info">
                        <h2>${character.name}</h2>
                        <p class="modal-role">${character.role}</p>
                        <p class="modal-quote">"${character.quote}"</p>
                    </div>
                </div>
                
                <div class="modal-description">
                    <h3>人物紹介</h3>
                    <p>${character.description}</p>
                </div>
                
                <div class="modal-ai-uses">
                    <h3>AI活用方法</h3>
                    <ul>
                        ${character.aiUses.map(use => `<li>${use}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-scenarios">
                    <h3>活用シナリオ</h3>
                    <div class="scenario-list">
                        ${character.scenarios.map((scenario, index) => `
                            <div class="scenario-item">
                                <span class="scenario-number">${index + 1}</span>
                                <p>${scenario}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // モーダル閉じる
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// ==========================================================================
// 体験コーナーの機能
// ==========================================================================
function initExperiences() {
    const experienceButtons = document.querySelectorAll('.experience-btn');
    
    experienceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.experience-card');
            const experienceType = getExperienceType(card);
            
            handleExperience(experienceType);
        });
    });

    function getExperienceType(card) {
        if (card.classList.contains('haiku-generator')) return 'haiku';
        if (card.classList.contains('avatar-creator')) return 'avatar';
        if (card.classList.contains('merchant-sim')) return 'merchant';
        if (card.classList.contains('music-creator')) return 'music';
        return 'unknown';
    }

    function handleExperience(type) {
        switch (type) {
            case 'haiku':
                showHaikuGenerator();
                break;
            case 'avatar':
                showAvatarCreator();
                break;
            case 'merchant':
                showMerchantSimulator();
                break;
            case 'music':
                showMusicCreator();
                break;
            default:
                showComingSoon();
        }
    }

    function showHaikuGenerator() {
        const haikuPrompts = [
            { season: '春', keywords: ['桜', '芽吹き', '若葉'], haiku: '桜散り\n新緑映える\n江戸の空' },
            { season: '夏', keywords: ['祭り', '花火', '縁日'], haiku: '夏祭り\n花火と共に\n夢踊る' },
            { season: '秋', keywords: ['紅葉', '月見', '収穫'], haiku: '月明かり\n紅葉舞い散る\n静寂かな' },
            { season: '冬', keywords: ['雪', '寒さ', '炬燵'], haiku: '雪景色\n炬燵で温む\n心かな' }
        ];
        
        const randomHaiku = haikuPrompts[Math.floor(Math.random() * haikuPrompts.length)];
        
        alert(`🌸 AI俳句生成器 🌸\n\n季節: ${randomHaiku.season}\nキーワード: ${randomHaiku.keywords.join('、')}\n\n生成された俳句:\n${randomHaiku.haiku}\n\n※実際のサイトでは、ユーザーがキーワードを入力して\nオリジナル俳句を生成できます！`);
    }

    function showAvatarCreator() {
        alert(`🎭 浮世絵アバター変換 🎭\n\n写真をアップロードすると、\nAIが浮世絵風に変換します！\n\n変換スタイル:\n• 歌川広重風\n• 葛飾北斎風\n• 喜多川歌麿風\n\n※実際のサイトでは画像処理AIを\n使用した変換機能を提供予定です！`);
    }

    function showMerchantSimulator() {
        const scenarios = [
            '春の桜商戦で花見団子を販売\n→ AIが最適な価格と販売場所を提案',
            '夏の祭り用品の仕入れ判断\n→ AIが過去データから需要を予測',
            '秋の新商品企画\n→ AIが流行を分析して商品提案'
        ];
        
        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        
        alert(`💰 江戸商人シミュレーター 💰\n\n今日の商売シナリオ:\n${randomScenario}\n\n結果: 大成功！\n利益: 50両\n\n※実際のサイトでは、様々な商売シナリオを\n体験できるゲーム形式のシミュレーターを\n提供予定です！`);
    }

    function showMusicCreator() {
        const melodies = [
            { title: '春風の調べ', mood: '軽やか', key: 'ホ長調' },
            { title: '夏夜の三味線', mood: '情熱的', key: 'イ短調' },
            { title: '秋月賛美', mood: '物悲しい', key: 'ニ短調' },
            { title: '雪降る夜', mood: '静寂', key: '変ロ長調' }
        ];
        
        const randomMelody = melodies[Math.floor(Math.random() * melodies.length)];
        
        alert(`🎵 AI三味線作曲体験 🎵\n\n生成された楽曲:\n「${randomMelody.title}」\n\n雰囲気: ${randomMelody.mood}\n調性: ${randomMelody.key}\n\n♪ ～美しい三味線の音色が\n江戸の街に響きます～ ♪\n\n※実際のサイトでは、AIが生成した\n三味線楽曲を再生できる機能を\n提供予定です！`);
    }

    function showComingSoon() {
        alert(`🚧 準備中 🚧\n\nこの機能は現在開発中です。\nもうしばらくお待ちください！`);
    }

    // アイデア投稿機能
    const submitBtn = document.querySelector('.submit-idea-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const textarea = document.querySelector('.input-container textarea');
            const idea = textarea.value.trim();
            
            if (idea) {
                alert(`💡 素晴らしいアイデアをありがとうございます！💡\n\n投稿内容:\n「${idea}」\n\n今後のサイト改善の参考にさせていただきます！`);
                textarea.value = '';
            } else {
                alert('アイデアを入力してください！');
            }
        });
    }
}

// ==========================================================================
// パーティクル効果
// ==========================================================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // 追加のパーティクルを動的生成
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${getRandomColor()};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.3};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
        `;
        
        particlesContainer.appendChild(particle);
        
        // パーティクルを一定時間後に削除
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }

    function getRandomColor() {
        const colors = ['#FFD700', '#D2691E', '#4169E1', '#FF6B35', '#00BFFF'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // 定期的にパーティクルを生成
    setInterval(createParticle, 2000);
}

// ==========================================================================
// アニメーション効果
// ==========================================================================
function initAnimations() {
    // キャラクターカードのホバーエフェクト
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateY(15deg) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0) scale(1)';
        });
    });

    // タイトルのタイピングエフェクト
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            typeWriter(line, text, 100);
        }, index * 800);
    });

    function typeWriter(element, text, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // ボタンのリップルエフェクト
    const buttons = document.querySelectorAll('.btn, .character-detail-btn, .experience-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // リップルアニメーションのCSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================================================
// ユーティリティ関数
// ==========================================================================

// スムーズスクロール（フォールバック）
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// デバウンス関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// パフォーマンス最適化
const debouncedScrollHandler = debounce(() => {
    // スクロール処理をここに
}, 16); // 60FPS

window.addEventListener('scroll', debouncedScrollHandler);

// ==========================================================================
// エラーハンドリング
// ==========================================================================
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Promise rejection のエラーハンドリング
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ==========================================================================
// 開発用デバッグ情報
// ==========================================================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🎭 江戸×AI サイト デバッグモード');
    console.log('サイト機能が正常に読み込まれました！');
}