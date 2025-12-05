import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseCard from '../../components/student/CourseCard';
import Footer from '../../components/student/Footer';
import { assets } from '../../assets/assets';
import { useParams } from 'react-router-dom';

const CoursesList = () => {
  const { navigate, allCourses, calculateRating } = useContext(AppContext);
  const { input } = useParams();
  
  // --- Filter States ---
  const [searchQuery, setSearchQuery] = useState(input || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('all'); // 'all', 'free', 'paid'
  const [minRating, setMinRating] = useState(0); // 0, 3, 4
  const [sortOption, setSortOption] = useState('relevant'); // 'relevant', 'price-low', 'price-high', 'rating'
  
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // For mobile toggle

  // Categories with Smart Keywords
  const categories = [
    { name: 'All', keywords: [] },
    { name: 'Web Dev', keywords: ['web', 'react', 'js', 'javascript', 'html', 'css', 'mern', 'stack', 'frontend', 'backend'] },
    { name: 'Data Science', keywords: ['data', 'python', 'machine', 'learning', 'ai', 'statistics', 'analysis', 'sql'] },
    { name: 'Design', keywords: ['design', 'ui', 'ux', 'figma', 'adobe', 'graphic', 'photoshop', 'illustrator'] },
    { name: 'Marketing', keywords: ['marketing', 'business', 'seo', 'social', 'media', 'branding', 'content', 'ads'] },
    { name: 'Business', keywords: ['business', 'finance', 'management', 'startup', 'entrepreneurship', 'leadership', 'strategy'] },
    { name: 'Technology', keywords: ['cybersecurity', 'cloud', 'devops', 'software', 'network', 'it', 'blockchain', 'iot'] },
    { name: 'Health', keywords: ['health', 'fitness', 'yoga', 'meditation', 'nutrition', 'diet', 'mental', 'wellness'] },
  ];

  // Helper to calculate effective price
  const getEffectivePrice = (course) => {
    return (course.coursePrice || 0) - ((course.discount || 0) * (course.coursePrice || 0) / 100);
  };

  useEffect(() => {
    if (input) setSearchQuery(input);
  }, [input]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      let tempCourses = allCourses.slice();

      // 1. Search Query
      if (searchQuery) {
        tempCourses = tempCourses.filter(item =>
          item.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // 2. Category Filter (Smart Matching)
      if (selectedCategory !== 'All') {
        const categoryData = categories.find(c => c.name === selectedCategory);
        if (categoryData) {
          tempCourses = tempCourses.filter(item => 
            categoryData.keywords.some(keyword => 
              item.courseTitle.toLowerCase().includes(keyword)
            )
          );
        }
      }

      // 3. Price Filter
      if (selectedPrice === 'free') {
        tempCourses = tempCourses.filter(item => getEffectivePrice(item) === 0);
      } else if (selectedPrice === 'paid') {
        tempCourses = tempCourses.filter(item => getEffectivePrice(item) > 0);
      }

      // 4. Rating Filter
      if (minRating > 0) {
        tempCourses = tempCourses.filter(item => calculateRating(item) >= minRating);
      }

      // 5. Sorting
      switch (sortOption) {
        case 'price-low':
          tempCourses.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
          break;
        case 'price-high':
          tempCourses.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
          break;
        case 'rating':
          tempCourses.sort((a, b) => calculateRating(b) - calculateRating(a));
          break;
        default: // 'relevant' - no specific sort (could be by popularity/date if data existed)
          break;
      }

      setFilteredCourses(tempCourses);
    }
  }, [allCourses, searchQuery, selectedCategory, selectedPrice, minRating, sortOption]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPrice('all');
    setMinRating(0);
    setSortOption('relevant');
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative flex flex-col">
      
      {/* --- Mobile Filter Header --- */}
      <div className="px-8 py-6 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30 flex justify-between items-center md:hidden">
        {/* Breadcrumbs Removed */}
        
        {/* Mobile Filter Toggle */}
        <button 
            className='flex items-center gap-2 text-sm font-medium text-primary ml-auto'
            onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
            Filters <img src={assets.dropdown_icon} alt="" className={`w-3 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        
        {/* --- Sidebar (Filters) --- */}
        <div className={`
            w-full md:w-72 bg-card/30 border-r border-border p-6 
            md:min-h-screen md:sticky md:top-0 self-start
            ${isFilterOpen ? 'block' : 'hidden md:block'}
        `}>
            
            {/* Search */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Search</h3>
                <div className="relative">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search courses..." 
                        className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/70"
                    />
                    <img src={assets.search_icon} alt="" className="absolute left-3 top-2.5 w-4 h-4 opacity-40 dark:invert" />
                </div>
            </div>

            {/* Categories */}
            <div className='mb-8'>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Categories</h3>
                <div className="flex flex-col gap-1 max-h-48 overflow-y-auto scrollbar-thin pr-2">
                    {categories.map((cat) => (
                        <button 
                            key={cat.name}
                            onClick={() => handleCategoryChange(cat.name)}
                            className={`text-left px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center justify-between
                                ${selectedCategory === cat.name 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'text-foreground/80 hover:bg-muted'
                                }`}
                        >
                            {cat.name}
                            {selectedCategory === cat.name && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Price</h3>
                <div className='flex flex-col gap-2'>
                    {['all', 'free', 'paid'].map((price) => (
                        <label key={price} className="flex items-center gap-2 cursor-pointer text-sm text-foreground/80 hover:text-foreground">
                            <input 
                                type="radio" 
                                name="price" 
                                value={price} 
                                checked={selectedPrice === price}
                                onChange={() => setSelectedPrice(price)}
                                className="accent-primary"
                            />
                            <span className="capitalize">{price === 'all' ? 'All Prices' : price}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Rating</h3>
                <div className='flex flex-col gap-2'>
                    {[4, 3, 0].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer text-sm text-foreground/80 hover:text-foreground">
                            <input 
                                type="radio" 
                                name="rating" 
                                value={rating} 
                                checked={minRating === rating}
                                onChange={() => setMinRating(rating)}
                                className="accent-primary"
                            />
                            {rating === 0 ? <span>All Ratings</span> : (
                                <span className='flex items-center gap-1'>
                                    {rating} <img src={assets.star} className='w-3 h-3' /> & up
                                </span>
                            )}
                        </label>
                    ))}
                </div>
            </div>

            {/* Reset Button */}
            <button 
                onClick={clearFilters}
                className="w-full py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-all text-sm font-bold"
            >
                Reset Filters
            </button>
        </div>

        {/* --- Right Content (Grid) --- */}
        <div className="flex-1 px-8 md:px-12 py-8 bg-brand-cream/20 dark:bg-background">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground font-outfit">
                        {selectedCategory === 'All' ? 'All Courses' : `${selectedCategory} Courses`}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Showing <span className="font-bold text-foreground">{filteredCourses.length}</span> results
                    </p>
                </div>

                {/* Sort Dropdown */}
                <div className='flex items-center gap-2'>
                    <span className='text-sm text-muted-foreground hidden md:block'>Sort by:</span>
                    <select 
                        value={sortOption} 
                        onChange={(e) => setSortOption(e.target.value)}
                        className='bg-card border border-border text-foreground text-sm rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary cursor-pointer'
                    >
                        <option value="relevant">Relevance</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </div>

            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {filteredCourses.map((course, index) => (
                        <CourseCard key={index} course={course} index={index} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                        <img src={assets.search_icon} alt="" className="w-10 h-10 opacity-20 dark:invert" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">No courses match your filters</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                        Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <button 
                        onClick={clearFilters}
                        className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors shadow-lg"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CoursesList;