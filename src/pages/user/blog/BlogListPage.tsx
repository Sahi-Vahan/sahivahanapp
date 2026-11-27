import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Car, 
  Bike, 
  AlertTriangle, 
  FileCheck,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../../../data/blogData';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { SEO } from '../../../components/common/SEO';

export const BlogListPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Scam Alerts', 'Car Inspection', 'Bike Inspection', 'Diagnostics & Tech', 'Legal & Paperwork', 'Buying Guide'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  // Schema.org Structured Data for AI & Search Engine discovery
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'SahiVahan Automotive Inspection Knowledge Hub',
    'description': 'Authoritative technical guides, scam warnings, and checklists for used car and bike buyers in India.',
    'url': 'https://sahivahan.com/blog',
    'publisher': {
      '@type': 'Organization',
      'name': 'SahiVahan',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://sahivahan.com/images/logo.png'
      }
    },
    'blogPost': BLOG_POSTS.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.metaDescription,
      'datePublished': post.publishedDate,
      'dateModified': post.updatedDate,
      'author': {
        '@type': 'Person',
        'name': post.author.name
      },
      'url': `https://sahivahan.com/blog/${post.slug}`
    }))
  };

  return (
    <div className="space-y-4 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO
        title="Used Vehicle Buying Guides, Scam Prevention & Inspection Advice"
        description="Expert guides on used car & bike buying in India. Learn to spot meter tampering, repainted panels, accidental frame damage, and flood-damaged cars."
        keywords="used car buying guide India, odometer tampering detection, ultrasonic paint meter guide, pre purchase inspection tutorials"
        schema={structuredData}
      />

      {/* Compact Page Header with Integrated Search (No giant green box) */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3.5 space-y-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#154D3F] dark:text-emerald-400">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>SahiVahan Knowledge Hub & AI Research</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Used Vehicle Intelligence & Buyer Advisory
            </h1>
            
            <p className="text-slate-500 dark:text-slate-400 text-xs max-w-2xl">
              Forensic inspection guides, scam detection tutorials, ultrasonic paint benchmarks, and legal transfer advice by certified specialists.
            </p>
          </div>

          {/* Compact Quick Search */}
          <div className="w-full md:w-72 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search guides (e.g. odometer fraud)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#154D3F] focus:bg-white transition"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Snug & Clean) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#154D3F] text-white shadow-xs dark:bg-emerald-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Article (Compact & Proportional Editorial Layout) */}
      {selectedCategory === 'All' && !searchQuery && featuredPost && (
        <div className="bg-white dark:bg-[#12181E] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-all p-4 sm:p-5 lg:p-6 space-y-4">
          {/* Top Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Badge variant="teal" size="sm">★ FEATURED FORENSIC REPORT</Badge>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{featuredPost.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredPost.publishedDate}</span>
            </div>
            
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">
              SahiVahan Technical Intelligence
            </div>
          </div>

          {/* Full-Width Heading */}
          <div className="space-y-1.5">
            <Link to={`/blog/${featuredPost.slug}`} className="block">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition leading-snug">
                {featuredPost.title}
              </h2>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl line-clamp-2">
              {featuredPost.subtitle}
            </p>
          </div>

          {/* Media & Key Takeaways Grid (Compact height) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            <div className="lg:col-span-6 relative rounded-xl sm:rounded-2xl overflow-hidden h-36 sm:h-44 lg:h-48 border border-slate-100 dark:border-slate-800">
              <img 
                src={featuredPost.featuredImage} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between space-y-3 bg-slate-50 dark:bg-[#0A0E12] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Key Diagnostic Insight
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-3">
                  {featuredPost.keyTakeaways[0]}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3.5 mt-2 border-t border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#154D3F] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {featuredPost.author.avatarInitials}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">{featuredPost.author.name}</p>
                    <p className="text-[10px] text-slate-500">{featuredPost.author.role}</p>
                  </div>
                </div>

                <Link to={`/blog/${featuredPost.slug}`}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Read Article
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {selectedCategory === 'All' ? 'All Published Forensic Guides' : `${selectedCategory} Articles`}
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#12181E] rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No guides found matching your query.</p>
            <Button variant="outline" size="sm" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <article 
                key={post.slug}
                className="bg-white dark:bg-[#12181E] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-emerald-300 border border-white/10">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 pb-5 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.publishedDate}</span>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed pb-1">
                      {post.subtitle}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto bg-slate-50/50 dark:bg-slate-900/30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#154D3F] text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs">
                      {post.author.avatarInitials}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{post.author.name}</span>
                  </div>

                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="text-xs font-bold text-[#154D3F] dark:text-emerald-400 flex items-center gap-1 hover:gap-1.5 transition-all hover:underline"
                  >
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Conversion Prompt */}
      <div className="bg-[#12181E] border border-emerald-900/40 rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <Badge variant="teal">Doorstep Certified Inspections</Badge>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Found a used car or bike you like? Don't buy blind.
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Our diagnostic specialists arrive with ultrasonic paint gauges and OBD scanners to conduct an exhaustive 140+ point check. Protect yourself from lemon vehicles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link to="/inquire">
            <Button variant="white" size="lg" className="font-extrabold shadow-lg">
              Book Inspection Now
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="glass" size="lg" className="font-bold">
              View Inspection Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
