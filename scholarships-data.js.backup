// Scholarships Data Management
class ScholarshipsManager {
    constructor() {
        this.scholarships = [];
        this.filteredScholarships = [];
        this.currentCategory = 'all';
        this.filters = {
            search: '',
            academicLevel: '',
            beneficiaryType: '',
            coverage: '',
            deadline: ''
        };
        
        console.log('ScholarshipsManager constructor called');
        this.init();
    }
    
    async init() {
        console.log('Starting initialization...');
        try {
            // Start with sample data immediately
            this.scholarships = this.getSampleData();
            this.filteredScholarships = [...this.scholarships];
            console.log('Sample data loaded:', this.scholarships.length);
            
            // Try to load CSV in background
            this.loadScholarshipsInBackground();
            
            this.setupEventListeners();
            this.updateCounts();
            this.renderScholarships();
            this.addStateFilter();
            this.renderStateScholarships();
            
            console.log('Initialization complete');
        } catch (error) {
            console.error('Error in init:', error);
            this.showErrorMessage();
        }
    }
    
    async loadScholarshipsInBackground() {
        try {
            console.log('Attempting to load both CSV files in background...');
            
            // Load main scholarships CSV
            const mainResponse = await fetch('Scholarships_in_India__Master_v1_.csv');
            if (!mainResponse.ok) {
                throw new Error(`Main CSV HTTP error! status: ${mainResponse.status}`);
            }
            const mainCsvText = await mainResponse.text();
            console.log('Main CSV loaded successfully, length:', mainCsvText.length);
            
            // Load additional scholarships CSV
            const additionalResponse = await fetch('Added Scholarshpis.csv');
            if (!additionalResponse.ok) {
                throw new Error(`Additional CSV HTTP error! status: ${additionalResponse.status}`);
            }
            const additionalCsvText = await additionalResponse.text();
            console.log('Additional CSV loaded successfully, length:', additionalCsvText.length);
            
            // Parse both CSVs
            const mainScholarships = this.parseCSV(mainCsvText);
            const additionalScholarships = this.parseCSV(additionalCsvText);
            
            // Combine all scholarships
            this.scholarships = [...mainScholarships, ...additionalScholarships];
            this.filteredScholarships = [...this.scholarships];
            
            console.log('Combined data loaded:', this.scholarships.length);
            console.log('Main CSV scholarships:', mainScholarships.length);
            console.log('Additional CSV scholarships:', additionalScholarships.length);
            
            // Update the display with new data
            this.updateCounts();
            this.renderScholarships();
            
        } catch (error) {
            console.error('Background CSV loading failed:', error);
            // Keep using sample data
        }
    }
    
    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const scholarships = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = this.parseCSVLine(lines[i]);
                if (values.length === headers.length) {
                    const scholarship = {};
                    headers.forEach((header, index) => {
                        scholarship[header] = values[index];
                    });
                    scholarships.push(scholarship);
                }
            }
        }
        
        return scholarships;
    }
    
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    }
    
    getSampleData() {
        // Fallback sample data if CSV loading fails
        return [
            {
                Scholarship_Name: "Central Sector Scheme of Scholarships",
                Sponsoring_Entity: "Department of Higher Education, Ministry of Education, GoI",
                Category: "Government - Central",
                Coverage: "India",
                Academic_Level: "UG / PG / Integrated",
                Target_Beneficiaries: "Merit + Means (top performers in Class 12; income ceiling applies)",
                Key_Benefits: "₹12,000/yr for UG (typically first 3 years) and ₹20,000/yr for PG/4th-5th year of integrated",
                Application_Window: "Usually Aug–Nov via NSP",
                Typical_Deadline_2025: "31-Oct-2025",
                Official_Application_URL: "https://scholarships.gov.in/",
                Official_Info_Source_URL: "https://www.education.gov.in/en/scholarships-education",
                Notes: "Benefits may vary slightly by latest circular; verify on NSP."
            },
            {
                Scholarship_Name: "PM Scholarship for Central Armed Police Forces",
                Sponsoring_Entity: "Ministry of Home Affairs, GoI",
                Category: "Government - Central",
                Coverage: "India",
                Academic_Level: "UG / PG",
                Target_Beneficiaries: "Children of Central Armed Police Forces personnel",
                Key_Benefits: "₹3,000/month for UG, ₹5,000/month for PG",
                Application_Window: "Usually Sep–Dec",
                Typical_Deadline_2025: "15-Dec-2025",
                Official_Application_URL: "https://www.mha.gov.in/",
                Official_Info_Source_URL: "https://www.mha.gov.in/",
                Notes: "For children of CAPF personnel who died in action or were disabled."
            },
            {
                Scholarship_Name: "Tata Trusts Scholarship",
                Sponsoring_Entity: "Tata Trusts",
                Category: "Foundation",
                Coverage: "India",
                Academic_Level: "UG / PG",
                Target_Beneficiaries: "Merit-based for economically disadvantaged students",
                Key_Benefits: "Up to ₹2,00,000/year for engineering and medical students",
                Application_Window: "Usually Apr–Jun",
                Typical_Deadline_2025: "30-Jun-2025",
                Official_Application_URL: "https://www.tatatrusts.org/",
                Official_Info_Source_URL: "https://www.tatatrusts.org/",
                Notes: "Merit-based scholarships for engineering and medical students."
            },
            {
                Scholarship_Name: "Mahindra All India Talent Scholarship",
                Sponsoring_Entity: "Mahindra Foundation",
                Category: "Foundation",
                Coverage: "India",
                Academic_Level: "UG",
                Target_Beneficiaries: "Students from low-income families pursuing technical education",
                Key_Benefits: "Up to ₹1,00,000/year",
                Application_Window: "Usually May–Jul",
                Typical_Deadline_2025: "31-Jul-2025",
                Official_Application_URL: "https://www.mahindra.com/",
                Official_Info_Source_URL: "https://www.mahindra.com/",
                Notes: "For students pursuing technical education from low-income families."
            },
            {
                Scholarship_Name: "Ashoka University Merit Scholarship",
                Sponsoring_Entity: "Ashoka University",
                Category: "University",
                Coverage: "India",
                Academic_Level: "UG",
                Target_Beneficiaries: "Merit-based for outstanding students",
                Key_Benefits: "Up to 100% tuition waiver",
                Application_Window: "Usually Feb–Apr",
                Typical_Deadline_2025: "15-Apr-2025",
                Official_Application_URL: "https://www.ashoka.edu.in/",
                Official_Info_Source_URL: "https://www.ashoka.edu.in/",
                Notes: "Merit-based scholarships for outstanding students at Ashoka University."
            },
            {
                Scholarship_Name: "AICTE SWANATH Scholarship Scheme",
                Sponsoring_Entity: "AICTE, Ministry of Education, GoI",
                Category: "Government - Central",
                Coverage: "India",
                Academic_Level: "Diploma, UG (Technical)",
                Target_Beneficiaries: "Wards of Armed Forces/CAPF martyred; COVID-affected; orphan students",
                Key_Benefits: "₹50,000 per annum (lump sum)",
                Application_Window: "Usually Aug–Oct",
                Typical_Deadline_2025: "31-Oct-2025",
                Official_Application_URL: "https://fellowship.aicte.gov.in/Scheme%20Guidelines",
                Official_Info_Source_URL: "https://scholarships.gov.in/public/schemeGuidelines/AICTE/AICTE_3038_G.pdf",
                Notes: "2000 scholarships annually (1000 degree + 1000 diploma)."
            },
            {
                Scholarship_Name: "UGC PG Merit Scholarship for University Rank Holders",
                Sponsoring_Entity: "University Grants Commission (UGC)",
                Category: "Government - Central",
                Coverage: "India",
                Academic_Level: "PG",
                Target_Beneficiaries: "UG First/Second rank holders (General/Honours) admitted to PG programs",
                Key_Benefits: "₹3,100 per month for 2 years",
                Application_Window: "Usually Aug–Nov",
                Typical_Deadline_2025: "30-Nov-2025",
                Official_Application_URL: "https://scholarships.gov.in/public/schemeGuidelines/GuidelinesUGCUniversityRankHolder1819.pdf",
                Official_Info_Source_URL: "https://www.ugc.gov.in/oldpdf/xplanpdf/ig_pgm_guideline.pdf",
                Notes: "Renewable in 2nd year subject to performance."
            },
            {
                Scholarship_Name: "Post-Matric Scholarship for Minorities (PMS-M)",
                Sponsoring_Entity: "Ministry of Minority Affairs, GoI",
                Category: "Government - Central",
                Coverage: "India",
                Academic_Level: "Class 11–PhD (Post-Matric)",
                Target_Beneficiaries: "Students from notified minority communities",
                Key_Benefits: "Admission/tuition fee + maintenance allowance (as per norms)",
                Application_Window: "Varies by cycle; typically Aug–Nov",
                Typical_Deadline_2025: "30-Nov-2025",
                Official_Application_URL: "https://scholarships.gov.in/All-Scholarships",
                Official_Info_Source_URL: "https://www.minorityaffairs.gov.in/show_content.php?lang=1&level=2&lid=165&ls_id=163",
                Notes: "Apply via NSP; institute verification mandatory."
            },
            {
                Scholarship_Name: "K. C. Mahindra Scholarships for Post-Graduate Studies Abroad",
                Sponsoring_Entity: "K. C. Mahindra Education Trust",
                Category: "Foundation/Trust",
                Coverage: "Abroad",
                Academic_Level: "PG (Masters), PhD",
                Target_Beneficiaries: "Indian graduates with admission to reputed foreign universities",
                Key_Benefits: "Interest-free loan scholarship up to ₹10 lakh (with top-ups)",
                Application_Window: "Typically Jan–Mar",
                Typical_Deadline_2025: "15-Mar-2025",
                Official_Application_URL: "https://www.kcmet.org/what-we-do-scholarship-grants.aspx",
                Official_Info_Source_URL: "https://www.mahindra.com/news-room/press-release/kcmet-post-grad-overseas-scholarship-2024",
                Notes: "Selection includes aptitude test/interview; awards vary by merit."
            },
            {
                Scholarship_Name: "Inlaks Shivdasani Scholarships",
                Sponsoring_Entity: "Inlaks Shivdasani Foundation",
                Category: "Foundation/Trust",
                Coverage: "Abroad (select universities & fields)",
                Academic_Level: "PG (primarily Masters)",
                Target_Beneficiaries: "Outstanding Indian students (age limits apply)",
                Key_Benefits: "Up to USD 100,000; tuition + living + travel + health allowance",
                Application_Window: "Typically Jan–Mar",
                Typical_Deadline_2025: "31-Mar-2025",
                Official_Application_URL: "https://inlaksfoundation.org/opportunities/scholarship/",
                Official_Info_Source_URL: "https://inlaksfoundation.org/",
                Notes: "Certain subjects/institutions excluded; separate art/design awards exist."
            },
            {
                Scholarship_Name: "Dr. Ambedkar Post-Matric Scholarship",
                Sponsoring_Entity: "Ministry of Social Justice & Empowerment, GoI",
                Category: "Government - Central",
                Coverage: "India",
                Academic_Level: "Class 11–PhD",
                Target_Beneficiaries: "SC students from low-income families",
                Key_Benefits: "Full tuition + maintenance allowance + other expenses",
                Application_Window: "Aug–Nov via NSP",
                Typical_Deadline_2025: "31-Oct-2025",
                Official_Application_URL: "https://scholarships.gov.in/",
                Official_Info_Source_URL: "https://socialjustice.gov.in/schemes/28",
                Notes: "Apply via National Scholarship Portal (NSP)."
            },
            {
                Scholarship_Name: "Merit-cum-Means Scholarship for Professional and Technical Courses",
                Sponsoring_Entity: "Ministry of Minority Affairs, GoI",
                Category: "Government - Central",
                Coverage: "India",
                Academic_Level: "UG/PG (Professional)",
                Target_Beneficiaries: "Merit-cum-means students from minority communities",
                Key_Benefits: "Up to ₹20,000/year for tuition + ₹1,000/month maintenance",
                Application_Window: "Aug–Nov via NSP",
                Typical_Deadline_2025: "30-Nov-2025",
                Official_Application_URL: "https://scholarships.gov.in/",
                Official_Info_Source_URL: "https://www.minorityaffairs.gov.in/",
                Notes: "Apply via NSP; institute verification required."
            },
            {
                Scholarship_Name: "PM-KISAN Scholarship",
                Sponsoring_Entity: "Ministry of Agriculture & Farmers Welfare, GoI",
                Category: "Government - Central",
                Coverage: "India",
                Academic_Level: "UG/PG (Agriculture & Allied)",
                Target_Beneficiaries: "Children of PM-KISAN beneficiary farmers",
                Key_Benefits: "₹50,000/year for UG, ₹75,000/year for PG",
                Application_Window: "Usually Jun–Aug",
                Typical_Deadline_2025: "31-Aug-2025",
                Official_Application_URL: "https://pmkisan.gov.in/",
                Official_Info_Source_URL: "https://pmkisan.gov.in/",
                Notes: "For children of farmers registered under PM-KISAN scheme."
            },
            {
                Scholarship_Name: "Fulbright-Nehru Master's Fellowships",
                Sponsoring_Entity: "USIEF / U.S. Department of State",
                Category: "International (Fully-funded)",
                Coverage: "USA",
                Academic_Level: "Master's",
                Target_Beneficiaries: "Indian citizens with relevant experience & leadership potential",
                Key_Benefits: "Tuition, living, airfare, visa, health insurance",
                Application_Window: "Dec–May (for next AY)",
                Typical_Deadline_2025: "14-May-2025",
                Official_Application_URL: "https://www.usief.org.in/fulbright-fellowships/",
                Official_Info_Source_URL: "https://www.usief.org.in/",
                Notes: "Field restrictions apply; return to India required."
            },
            {
                Scholarship_Name: "Chevening Scholarships (India)",
                Sponsoring_Entity: "UK FCDO (Chevening)",
                Category: "International (Fully-funded)",
                Coverage: "UK",
                Academic_Level: "Master's (1-year)",
                Target_Beneficiaries: "Indian citizens with ≥2 years work experience",
                Key_Benefits: "Fees + living + flights + visa; £10k+ fee coverage",
                Application_Window: "Aug–Oct",
                Typical_Deadline_2025: "07-Oct-2025",
                Official_Application_URL: "https://www.chevening.org/scholarship/india/",
                Official_Info_Source_URL: "https://www.gov.uk/government/news/",
                Notes: "Return to India intent required; leadership essays crucial."
            }
        ];
    }
    
    // Add state-specific scholarship data from the map
    getStateScholarships() {
        return {
            'maharashtra': [
                { name: 'Maharashtra SC Post-Matric Scholarship', amount: '₹15,000/year', category: 'State Government', beneficiaries: 'SC students' },
                { name: 'Rajarshi Shahu SC Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'SC students' },
                { name: 'Dr. Panjabrao Deshmukh OBC Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'OBC students' },
                { name: 'Maharashtra Minority Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'Minority students' }
            ],
            'karnataka': [
                { name: 'Karnataka SC/ST Post-Matric Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Karnataka OBC Merit Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' },
                { name: 'Karnataka Minority Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'Minority students' }
            ],
            'tamil-nadu': [
                { name: 'TN SC/ST Post-Matric Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'TN First Graduate Scheme', amount: 'Fee Waiver', category: 'State Government', beneficiaries: 'First generation graduates' },
                { name: 'TN Minority Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'Minority students' },
                { name: 'TN OBC Scholarship', amount: '₹9,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'uttar-pradesh': [
                { name: 'UP SC/ST Post-Matric Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'UP OBC Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' },
                { name: 'UP Minority Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'Minority students' }
            ],
            'west-bengal': [
                { name: 'WB Swami Vivekananda Merit Cum Means Scholarship', amount: 'Varies', category: 'State Government', beneficiaries: 'Merit + Means students' },
                { name: 'WB Kanyashree Prakalpa (Girls)', amount: '₹1,000-₹25,000', category: 'State Government', beneficiaries: 'Girl students' },
                { name: 'WB Aikyashree Minority Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'Minority students' }
            ],
            'gujarat': [
                { name: 'Gujarat SC/ST Scholarship', amount: '₹15,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Gujarat OBC Merit Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'delhi': [
                { name: 'Delhi SC/ST Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Delhi Minority Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'Minority students' },
                { name: 'Delhi OBC Merit Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'rajasthan': [
                { name: 'Rajasthan SC/ST Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Rajasthan OBC Merit Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'bihar': [
                { name: 'Bihar SC/ST Post-Matric Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Bihar OBC Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'odisha': [
                { name: 'Odisha SC/ST Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Odisha OBC Merit Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'telangana': [
                { name: 'Telangana SC/ST Scholarship', amount: '₹15,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Telangana OBC Merit Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'andhra-pradesh': [
                { name: 'AP SC/ST Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'AP OBC Merit Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'kerala': [
                { name: 'Kerala SC/ST Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Kerala Minority Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'Minority students' }
            ],
            'goa': [
                { name: 'Goa SC/ST Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Goa OBC Merit Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'uttarakhand': [
                { name: 'Uttarakhand SC/ST Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Uttarakhand OBC Merit Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'jammu-kashmir': [
                { name: 'J&K SC/ST Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'J&K Minority Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'Minority students' }
            ],
            'himachal-pradesh': [
                { name: 'HP SC/ST Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'HP OBC Merit Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'punjab': [
                { name: 'Punjab SC/ST Scholarship', amount: '₹15,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Punjab OBC Merit Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'haryana': [
                { name: 'Haryana SC/ST Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Haryana OBC Merit Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'madhya-pradesh': [
                { name: 'MP SC/ST Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'MP OBC Merit Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'chhattisgarh': [
                { name: 'CG SC/ST Scholarship', amount: '₹10,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'CG OBC Merit Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ],
            'jharkhand': [
                { name: 'Jharkhand SC/ST Scholarship', amount: '₹12,000/year', category: 'State Government', beneficiaries: 'SC/ST students' },
                { name: 'Jharkhand OBC Merit Scholarship', amount: '₹8,000/year', category: 'State Government', beneficiaries: 'OBC students' }
            ]
        };
    }
    
    // Add state filter functionality
    addStateFilter() {
        const stateScholarships = this.getStateScholarships();
        const stateFilter = document.getElementById('coverage');
        
        if (stateFilter) {
            // Add state-specific scholarships to the filter
            Object.keys(stateScholarships).forEach(state => {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = this.getStateDisplayName(state);
                stateFilter.appendChild(option);
            });
        }
    }
    
    getStateDisplayName(stateCode) {
        const stateNames = {
            'maharashtra': 'Maharashtra',
            'karnataka': 'Karnataka',
            'tamil-nadu': 'Tamil Nadu',
            'uttar-pradesh': 'Uttar Pradesh',
            'west-bengal': 'West Bengal',
            'gujarat': 'Gujarat',
            'delhi': 'Delhi',
            'rajasthan': 'Rajasthan',
            'bihar': 'Bihar',
            'odisha': 'Odisha',
            'telangana': 'Telangana',
            'andhra-pradesh': 'Andhra Pradesh',
            'kerala': 'Kerala',
            'goa': 'Goa',
            'uttarakhand': 'Uttarakhand',
            'jammu-kashmir': 'Jammu & Kashmir',
            'himachal-pradesh': 'Himachal Pradesh',
            'punjab': 'Punjab',
            'haryana': 'Haryana',
            'madhya-pradesh': 'Madhya Pradesh',
            'chhattisgarh': 'Chhattisgarh',
            'jharkhand': 'Jharkhand'
        };
        return stateNames[stateCode] || stateCode;
    }
    
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterScholarships());
        }
        
        // Filter functionality
        const filterSelects = document.querySelectorAll('.filter-select');
        filterSelects.forEach(select => {
            select.addEventListener('change', () => this.filterScholarships());
        });
        
        // Tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterScholarships();
            });
        });
    }
    
    filterScholarships() {
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const academicLevel = document.getElementById('academicLevel')?.value || '';
        const beneficiaryType = document.getElementById('beneficiaryType')?.value || '';
        const coverage = document.getElementById('coverage')?.value || '';
        const deadline = document.getElementById('deadline')?.value || '';
        
        console.log('Filtering with:', { searchTerm, academicLevel, beneficiaryType, coverage, deadline });
        
        // Get all scholarships (main + state)
        const allScholarships = this.getAllScholarships();
        console.log('Total scholarships before filtering:', allScholarships.length);
        console.log('Main scholarships:', allScholarships.filter(sch => !sch.isStateScholarship).length);
        console.log('State scholarships:', allScholarships.filter(sch => sch.isStateScholarship).length);
        
        // Apply filters
        this.filteredScholarships = allScholarships.filter(scholarship => {
            let showScholarship = true;
            
            // Search term filter
            if (searchTerm) {
                const searchableText = `${scholarship.Scholarship_Name || scholarship.name} ${scholarship.Target_Beneficiaries || ''} ${scholarship.Category || scholarship.category}`.toLowerCase();
                if (!searchableText.includes(searchTerm)) {
                    showScholarship = false;
                }
            }
            
            // Academic level filter
            if (academicLevel && scholarship.Academic_Level) {
                if (!scholarship.Academic_Level.toLowerCase().includes(academicLevel.toLowerCase())) {
                    showScholarship = false;
                }
            }
            
            // Beneficiary type filter
            if (beneficiaryType && scholarship.Target_Beneficiaries) {
                const beneficiaries = scholarship.Target_Beneficiaries.toLowerCase();
                console.log(`Checking ${scholarship.Scholarship_Name || scholarship.name}:`, beneficiaries, 'against', beneficiaryType);
                
                if (beneficiaryType === 'SC' && !beneficiaries.includes('sc') && !beneficiaries.includes('scheduled caste')) {
                    showScholarship = false;
                } else if (beneficiaryType === 'ST' && !beneficiaries.includes('st') && !beneficiaries.includes('scheduled tribe')) {
                    showScholarship = false;
                } else if (beneficiaryType === 'OBC' && !beneficiaries.includes('obc') && !beneficiaries.includes('other backward class')) {
                    showScholarship = false;
                } else if (beneficiaryType === 'Girls' && !beneficiaries.includes('girl') && !beneficiaries.includes('women')) {
                    showScholarship = false;
                } else if (beneficiaryType === 'Merit' && !beneficiaries.includes('merit')) {
                    showScholarship = false;
                } else if (beneficiaryType === 'PwD' && !beneficiaries.includes('disability') && !beneficiaries.includes('pwd')) {
                    showScholarship = false;
                } else if (beneficiaryType === 'Minority' && !beneficiaries.includes('minority')) {
                    showScholarship = false;
                }
            }
            
            // Coverage filter
            if (coverage) {
                const selected = coverage.toLowerCase();
                console.log(`Coverage filter: selected="${selected}", scholarship="${scholarship.Scholarship_Name || scholarship.name}"`);
                console.log(`  - Coverage: "${scholarship.Coverage}"`);
                console.log(`  - StateName: "${scholarship.stateName}"`);
                console.log(`  - IsStateScholarship: ${scholarship.isStateScholarship}`);
                
                if (selected === 'india') {
                    if ((scholarship.Coverage || '').toLowerCase() !== 'india') {
                        console.log(`  - Filtered out: not India coverage`);
                        showScholarship = false;
                    }
                } else {
                    const schCoverage = (scholarship.Coverage || '').toLowerCase();
                    const schStateName = (scholarship.stateName || '').toLowerCase();
                    if (schCoverage !== selected && schStateName !== selected) {
                        console.log(`  - Filtered out: coverage mismatch (${schCoverage} vs ${selected}, ${schStateName} vs ${selected})`);
                        showScholarship = false;
                    } else {
                        console.log(`  - Passed coverage filter`);
                    }
                }
            }
            
            // Deadline filter
            if (deadline && scholarship.Typical_Deadline_2025) {
                const deadlineDate = this.parseDeadline(scholarship.Typical_Deadline_2025);
                if (deadlineDate) {
                    const today = new Date();
                    const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
                    
                    if (deadline === 'urgent' && daysUntilDeadline > 30) {
                        showScholarship = false;
                    } else if (deadline === 'soon' && (daysUntilDeadline <= 30 || daysUntilDeadline > 90)) {
                        showScholarship = false;
                    } else if (deadline === 'later' && daysUntilDeadline <= 90) {
                        showScholarship = false;
                    }
                }
            }
            
            return showScholarship;
        });
        
        console.log('Filtered scholarships:', this.filteredScholarships.length);
        console.log('Main scholarships after filtering:', this.filteredScholarships.filter(sch => !sch.isStateScholarship).length);
        console.log('State scholarships after filtering:', this.filteredScholarships.filter(sch => sch.isStateScholarship).length);
        
        // Update counts and render
        this.updateCounts();
        this.renderScholarships();
        this.renderStateScholarships();
    }
    
    parseDeadline(deadlineString) {
        if (!deadlineString || deadlineString === 'Rolling/Check Website') return null;
        
        try {
            // Try to parse the deadline string
            const parts = deadlineString.split('-');
            if (parts.length === 3) {
                const day = parseInt(parts[0]);
                const month = parseInt(parts[1]) - 1; // Month is 0-indexed
                const year = parseInt(parts[2]);
                return new Date(year, month, day);
            }
        } catch (error) {
            console.warn('Could not parse deadline:', deadlineString);
        }
        
        return null;
    }
    
    updateCounts() {
        const total = this.scholarships.length;
        
        // Count states covered (from state scholarships)
        const stateScholarships = this.getStateScholarships();
        const statesCovered = Object.keys(stateScholarships).length;
        
        // Calculate total scholarship amount (estimate from sample data and state data)
        let totalAmount = 0;
        
        // Add amounts from main scholarships (estimate based on benefits)
        this.scholarships.forEach(sch => {
            const benefits = sch.Key_Benefits;
            if (benefits.includes('₹')) {
                // Extract numeric values and estimate annual amount
                const matches = benefits.match(/₹([0-9,]+)/g);
                if (matches) {
                    matches.forEach(match => {
                        const amount = parseInt(match.replace(/[₹,]/g, ''));
                        if (!isNaN(amount)) {
                            // If it's per month, multiply by 12; if per year, use as is
                            if (benefits.includes('/month')) {
                                totalAmount += amount * 12;
                            } else if (benefits.includes('/yr') || benefits.includes('/year')) {
                                totalAmount += amount;
                            } else {
                                totalAmount += amount; // Assume annual
                            }
                        }
                    });
                }
            }
        });
        
        // Add amounts from state scholarships
        Object.values(stateScholarships).forEach(stateSchs => {
            stateSchs.forEach(sch => {
                const amount = sch.amount;
                if (amount.includes('₹')) {
                    const matches = amount.match(/₹([0-9,]+)/g);
                    if (matches) {
                        matches.forEach(match => {
                            const num = parseInt(match.replace(/[₹,]/g, ''));
                            if (!isNaN(num)) {
                                if (amount.includes('/year')) {
                                    totalAmount += num;
                                } else if (amount.includes('/month')) {
                                    totalAmount += num * 12;
                                } else {
                                    totalAmount += num; // Assume annual
                                }
                            }
                        });
                    }
                }
            });
        });
        
        // Format total amount in lakhs/crores for readability
        let formattedAmount;
        if (totalAmount >= 10000000) { // 1 crore
            formattedAmount = `₹${(totalAmount / 10000000).toFixed(1)} Cr+`;
        } else if (totalAmount >= 100000) { // 1 lakh
            formattedAmount = `₹${(totalAmount / 100000).toFixed(1)} Lakh+`;
        } else {
            formattedAmount = `₹${totalAmount.toLocaleString()}+`;
        }
        
        // Update display counts with new meaningful statistics
        document.getElementById('totalScholarships').textContent = total;
        document.getElementById('allCount').textContent = total;
        document.getElementById('govtCount').textContent = statesCovered;
        document.getElementById('foundationCount').textContent = total;
        document.getElementById('corporateCount').textContent = formattedAmount;
        
        // Update category tab counts to reflect new meaning
        document.querySelector('[data-category="government"]').innerHTML = `States Covered (${statesCovered})`;
        document.querySelector('[data-category="foundation"]').innerHTML = `Total Scholarships (${total})`;
        document.querySelector('[data-category="corporate"]').innerHTML = `Total Amount (${formattedAmount})`;
    }
    
    renderScholarships() {
        const grid = document.getElementById('scholarshipsGrid');
        if (!grid) return;
        
        if (this.filteredScholarships.length === 0) {
            grid.innerHTML = `
                <div class="no-results" id="noResults">
                    <i class="fas fa-search"></i>
                    <h3>No scholarships found</h3>
                    <p>Try adjusting your search criteria or filters</p>
                </div>
            `;
            return;
        }
        
        // Separate main and state scholarships
        const mainScholarships = this.filteredScholarships.filter(sch => !sch.isStateScholarship);
        const stateScholarships = this.filteredScholarships.filter(sch => sch.isStateScholarship);
        
        let html = '';
        
        // Render main scholarships if any
        if (mainScholarships.length > 0) {
            html += `
                <div class="scholarship-section" id="national-scholarships">
                    <h2 class="section-heading">National & Central Scholarships</h2>
                    <p class="section-subtitle">Government, Foundation, and Corporate scholarships available across India</p>
                    <div class="scholarships-grid">
                        ${mainScholarships.map(scholarship => this.createScholarshipCard(scholarship)).join('')}
                    </div>
                </div>
            `;
        }
        
        // Render state scholarships if any
        if (stateScholarships.length > 0) {
            // Group state scholarships by state
            const stateGroups = {};
            stateScholarships.forEach(sch => {
                if (!stateGroups[sch.stateName]) {
                    stateGroups[sch.stateName] = [];
                }
                stateGroups[sch.stateName].push(sch);
            });
            
            html += `
                <div class="scholarship-section">
                    <h2 class="section-heading">State-Specific Scholarships</h2>
                    <p class="section-subtitle">Scholarships available in specific states based on your filters</p>
                    <div class="filtered-state-scholarships">
                        ${Object.keys(stateGroups).map(stateName => `
                            <div class="state-group">
                                <h3 class="state-heading">${stateName}</h3>
                                <div class="state-scholarships-list">
                                    ${stateGroups[stateName].map(sch => `
                                        <div class="filtered-state-scholarship-item">
                                            <div class="scholarship-info">
                                                <h4>${sch.unifiedName || 'Scholarship'}</h4>
                                                <p class="amount">${sch.unifiedAmount || 'Varies'}</p>
                                                <span class="category">${sch.unifiedCategory || 'State Government'}</span>
                                                <p class="beneficiaries">${sch.unifiedBeneficiaries || 'State residents'}</p>
                                            </div>
                                            <div class="scholarship-actions">
                                                <button class="btn btn-primary btn-sm" onclick="window.open('https://scholarships.gov.in/', '_blank')">
                                                    Apply Now
                                                </button>
                                                <button class="btn btn-outline btn-sm" onclick="showScholarshipDetails('${sch.state || sch.stateName}', ${stateGroups[stateName].indexOf(sch)})">
                                                    Learn More
                                                </button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        grid.innerHTML = html;
    }
    
    renderStateScholarships() {
        const grid = document.getElementById('stateScholarshipsGrid');
        if (!grid) return;
        
        const stateScholarships = this.getStateScholarships();
        
        grid.innerHTML = Object.keys(stateScholarships).map(stateCode => {
            const scholarships = stateScholarships[stateCode];
            const stateName = this.getStateDisplayName(stateCode);
            
            return `
                <div class="state-scholarship-card" data-state="${stateCode}">
                    <div class="state-scholarship-header">
                        <h3>${stateName}</h3>
                    </div>
                    
                    <div class="state-scholarship-list">
                        ${scholarships.map((sch, index) => `
                            <div class="state-scholarship-item" data-state="${stateCode}" data-index="${index}">
                                <div class="scholarship-info">
                                    <h4 class="scholarship-name">${sch.name}</h4>
                                    <p class="scholarship-amount">${sch.amount}</p>
                                    <span class="scholarship-category">${sch.category}</span>
                                </div>
                                <div class="scholarship-actions">
                                    <button class="btn btn-primary btn-sm apply-btn" onclick="window.open('https://scholarships.gov.in/', '_blank')">
                                        Apply Now
                                    </button>
                                    <button class="btn btn-outline btn-sm learn-more-btn" onclick="showScholarshipDetails('${stateCode}', ${index})">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="state-scholarship-footer">
                        <button class="btn btn-outline btn-sm view-all-btn" onclick="viewAllStateScholarships('${stateCode}')">
                            View All Scholarships
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        // Add hover effects and interactions
        this.addStateScholarshipInteractions();
    }
    
    addStateScholarshipInteractions() {
        const stateCards = document.querySelectorAll('.state-scholarship-card');
        
        stateCards.forEach(card => {
            // Hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            });
            
            // Individual scholarship item hover effects
            const scholarshipItems = card.querySelectorAll('.state-scholarship-item');
            scholarshipItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.style.backgroundColor = '#f8f9fa';
                    item.style.borderLeft = '4px solid #2c5aa0';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.backgroundColor = 'transparent';
                    item.style.borderLeft = '4px solid transparent';
                });
            });
        });
    }
    
    // Helper functions for interactive features
    showScholarshipDetails(stateCode, index) {
        const stateScholarships = this.getStateScholarships();
        const scholarship = stateScholarships[stateCode][index];
        const stateName = this.getStateDisplayName(stateCode);
        
        // Create a modal or expand the scholarship item to show details
        const modal = document.createElement('div');
        modal.className = 'scholarship-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${scholarship.name}</h3>
                    <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="scholarship-detail">
                        <strong>State:</strong> ${stateName}
                    </div>
                    <div class="scholarship-detail">
                        <strong>Category:</strong> ${scholarship.category}
                    </div>
                    <div class="scholarship-detail">
                        <strong>Amount:</strong> ${scholarship.amount}
                    </div>
                    <div class="scholarship-detail">
                        <strong>Coverage:</strong> ${stateName}
                    </div>
                    <div class="scholarship-detail">
                        <strong>Application:</strong> Apply through state scholarship portal or NSP
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="window.open('https://scholarships.gov.in/', '_blank')">
                        Apply Now
                    </button>
                    <button class="btn btn-outline" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(modal);
    }
    
    viewAllStateScholarships(stateCode) {
        const stateScholarships = this.getStateScholarships();
        const scholarships = stateScholarships[stateCode];
        const stateName = this.getStateDisplayName(stateCode);
        
        // Create a comprehensive view of all scholarships for the state
        const modal = document.createElement('div');
        modal.className = 'state-scholarships-modal';
        modal.innerHTML = `
            <div class="modal-content large">
                <div class="modal-header">
                    <h3>All Scholarships in ${stateName}</h3>
                    <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="state-scholarships-grid">
                        ${scholarships.map((sch, index) => `
                            <div class="state-scholarship-detail-card">
                                <h4>${sch.name}</h4>
                                <p class="amount">${sch.amount}</p>
                                <p class="category">${sch.category}</p>
                                <div class="actions">
                                    <button class="btn btn-primary btn-sm" onclick="window.open('https://scholarships.gov.in/', '_blank')">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(modal);
    }
    
    createScholarshipCard(scholarship) {
        const category = this.getCategoryClass(scholarship.Category);
        const deadline = this.parseDeadline(scholarship.Typical_Deadline_2025);
        const deadlineClass = this.getDeadlineClass(deadline);
        const deadlineText = this.formatDeadline(deadline);
        
        return `
            <div class="scholarship-card" data-category="${category}">
                <div class="scholarship-header">
                    <h3>${scholarship.Scholarship_Name}</h3>
                    <span class="scholarship-type ${category}">${this.getCategoryLabel(scholarship.Category)}</span>
                </div>
                <p>${scholarship.Target_Beneficiaries}</p>
                <div class="scholarship-details">
                    <span><i class="fas fa-rupee-sign"></i> ${scholarship.Key_Benefits}</span>
                    <span class="${deadlineClass}"><i class="fas fa-calendar"></i> ${deadlineText}</span>
                </div>
                <div class="scholarship-tags">
                    ${this.generateTags(scholarship)}
                </div>
                <div class="scholarship-actions">
                    <a href="${scholarship.Official_Application_URL}" target="_blank" class="btn btn-primary">Apply Now</a>
                    <a href="${scholarship.Official_Info_Source_URL}" target="_blank" class="btn btn-outline">Learn More</a>
                </div>
            </div>
        `;
    }
    
    getCategoryClass(category) {
        if (category.includes('Government')) return 'government';
        if (category.includes('Foundation') || category.includes('Trust')) return 'foundation';
        if (category.includes('CSR') || category.includes('Corporate')) return 'corporate';
        return 'other';
    }
    
    getCategoryLabel(category) {
        if (category.includes('Government - Central')) return 'Central Govt';
        if (category.includes('Government - State')) return 'State Govt';
        if (category.includes('Foundation')) return 'Foundation';
        if (category.includes('Trust')) return 'Trust';
        if (category.includes('CSR')) return 'CSR';
        if (category.includes('Corporate')) return 'Corporate';
        return category;
    }
    
    getDeadlineClass(deadline) {
        if (!deadline) return '';
        
        const today = new Date();
        const daysUntilDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDeadline <= 30) return 'deadline-urgent';
        if (daysUntilDeadline <= 90) return 'deadline-soon';
        return 'deadline-later';
    }
    
    formatDeadline(deadline) {
        if (!deadline) return 'Rolling/Check Website';
        
        const today = new Date();
        const daysUntilDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDeadline < 0) return 'Deadline Passed';
        if (daysUntilDeadline === 0) return 'Deadline Today!';
        if (daysUntilDeadline === 1) return 'Deadline Tomorrow!';
        if (daysUntilDeadline <= 7) return `${daysUntilDeadline} days left!`;
        if (daysUntilDeadline <= 30) return `${daysUntilDeadline} days left`;
        
        return deadline.toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
    }
    
    generateTags(scholarship) {
        const tags = [];
        
        // Academic level tags
        if (scholarship.Academic_Level.includes('UG')) tags.push('<span class="tag">Undergraduate</span>');
        if (scholarship.Academic_Level.includes('PG')) tags.push('<span class="tag">Postgraduate</span>');
        if (scholarship.Academic_Level.includes('PhD')) tags.push('<span class="tag">PhD</span>');
        if (scholarship.Academic_Level.includes('Class 11')) tags.push('<span class="tag">Class 11</span>');
        if (scholarship.Academic_Level.includes('Class 12')) tags.push('<span class="tag">Class 12</span>');
        
        // Beneficiary tags
        if (scholarship.Target_Beneficiaries.includes('SC')) tags.push('<span class="tag">SC</span>');
        if (scholarship.Target_Beneficiaries.includes('ST')) tags.push('<span class="tag">ST</span>');
        if (scholarship.Target_Beneficiaries.includes('OBC')) tags.push('<span class="tag">OBC</span>');
        if (scholarship.Target_Beneficiaries.includes('Girl')) tags.push('<span class="tag">Girls</span>');
        if (scholarship.Target_Beneficiaries.includes('Merit')) tags.push('<span class="tag">Merit-based</span>');
        if (scholarship.Target_Beneficiaries.includes('disability') || scholarship.Target_Beneficiaries.includes('PwD')) {
            tags.push('<span class="tag">PwD</span>');
        }
        if (scholarship.Target_Beneficiaries.includes('Minority')) tags.push('<span class="tag">Minority</span>');
        
        // Coverage tags
        if (scholarship.Coverage !== 'India') {
            tags.push(`<span class="tag">${scholarship.Coverage}</span>`);
        }
        
        return tags.join('');
    }

    showErrorMessage() {
        const grid = document.getElementById('scholarshipsGrid');
        if (grid) {
            grid.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Unable to load scholarships</h3>
                    <p>Please check your internet connection or try refreshing the page.</p>
                    <p>Showing sample data instead.</p>
                </div>
            `;
        }
    }

    getAllScholarships() {
        const allScholarships = [];
        
        // Add main scholarships
        this.scholarships.forEach(sch => {
            const isStateCoverage = this.isSpecificStateCoverage(sch.Coverage);
            const stateNameForMain = isStateCoverage ? sch.Coverage : undefined;
            
            const unified = {
                unifiedName: sch.Scholarship_Name || sch.name || '',
                unifiedAmount: sch.Key_Benefits || sch.amount || '',
                unifiedCategory: sch.Category || sch.category || '',
                unifiedBeneficiaries: sch.Target_Beneficiaries || sch.beneficiaries || ''
            };
            
            allScholarships.push({
                ...sch,
                ...unified,
                source: 'main',
                isStateScholarship: isStateCoverage,
                stateName: stateNameForMain
            });
        });
        
        // Add state scholarships
        const stateScholarships = this.getStateScholarships();
        Object.keys(stateScholarships).forEach(stateCode => {
            const stateName = this.getStateDisplayName(stateCode);
            stateScholarships[stateCode].forEach(sch => {
                const mapped = {
                    ...sch,
                    source: 'state',
                    state: stateCode,
                    stateName: stateName,
                    isStateScholarship: true,
                    // Map state scholarship fields to main scholarship format for filtering
                    Scholarship_Name: sch.name,
                    Target_Beneficiaries: this.getStateScholarshipBeneficiaries(sch),
                    Category: sch.category,
                    Coverage: stateName,
                    Academic_Level: 'UG/PG (State-specific)',
                    Key_Benefits: sch.amount,
                    Typical_Deadline_2025: 'Varies by state'
                };
                const unified = {
                    unifiedName: mapped.Scholarship_Name,
                    unifiedAmount: mapped.Key_Benefits,
                    unifiedCategory: mapped.Category,
                    unifiedBeneficiaries: mapped.Target_Beneficiaries
                };
                allScholarships.push({
                    ...mapped,
                    ...unified
                });
            });
        });
        
        return allScholarships;
    }
    
    isSpecificStateCoverage(coverage) {
        if (!coverage) return false;
        const normalized = String(coverage).trim().toLowerCase();
        const indiaSynonyms = ['india', 'pan india', 'all india', 'nationwide', 'across india'];
        if (indiaSynonyms.includes(normalized)) return false;
        
        // Build a set of known state display names
        const stateScholarships = this.getStateScholarships();
        const knownStates = new Set(Object.keys(stateScholarships).map(code => this.getStateDisplayName(code).toLowerCase()));
        
        // Also check if it matches any state name directly
        return knownStates.has(normalized);
    }
    
    getStateScholarshipBeneficiaries(scholarship) {
        // Use the explicit beneficiaries field if available
        if (scholarship.beneficiaries) {
            return scholarship.beneficiaries;
        }
        
        // Fallback to parsing name if beneficiaries field is not available
        const name = scholarship.name.toLowerCase();
        const beneficiaries = [];
        
        if (name.includes('sc') || name.includes('scheduled caste')) {
            beneficiaries.push('SC students');
        }
        if (name.includes('st') || name.includes('scheduled tribe')) {
            beneficiaries.push('ST students');
        }
        if (name.includes('obc') || name.includes('other backward class')) {
            beneficiaries.push('OBC students');
        }
        if (name.includes('minority')) {
            beneficiaries.push('Minority students');
        }
        if (name.includes('girl') || name.includes('women')) {
            beneficiaries.push('Girl students');
        }
        if (name.includes('merit')) {
            beneficiaries.push('Merit-based students');
        }
        if (name.includes('disability') || name.includes('pwd')) {
            beneficiaries.push('Students with disabilities');
        }
        
        // Default to general if no specific type found
        if (beneficiaries.length === 0) {
            beneficiaries.push('State domicile students');
        }
        
        return beneficiaries.join(', ');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing ScholarshipsManager...');
    try {
        window.scholarshipsManager = new ScholarshipsManager();
        console.log('ScholarshipsManager initialized successfully');
    } catch (error) {
        console.error('Failed to initialize ScholarshipsManager:', error);
        // Show error on page
        const grid = document.getElementById('scholarshipsGrid');
        if (grid) {
            grid.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Failed to load scholarships</h3>
                    <p>Error: ${error.message}</p>
                    <p>Please refresh the page or check the console for details.</p>
                </div>
            `;
        }
    }
});

// Make helper functions globally accessible
window.showScholarshipDetails = function(stateCode, index) {
    if (window.scholarshipsManager) {
        window.scholarshipsManager.showScholarshipDetails(stateCode, index);
    }
};

window.viewAllStateScholarships = function(stateCode) {
    if (window.scholarshipsManager) {
        window.scholarshipsManager.viewAllStateScholarships(stateCode);
    }
};

// Add CSS for deadline styling
const style = document.createElement('style');
style.textContent = `
    .deadline-urgent {
        color: #e74c3c !important;
        font-weight: bold;
    }
    
    .deadline-soon {
        color: #f39c12 !important;
        font-weight: bold;
    }
    
    .deadline-later {
        color: #27ae60 !important;
    }
    
    .scholarship-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .scholarship-actions .btn {
        flex: 1;
        text-align: center;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
    
    .loading-message {
        text-align: center;
        padding: 3rem;
        color: #666;
    }
    
    .loading-message i {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #667eea;
    }
    
    .no-results {
        text-align: center;
        padding: 3rem;
        color: #666;
    }
    
    .no-results i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #bdc3c7;
    }
    
    /* State Scholarship Interactive Styles */
    .state-scholarships-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
        margin-top: 40px;
    }
    
    .state-scholarship-card {
        transition: all 0.3s ease;
        cursor: pointer;
        border-radius: 15px;
        overflow: hidden;
        background: white;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        border: 1px solid #e9ecef;
    }
    
    .state-scholarship-header {
        padding: 20px 20px 15px 20px;
        border-bottom: 1px solid #e9ecef;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }
    
    .state-scholarship-header h3 {
        margin: 0;
        color: #2c5aa0;
        font-size: 1.3rem;
        text-align: center;
    }
    
    .state-scholarship-list {
        padding: 20px;
    }
    
    .state-scholarship-item {
        padding: 15px;
        margin: 10px 0;
        border-radius: 10px;
        border-left: 4px solid transparent;
        transition: all 0.3s ease;
        background: #f8f9fa;
        border: 1px solid #e9ecef;
    }
    
    .scholarship-info h4 {
        margin: 0 0 8px 0;
        color: #2c5aa0;
        font-size: 1.1rem;
        line-height: 1.3;
    }
    
    .scholarship-info .scholarship-amount {
        margin: 5px 0;
        font-weight: 600;
        color: #27ae60;
        font-size: 1rem;
    }
    
    .scholarship-info .scholarship-category {
        display: inline-block;
        background: #f0f8ff;
        color: #2c5aa0;
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 0.8rem;
        margin-top: 8px;
        font-weight: 500;
    }
    
    .scholarship-actions {
        display: flex;
        gap: 8px;
        margin-top: 15px;
    }
    
    .btn-sm {
        padding: 8px 16px;
        font-size: 0.85rem;
        border-radius: 6px;
        font-weight: 500;
    }
    
    .state-scholarship-footer {
        padding: 15px 20px;
        border-top: 1px solid #e9ecef;
        background: #f8f9fa;
        text-align: center;
    }
    
    .view-all-btn {
        width: 100%;
        padding: 10px 20px;
        font-weight: 500;
    }
    
    /* Responsive grid adjustments */
    @media (max-width: 1200px) {
        .state-scholarships-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
    }
    
    @media (max-width: 768px) {
        .state-scholarships-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }
        
        .state-scholarship-card {
            margin: 0 10px;
        }
    }
    
    /* Modal Styles */
    .scholarship-modal, .state-scholarships-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
        background: white;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease;
    }
    
    .modal-content.large {
        max-width: 800px;
    }
    
    .modal-header {
        padding: 20px 25px;
        border-bottom: 1px solid #e9ecef;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        margin: 0;
        color: #2c5aa0;
    }
    
    .close-modal {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #666;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .close-modal:hover {
        background: #f8f9fa;
        color: #333;
    }
    
    .modal-body {
        padding: 25px;
    }
    
    .scholarship-detail {
        margin: 15px 0;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 3px solid #2c5aa0;
    }
    
    .state-scholarships-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }
    
    .state-scholarship-detail-card {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        border-left: 4px solid #2c5aa0;
        transition: all 0.3s ease;
    }
    
    .state-scholarship-detail-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    .state-scholarship-detail-card h4 {
        margin: 0 0 10px 0;
        color: #2c5aa0;
        font-size: 1.1rem;
    }
    
    .state-scholarship-detail-card .amount {
        color: #27ae60;
        font-weight: 600;
        margin: 8px 0;
    }
    
    .state-scholarship-detail-card .category {
        color: #666;
        font-size: 0.9rem;
        margin: 8px 0;
    }
    
    .modal-footer {
        padding: 20px 25px;
        border-top: 1px solid #e9ecef;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
    
    /* Animations */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(30px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            margin: 20px;
        }
        
        .state-scholarships-grid {
            grid-template-columns: 1fr;
        }
        
        .scholarship-actions {
            flex-direction: column;
        }
        
        .state-scholarship-footer {
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
        }
    }
    
    /* Unified Filtered View Styles */
    .scholarship-section {
        margin-bottom: 50px;
    }
    
    .section-heading {
        color: #2c5aa0;
        font-size: 2rem;
        margin-bottom: 10px;
        text-align: center;
        font-weight: 600;
    }
    
    .section-subtitle {
        color: #666;
        text-align: center;
        margin-bottom: 30px;
        font-size: 1.1rem;
        font-style: italic;
    }
    
    .scholarships-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 25px;
        margin-bottom: 40px;
    }
    
    .filtered-state-scholarships {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    
    .state-group {
        background: white;
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        border: 1px solid #e9ecef;
    }
    
    .state-heading {
        color: #2c5aa0;
        font-size: 1.5rem;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #e9ecef;
        text-align: center;
    }
    
    .state-scholarships-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .filtered-state-scholarship-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 12px;
        border-left: 4px solid #2c5aa0;
        transition: all 0.3s ease;
    }
    
    .filtered-state-scholarship-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        background: white;
    }
    
    .filtered-state-scholarship-item .scholarship-info {
        flex: 1;
        margin-right: 20px;
    }
    
    .filtered-state-scholarship-item h4 {
        color: #2c5aa0;
        margin: 0 0 10px 0;
        font-size: 1.2rem;
        font-weight: 600;
    }
    
    .filtered-state-scholarship-item .amount {
        color: #27ae60;
        font-weight: 600;
        margin: 8px 0;
        font-size: 1.1rem;
    }
    
    .filtered-state-scholarship-item .category {
        display: inline-block;
        background: #e8f4fd;
        color: #2c5aa0;
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 0.8rem;
        margin: 8px 0;
        font-weight: 500;
    }
    
    .filtered-state-scholarship-item .beneficiaries {
        color: #666;
        margin: 8px 0;
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .filtered-state-scholarship-item .scholarship-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 120px;
    }
    
    /* Responsive adjustments for filtered view */
    @media (max-width: 768px) {
        .filtered-state-scholarship-item {
            flex-direction: column;
            gap: 15px;
        }
        
        .filtered-state-scholarship-item .scholarship-info {
            margin-right: 0;
            margin-bottom: 15px;
        }
        
        .filtered-state-scholarship-item .scholarship-actions {
            flex-direction: row;
            justify-content: center;
            min-width: auto;
        }
        
        .scholarships-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }
    }
`;
document.head.appendChild(style); 