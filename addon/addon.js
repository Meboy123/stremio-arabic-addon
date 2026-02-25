const { addonBuilder } = require('stremio-addon-sdk');

// Demo streams with Creative Commons licensed content
const DEMO_STREAMS = {
    'tt1254207': [
        {
            title: '1080p HD - مصدر 1',
            url: 'https://v56.shahd.lol',
            behaviorHints: {
                notWebReady: false,
                bingeGroup: 'كل الحاجات shahid.lol'
            }
        },
        {
            title: 'رمضان ٢٠٢٦ ',
            url: 'https://v56.shahd.lol/category.php?cat=ramadan-series-and-programs',
            behaviorHints: {
                notWebReady: false,
                bingeGroup: 'demo-source-2'
            }
        }
    ],
    'tt1727587': [
        {
            title: '1080p HD - مصدر 1',
            url: 'http://ftp.nluug.nl/pub/graphics/blender/demo/movies/Sintel.2010.1080p.mkv',
            behaviorHints: {
                notWebReady: false,
                bingeGroup: 'demo-source-1'
            }
        },
        {
            title: '720p HD - مصدر 2',
            url: 'http://ftp.nluug.nl/pub/graphics/blender/demo/movies/Sintel.2010.720p.mkv',
            behaviorHints: {
                notWebReady: false,
                bingeGroup: 'demo-source-2'
            }
        }
    ]
};

const manifest = {
    id: 'org.stremio.arabic.multisource',
    version: '1.0.0',
    name: 'إضافة Stremio العربية متعددة المصادر',
    description: 'إضافة لبث المحتوى العربي من مصادر متعددة - نسخة تجريبية بمحتوى قانوني',
    logo: 'https://via.placeholder.com/200x200.png?text=Arabic+Addon',
    resources: ['stream'],
    types: ['movie', 'series'],
    idPrefixes: ['tt'],
    catalogs: []
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async function(args) {
    console.log(`📺 طلب بث: ${args.type} ${args.id}`);
    
    try {
        if (DEMO_STREAMS[args.id]) {
            const streams = DEMO_STREAMS[args.id];
            console.log(`✅ تم العثور على ${streams.length} مصادر بث`);
            return { streams: streams };
        }
        
        console.log(`❌ لم يتم العثور على مصادر لـ ${args.id}`);
        return { streams: [] };
        
    } catch (error) {
        console.error('❌ خطأ في معالج البث:', error);
        return { streams: [] };
    }
});

module.exports = builder.getInterface();

