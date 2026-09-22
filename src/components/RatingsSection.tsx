import React, { useState } from 'react';
import { ReviewItem } from '../types.ts';
import { Star, ShieldCheck, ThumbsUp, MessageSquare, Check, User, Sparkles } from 'lucide-react';

interface RatingsSectionProps {
  reviews: ReviewItem[];
  onAddReview: (review: ReviewItem) => void;
}

export const RatingsSection: React.FC<RatingsSectionProps> = ({
  reviews,
  onAddReview
}) => {
  const [targetRole, setTargetRole] = useState<'DM' | 'Player'>('DM');
  const [selectedStars, setSelectedStars] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Great narrator', 'Atmospheric terrain']);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const availableTags = targetRole === 'DM' 
    ? ['Great narrator', 'Fair rulings', 'Kept pace', 'Included everyone', 'Well prepared', 'Atmospheric terrain', 'Clear combat management', 'Beginner friendly']
    : ['On time', 'Brought snacks', 'Team player', 'Creative roleplay', 'Notes keeper', 'Prompt & reliable', 'Supports party', 'Respects safety tools'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      reviewerName: targetRole === 'DM' ? 'You (Player)' : 'You (DM)',
      targetName: targetRole === 'DM' ? 'Theo Vance' : 'Mara Quill',
      targetRole,
      campaign: 'The Sunken Archive (In-Person)',
      rating: selectedStars,
      date: 'Just now',
      tags: selectedTags,
      comment: comment.trim() || (targetRole === 'DM' ? 'Fantastic physical session! Highly recommend Theo.' : 'Wonderful table member, arrived on time and great roleplay.')
    };

    onAddReview(newRev);
    setSubmitted(true);
    setComment('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-14 border-b border-[#E3D9F3] bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Head */}
        <div className="max-w-2xl mb-12">
          <div className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E14760] mb-1">
            Trust & Physical Table Reputation
          </div>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#241934] mb-2">
            Know Who's Showing Up, Before You Sit Down
          </h2>
          <p className="text-sm text-[#7B6A93] leading-relaxed">
            After every physical session, DMs and players rate each other — two-way, tag-based feedback that builds a reputation you can trust before inviting someone into your home or shop.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Four Core Pillars */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3] flex items-center justify-center shrink-0 text-[#4A3068]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3"/>
                </svg>
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-base text-[#241934] mb-0.5">
                  Two-way, after every session
                </h3>
                <p className="text-xs text-[#7B6A93] leading-relaxed">
                  Players rate the DM, the DM rates the players — nobody's reputation depends on a one-sided review, preventing toxic gatekeeping.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3] flex items-center justify-center shrink-0 text-[#4A3068]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.6 12.6l-8.2 8.2a2 2 0 01-2.8 0L2 13.2V4a2 2 0 012-2h9.2a2 2 0 011.4.6l6 6a2 2 0 010 2.8z"/>
                  <circle cx="7.5" cy="7.5" r="1.5"/>
                </svg>
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-base text-[#241934] mb-0.5">
                  Tags, not just arbitrary stars
                </h3>
                <p className="text-xs text-[#7B6A93] leading-relaxed">
                  Ratings capture specific table virtues: "fair rulings," "on time," "atmospheric terrain," "included everyone" — so scores mean something concrete.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3] flex items-center justify-center shrink-0 text-[#4A3068]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-base text-[#241934] mb-0.5">
                  Visible on every physical profile & card
                </h3>
                <p className="text-xs text-[#7B6A93] leading-relaxed">
                  Average ratings and top feedback tags show up directly in the Discovery Matcher and the Table Directory.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3] flex items-center justify-center shrink-0 text-[#4A3068]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 8v4M12 16h.01"/>
                </svg>
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-base text-[#241934] mb-0.5">
                  One off-night won't sink you
                </h3>
                <p className="text-xs text-[#7B6A93] leading-relaxed">
                  New members start unrated (not zero), and scores are weighted averages over physical campaigns — not a single review away from ruin.
                </p>
              </div>
            </div>

            {/* Profile Badges Summary */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3] flex items-center gap-3">
                <div className="font-fraunces text-2xl font-bold text-[#241934]">4.98</div>
                <div>
                  <div className="text-xs font-semibold text-[#241934]">DM Average</div>
                  <div className="font-mono text-[10px] text-[#7B6A93]">68 sessions · TOP: "GREAT NARRATOR"</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3] flex items-center gap-3">
                <div className="font-fraunces text-2xl font-bold text-[#241934]">4.90</div>
                <div>
                  <div className="text-xs font-semibold text-[#241934]">Player Average</div>
                  <div className="font-mono text-[10px] text-[#7B6A93]">19 sessions · TOP: "ON TIME"</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Rate Widget from HTML preview */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-[#E3D9F3] p-6 sm:p-7 shadow-xl shadow-[#241934]/5">
              
              {/* Widget Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E3D9F3] mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#4A3068] to-[#241934] text-white flex items-center justify-center font-fraunces font-bold text-base">
                    {targetRole === 'DM' ? 'T' : 'M'}
                  </div>
                  <div>
                    <h3 className="font-fraunces font-bold text-base text-[#241934]">
                      {targetRole === 'DM' ? 'Rate Theo Vance (DM)' : 'Rate Mara Quill (Player)'}
                    </h3>
                    <div className="font-mono text-xs text-[#7B6A93]">
                      THE SUNKEN ARCHIVE · IN-PERSON SESSION 12
                    </div>
                  </div>
                </div>

                {/* Switch Target Toggle */}
                <div className="flex items-center gap-1 p-1 bg-[#F1EBFA] rounded-full text-xs font-mono">
                  <button
                    onClick={() => { setTargetRole('DM'); setSelectedTags(['Great narrator', 'Atmospheric terrain']); }}
                    className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${targetRole === 'DM' ? 'bg-white text-[#241934] font-semibold shadow-xs' : 'text-[#7B6A93]'}`}
                  >
                    Rate DM
                  </button>
                  <button
                    onClick={() => { setTargetRole('Player'); setSelectedTags(['On time', 'Brought snacks']); }}
                    className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${targetRole === 'Player' ? 'bg-white text-[#241934] font-semibold shadow-xs' : 'text-[#7B6A93]'}`}
                  >
                    Rate Player
                  </button>
                </div>
              </div>

              <form onSubmit={handleRateSubmit} className="space-y-4">
                
                {/* Star Picker */}
                <div>
                  <label className="block text-xs text-[#7B6A93] font-mono uppercase font-semibold mb-1.5">
                    How was {targetRole === 'DM' ? 'Theo as Game Master' : 'Mara at the table'}?
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setSelectedStars(star)}
                        className="p-1 text-[#E8A23D] hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`${star} star`}
                      >
                        <Star className={`w-7 h-7 ${star <= selectedStars ? 'fill-[#E8A23D]' : 'fill-none stroke-[#C9BEDD]'}`} />
                      </button>
                    ))}
                    <span className="ml-2 font-mono text-sm font-semibold text-[#241934]">
                      {selectedStars}.0 / 5.0
                    </span>
                  </div>
                </div>

                {/* Tag Picker */}
                <div>
                  <label className="block text-xs text-[#7B6A93] font-mono uppercase font-semibold mb-2">
                    What stood out? (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => {
                      const isActive = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${isActive ? 'bg-[#241934] text-white font-semibold' : 'bg-white text-[#4A3068] border border-[#E3D9F3] hover:border-[#FF5D73]'}`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Written Compliment / Feedback */}
                <div>
                  <label className="block text-xs text-[#7B6A93] font-mono uppercase font-semibold mb-1">
                    Table Note or Compliment (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={targetRole === 'DM' ? 'e.g. Theo made amazing wax seal handouts and kept combat thrilling!' : 'e.g. Mara brought delicious rosemary focaccia and had great character sketches!'}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3] text-xs text-[#241934] focus:outline-none focus:border-[#FF5D73]"
                  />
                </div>

                {/* Live Result & Submit */}
                <div className="pt-3 border-t border-[#E3D9F3] flex items-center justify-between">
                  <div className="text-xs font-mono text-[#7B6A93]">
                    {targetRole === 'DM' ? "THEO'S PROFILE SCORE:" : "MARA'S PROFILE SCORE:"}
                    <span className="font-fraunces font-bold text-base text-[#241934] ml-1.5">5.0 ★</span>
                  </div>

                  {submitted ? (
                    <div className="px-4 py-2 rounded-full bg-[#2EC4B6] text-white text-xs font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Feedback Logged!</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-full bg-[#FF5D73] text-white text-xs font-semibold hover:bg-[#E14760] transition-colors cursor-pointer"
                    >
                      Submit Table Rating
                    </button>
                  )}
                </div>

              </form>

            </div>
          </div>

        </div>

        {/* Community Endorsement Feed */}
        <div className="mt-12 pt-8 border-t border-[#E3D9F3]">
          <h3 className="font-fraunces font-bold text-xl text-[#241934] mb-4">
            Recent In-Person Table Endorsements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map(rev => (
              <div key={rev.id} className="p-5 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#7B6A93] mb-2">
                    <span className="font-semibold text-[#241934]">{rev.reviewerName} → {rev.targetName}</span>
                    <span className="flex items-center text-[#E8A23D]">
                      {'★'.repeat(rev.rating)}
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-[#FF5D73] mb-2">
                    {rev.campaign} · {rev.date}
                  </div>
                  <p className="text-xs text-[#4A3068] leading-relaxed italic mb-3">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {rev.tags.map((t, i) => (
                    <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#E3D9F3] text-[#7B6A93]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
