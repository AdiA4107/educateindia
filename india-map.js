// Interactive India Education Map
class IndiaEducationMap {
    constructor() {
        this.currentFilter = 'all';
        this.selectedState = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderMap();
        this.loadInstitutionData();
    }
    
    setupEventListeners() {
        // Map filter buttons
        document.querySelectorAll('.map-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterChange(e.target.getAttribute('data-filter'));
            });
        });
        
        // Close panel button
        const closePanel = document.getElementById('closePanel');
        if (closePanel) {
            closePanel.addEventListener('click', () => {
                this.hideStatePanel();
            });
        }
    }
    
    handleFilterChange(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.map-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // Update map display
        this.updateMapDisplay();
    }
    
    renderMap() {
        const mapContainer = document.getElementById('indiaMapSVG');
        if (!mapContainer) return;
        
        // Use the actual India map image with clickable state labels
        const mapHTML = `
            <div class="india-map-image-container">
                <img src="India-map-en.svg.png" alt="India Map" class="india-map-image">
                
                <!-- Interactive overlay for better UX -->
                <div class="map-overlay" id="mapOverlay"></div>
                
                <!-- Invisible clickable areas over each state for hover functionality -->
                <div class="state-hover-areas">
                    <div class="state-hover-area" data-state="jammu-kashmir" style="top: 25px; left: 170px; width: 120px; height: 80px;"></div>
                    <div class="state-hover-area" data-state="himachal-pradesh" style="top: 65px; left: 190px; width: 100px; height: 70px;"></div>
                    <div class="state-hover-area" data-state="punjab" style="top: 85px; left: 220px; width: 90px; height: 60px;"></div>
                    <div class="state-hover-area" data-state="haryana" style="top: 105px; left: 270px; width: 80px; height: 50px;"></div>
                    <div class="state-hover-area" data-state="rajasthan" style="top: 145px; left: 320px; width: 150px; height: 80px;"></div>
                    <div class="state-hover-area" data-state="uttar-pradesh" style="top: 205px; left: 290px; width: 120px; height: 100px;"></div>
                    <div class="state-hover-area" data-state="madhya-pradesh" style="top: 245px; left: 390px; width: 120px; height: 90px;"></div>
                    <div class="state-hover-area" data-state="gujarat" style="top: 185px; left: 450px; width: 130px; height: 100px;"></div>
                    <div class="state-hover-area" data-state="maharashtra" style="top: 285px; left: 490px; width: 120px; height: 120px;"></div>
                    <div class="state-hover-area" data-state="chhattisgarh" style="top: 345px; left: 410px; width: 100px; height: 80px;"></div>
                    <div class="state-hover-area" data-state="jharkhand" style="top: 405px; left: 370px; width: 80px; height: 80px;"></div>
                    <div class="state-hover-area" data-state="bihar" style="top: 445px; left: 310px; width: 80px; height: 80px;"></div>
                    <div class="state-hover-area" data-state="west-bengal" style="top: 525px; left: 310px; width: 80px; height: 80px;"></div>
                    <div class="state-hover-area" data-state="odisha" style="top: 465px; left: 390px; width: 100px; height: 80px;"></div>
                    <div class="state-hover-area" data-state="telangana" style="top: 365px; left: 510px; width: 100px; height: 80px;"></div>
                    <div class="state-hover-area" data-state="andhra-pradesh" style="top: 425px; left: 550px; width: 100px; height: 80px;"></div>
                    <div class="state-hover-area" data-state="karnataka" style="top: 375px; left: 570px; width: 100px; height: 80px;"></div>
                    <div class="state-hover-area" data-state="tamil-nadu" style="top: 445px; left: 610px; width: 100px; height: 80px;"></div>
                    <div class="state-hover-area" data-state="kerala" style="top: 405px; left: 630px; width: 100px; height: 80px;"></div>
                    <div class="state-hover-area" data-state="goa" style="top: 375px; left: 560px; width: 40px; height: 40px;"></div>
                    <div class="state-hover-area" data-state="uttarakhand" style="top: 125px; left: 230px; width: 80px; height: 60px;"></div>
                    <div class="state-hover-area" data-state="delhi" style="top: 105px; left: 290px; width: 30px; height: 30px;"></div>
                </div>
                
                <!-- State labels overlay - positioned to match actual map and made clickable -->
                <div class="state-labels-overlay">
                    <div class="state-label clickable" style="top: 35px; left: 180px;" data-state="jammu-kashmir">J&K</div>
                    <div class="state-label clickable" style="top: 75px; left: 200px;" data-state="himachal-pradesh">HP</div>
                    <div class="state-label clickable" style="top: 95px; left: 230px;" data-state="punjab">PB</div>
                    <div class="state-label clickable" style="top: 115px; left: 280px;" data-state="haryana">HR</div>
                    <div class="state-label clickable" style="top: 155px; left: 330px;" data-state="rajasthan">RJ</div>
                    <div class="state-label clickable" style="top: 215px; left: 300px;" data-state="uttar-pradesh">UP</div>
                    <div class="state-label clickable" style="top: 255px; left: 400px;" data-state="madhya-pradesh">MP</div>
                    <div class="state-label clickable" style="top: 195px; left: 460px;" data-state="gujarat">GJ</div>
                    <div class="state-label clickable" style="top: 295px; left: 500px;" data-state="maharashtra">MH</div>
                    <div class="state-label clickable" style="top: 355px; left: 420px;" data-state="chhattisgarh">CG</div>
                    <div class="state-label clickable" style="top: 415px; left: 380px;" data-state="jharkhand">JH</div>
                    <div class="state-label clickable" style="top: 455px; left: 320px;" data-state="bihar">BR</div>
                    <div class="state-label clickable" style="top: 535px; left: 320px;" data-state="west-bengal">WB</div>
                    <div class="state-label clickable" style="top: 475px; left: 400px;" data-state="odisha">OD</div>
                    <div class="state-label clickable" style="top: 375px; left: 520px;" data-state="telangana">TS</div>
                    <div class="state-label clickable" style="top: 435px; left: 560px;" data-state="andhra-pradesh">AP</div>
                    <div class="state-label clickable" style="top: 385px; left: 580px;" data-state="karnataka">KA</div>
                    <div class="state-label clickable" style="top: 455px; left: 620px;" data-state="tamil-nadu">TN</div>
                    <div class="state-label clickable" style="top: 415px; left: 640px;" data-state="kerala">KL</div>
                    <div class="state-label clickable" style="top: 385px; left: 570px;" data-state="goa">GA</div>
                    <div class="state-label clickable" style="top: 135px; left: 240px;" data-state="uttarakhand">UK</div>
                    <div class="state-label clickable" style="top: 115px; left: 300px;" data-state="delhi">DL</div>
                </div>
            </div>
        `;
        
        mapContainer.innerHTML = mapHTML;
        
        // Add event listeners to the map
        this.addMapEventListeners();
    }
    
    addMapEventListeners() {
        // Panel starts hidden by default
        this.hideStatePanel();
        
        // Add event listeners to state hover areas (entire state area)
        const stateHoverAreas = document.querySelectorAll('.state-hover-area');
        
        stateHoverAreas.forEach(area => {
            const stateCode = area.getAttribute('data-state');
            
            // Hover effects for entire state area
            area.addEventListener('mouseenter', () => {
                this.showStateInfo(stateCode);
                // Highlight corresponding label
                const label = document.querySelector(`.state-label[data-state="${stateCode}"]`);
                if (label) label.classList.add('selected');
            });
            
            area.addEventListener('mouseleave', () => {
                // Don't hide panel on mouse leave, just remove highlight
                const label = document.querySelector(`.state-label[data-state="${stateCode}"]`);
                if (label) label.classList.remove('selected');
            });
        });
        
        // Add event listeners to state labels (for clicking)
        const stateLabels = document.querySelectorAll('.state-label.clickable');
        
        stateLabels.forEach(label => {
            const stateCode = label.getAttribute('data-state');
            
            // Click events for labels
            label.addEventListener('click', () => {
                this.showStateInfo(stateCode);
                label.classList.add('selected');
                
                // Remove selected class from other labels
                stateLabels.forEach(otherLabel => {
                    if (otherLabel !== label) {
                        otherLabel.classList.remove('selected');
                    }
                });
            });
        });
        
        // Close panel when clicking close button
        const closePanel = document.getElementById('closePanel');
        if (closePanel) {
            closePanel.addEventListener('click', () => {
                this.hideStatePanel();
                // Remove all highlights
                stateLabels.forEach(label => label.classList.remove('selected'));
            });
        }
        
        // Add toggle button functionality
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        toggleBtn.className = 'panel-toggle-btn';
        toggleBtn.addEventListener('click', () => {
            this.toggleStatePanel();
        });
        
        // Insert toggle button before the panel
        const panel = document.getElementById('stateInfoPanel');
        if (panel) {
            panel.parentNode.insertBefore(toggleBtn, panel);
        }
    }
    
    showWelcomePanel() {
        const panel = document.getElementById('stateInfoPanel');
        const stateName = document.getElementById('stateName');
        const institutionsList = document.getElementById('institutionsList');
        const stateScholarships = document.getElementById('stateScholarships');
        
        stateName.textContent = 'Welcome to EduAccess India';
        institutionsList.innerHTML = `
            <div class="welcome-message">
                <h4>Interactive India Education Map</h4>
                <p>👆 <strong>Hover over any state</strong> to see educational institutions and scholarships</p>
                <p>🖱️ <strong>Click on state labels</strong> to keep information open</p>
                <p>📚 <strong>Explore</strong> universities, colleges, and institutes across India</p>
                <p>💰 <strong>Discover</strong> state-specific scholarships and opportunities</p>
            </div>
        `;
        stateScholarships.innerHTML = `
            <div class="welcome-scholarships">
                <h4>Featured Scholarships</h4>
                <p>State-specific scholarship information will appear here when you select a state.</p>
            </div>
        `;
        
        // Show panel by default
        panel.classList.remove('hidden');
    }
    
    showStateInfo(stateCode) {
        // Show state information in the panel
        this.showStatePanel(stateCode);
    }
    
    hideStateInfo() {
        // Hide the state panel
        this.hideStatePanel();
    }
    
    selectState(stateCode) {
        this.selectedState = stateCode;
        this.showStatePanel(stateCode);
        
        // Highlight the selected state
        this.highlightSelectedState(stateCode);
    }
    
    highlightSelectedState(stateCode) {
        // Remove previous highlights
        document.querySelectorAll('.state-label').forEach(label => {
            label.classList.remove('selected');
        });
        
        // Add highlight to selected state
        const selectedLabel = document.querySelector(`[data-state="${stateCode}"]`);
        if (selectedLabel) {
            selectedLabel.classList.add('selected');
        }
    }
    
    showStatePanel(stateCode) {
        const stateData = this.getStateData(stateCode);
        if (!stateData) return;
        
        const panel = document.getElementById('stateInfoPanel');
        const stateName = document.getElementById('stateName');
        const universityCount = document.getElementById('universityCount');
        const collegeCount = document.getElementById('collegeCount');
        const institutionsList = document.getElementById('institutionsList');
        const stateScholarships = document.getElementById('stateScholarships');
        
        // Update panel content
        stateName.textContent = stateData.name;
        
        // Show total institutions count (combining all types)
        const totalInstitutions = stateData.institutions.length;
        universityCount.textContent = totalInstitutions;
        collegeCount.textContent = stateData.scholarships.length;
        
        // Show institutions list
        institutionsList.innerHTML = `
            <h4>Top Educational Institutions</h4>
            <div class="institutions-grid">
                ${stateData.institutions.map(inst => `
                    <div class="institution-card" data-url="${inst.website}">
                        <div class="institution-logo">
                            <i class="fas ${this.getInstitutionIcon(inst.type)}"></i>
                        </div>
                        <div class="institution-info">
                            <h5>${inst.name}</h5>
                            <p class="institution-type">${inst.type}</p>
                            <p class="institution-ranking">${inst.ranking}</p>
                            <p class="institution-specialty">${inst.specialty}</p>
                        </div>
                        <div class="institution-actions">
                            <a href="${inst.website}" target="_blank" class="btn btn-primary btn-sm">Visit</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Show state scholarships
        stateScholarships.innerHTML = `
            <div class="scholarships-list">
                ${stateData.scholarships.map(sch => `
                    <div class="scholarship-item">
                        <span class="scholarship-name">${sch.name}</span>
                        <span class="scholarship-amount">${sch.amount}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Show panel by removing hidden class
        panel.classList.remove('hidden');
        
        // Add click events to institution cards
        this.addInstitutionCardEvents();
    }
    
    hideStatePanel() {
        const panel = document.getElementById('stateInfoPanel');
        panel.classList.add('hidden');
    }
    
    toggleStatePanel() {
        const panel = document.getElementById('stateInfoPanel');
        panel.classList.toggle('hidden');
    }
    
    addInstitutionCardEvents() {
        document.querySelectorAll('.institution-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn')) {
                    const url = card.getAttribute('data-url');
                    if (url) {
                        window.open(url, '_blank');
                    }
                }
            });
        });
    }
    
    getInstitutionIcon(type) {
        const icons = {
            'University': 'fa-university',
            'College': 'fa-graduation-cap',
            'Institute': 'fa-flask',
            'IIT': 'fa-cogs',
            'Medical': 'fa-heartbeat'
        };
        return icons[type] || 'fa-building';
    }
    
    getStateData(stateCode) {
        return this.institutionData[stateCode];
    }
    
    loadInstitutionData() {
        // Comprehensive institution data with top universities from the list
        this.institutionData = {
            'jammu-kashmir': {
                name: 'Jammu & Kashmir',
                knownFor: 'Tourism, Agriculture, Education',
                topInstitutions: [
                    { name: 'University of Kashmir', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' },
                    { name: 'NIT Srinagar', type: 'Institute', ranking: 'Top NIT', specialty: 'Engineering' }
                ],
                institutions: [
                    { name: 'University of Kashmir', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.kashmiruniversity.net/' },
                    { name: 'NIT Srinagar', type: 'Institute', ranking: 'Top NIT', specialty: 'Engineering', website: 'https://nitsri.ac.in/' },
                    { name: 'University of Jammu', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.jammuuniversity.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('jammu-kashmir')
            },
            'himachal-pradesh': {
                name: 'Himachal Pradesh',
                knownFor: 'Tourism, Agriculture, Education',
                topInstitutions: [
                    { name: 'IIT Mandi', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology' },
                    { name: 'Himachal Pradesh University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Mandi', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology', website: 'https://www.iitmandi.ac.in/' },
                    { name: 'Himachal Pradesh University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://hpuniv.ac.in/' },
                    { name: 'NIT Hamirpur', type: 'Institute', ranking: 'Top NIT', specialty: 'Engineering', website: 'https://nith.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('himachal-pradesh')
            },
            'punjab': {
                name: 'Punjab',
                knownFor: 'Agriculture, Engineering, Medical',
                topInstitutions: [
                    { name: 'IIT Ropar', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology' },
                    { name: 'Punjab University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Ropar', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology', website: 'https://www.iitropar.ac.in/' },
                    { name: 'Punjab University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://puchd.ac.in/' },
                    { name: 'Thapar University', type: 'University', ranking: 'Top Private', specialty: 'Engineering', website: 'https://thapar.edu/' }
                ],
                scholarships: this.getStateScholarshipsForMap('punjab')
            },
            'haryana': {
                name: 'Haryana',
                knownFor: 'Agriculture, Industry, Education',
                topInstitutions: [
                    { name: 'IIT Roorkee', type: 'IIT', ranking: 'Top 10 IIT', specialty: 'Engineering & Technology' },
                    { name: 'Kurukshetra University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Roorkee', type: 'IIT', ranking: 'Top 10 IIT', specialty: 'Engineering & Technology', website: 'https://www.iitr.ac.in/' },
                    { name: 'Kurukshetra University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://kuk.ac.in/' },
                    { name: 'Manav Rachna University', type: 'University', ranking: 'Top Private', specialty: 'Engineering & Management', website: 'https://manavrachna.edu.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('haryana')
            },
            'rajasthan': {
                name: 'Rajasthan',
                knownFor: 'Tourism, Engineering, Medical',
                topInstitutions: [
                    { name: 'IIT Jodhpur', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology' },
                    { name: 'BITS Pilani', type: 'University', ranking: 'Top Private', specialty: 'Engineering & Sciences' }
                ],
                institutions: [
                    { name: 'IIT Jodhpur', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology', website: 'https://www.iitj.ac.in/' },
                    { name: 'BITS Pilani', type: 'University', ranking: 'Top Private', specialty: 'Engineering & Sciences', website: 'https://www.bits-pilani.ac.in/' },
                    { name: 'MNIT Jaipur', type: 'Institute', ranking: 'Top NIT', specialty: 'Engineering', website: 'https://mnit.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('rajasthan')
            },
            'uttar-pradesh': {
                name: 'Uttar Pradesh',
                knownFor: 'Engineering, Medical, Law, Management',
                topInstitutions: [
                    { name: 'IIT Kanpur', type: 'IIT', ranking: 'Top 5 IIT', specialty: 'Engineering & Technology' },
                    { name: 'BHU Varanasi', type: 'University', ranking: 'Central University', specialty: 'Multi-disciplinary' },
                    { name: 'AMU Aligarh', type: 'University', ranking: 'Central University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Kanpur', type: 'IIT', ranking: 'Top 5 IIT', specialty: 'Engineering & Technology', website: 'https://www.iitk.ac.in/' },
                    { name: 'BHU Varanasi', type: 'University', ranking: 'Central University', specialty: 'Multi-disciplinary', website: 'https://www.bhu.ac.in/' },
                    { name: 'AMU Aligarh', type: 'University', ranking: 'Central University', specialty: 'Multi-disciplinary', website: 'https://www.amu.ac.in/' },
                    { name: 'IIT BHU', type: 'IIT', ranking: 'Top IIT', specialty: 'Engineering', website: 'https://iitbhu.ac.in/' },
                    { name: 'Lucknow University', type: 'University', ranking: 'State University', specialty: 'Arts & Sciences', website: 'https://www.lkouniv.ac.in/' },
                    { name: 'JSS Academy', type: 'University', ranking: 'Top Private', specialty: 'Medical & Engineering', website: 'https://www.jssaten.ac.in/' },
                    { name: 'Galgotias University', type: 'University', ranking: 'Top Private', specialty: 'Multi-disciplinary', website: 'https://www.galgotiasuniversity.edu.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('uttar-pradesh')
            }
        };
        
        // Continue with other states...
        this.loadRemainingStates();
    }
    
    loadRemainingStates() {
        // Add remaining states with consistent scholarship data
        const remainingStates = {
            'madhya-pradesh': {
                name: 'Madhya Pradesh',
                knownFor: 'Engineering, Medical, Agriculture',
                topInstitutions: [
                    { name: 'IIT Indore', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology' },
                    { name: 'Bhopal University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Indore', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology', website: 'https://www.iiti.ac.in/' },
                    { name: 'Bhopal University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.bubhopal.ac.in/' },
                    { name: 'NIT Bhopal', type: 'Institute', ranking: 'Top NIT', specialty: 'Engineering', website: 'https://www.manit.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('madhya-pradesh')
            },
            'gujarat': {
                name: 'Gujarat',
                knownFor: 'Engineering, Business, Industry',
                topInstitutions: [
                    { name: 'IIT Gandhinagar', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology' },
                    { name: 'Gujarat University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Gandhinagar', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology', website: 'https://www.iitgn.ac.in/' },
                    { name: 'Gujarat University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.gujaratuniversity.ac.in/' },
                    { name: 'NIT Surat', type: 'Institute', ranking: 'Top NIT', specialty: 'Engineering', website: 'https://www.svnit.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('gujarat')
            },
            'maharashtra': {
                name: 'Maharashtra',
                knownFor: 'Engineering, Medical, Management, Arts',
                topInstitutions: [
                    { name: 'IIT Bombay', type: 'IIT', ranking: 'Top 3 IIT', specialty: 'Engineering & Technology' },
                    { name: 'Mumbai University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Bombay', type: 'IIT', ranking: 'Top 3 IIT', specialty: 'Engineering & Technology', website: 'https://www.iitb.ac.in/' },
                    { name: 'Mumbai University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://mu.ac.in/' },
                    { name: 'Pune University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.unipune.ac.in/' },
                    { name: 'SPPU', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.unipune.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('maharashtra')
            },
            'chhattisgarh': {
                name: 'Chhattisgarh',
                knownFor: 'Engineering, Medical, Agriculture',
                topInstitutions: [
                    { name: 'NIT Raipur', type: 'Institute', ranking: 'Top NIT', specialty: 'Engineering' },
                    { name: 'Pt. Ravishankar Shukla University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'NIT Raipur', type: 'Institute', ranking: 'Top NIT', specialty: 'Engineering', website: 'https://www.nitrr.ac.in/' },
                    { name: 'Pt. Ravishankar Shukla University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.prsu.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('chhattisgarh')
            },
            'jharkhand': {
                name: 'Jharkhand',
                knownFor: 'Engineering, Medical, Mining',
                topInstitutions: [
                    { name: 'IIT Dhanbad', type: 'IIT', ranking: 'Top IIT', specialty: 'Engineering & Mining' },
                    { name: 'Ranchi University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Dhanbad', type: 'IIT', ranking: 'Top IIT', specialty: 'Engineering & Mining', website: 'https://www.iitism.ac.in/' },
                    { name: 'Ranchi University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.ranchiuniversity.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('jharkhand')
            },
            'bihar': {
                name: 'Bihar',
                knownFor: 'Engineering, Medical, Law',
                topInstitutions: [
                    { name: 'IIT Patna', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology' },
                    { name: 'Patna University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Patna', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology', website: 'https://www.iitp.ac.in/' },
                    { name: 'Patna University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.patnauniversity.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('bihar')
            },
            'odisha': {
                name: 'Odisha',
                knownFor: 'Engineering, Medical, Technology',
                topInstitutions: [
                    { name: 'IIT Bhubaneswar', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology' },
                    { name: 'Utkal University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Bhubaneswar', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology', website: 'https://www.iitbbs.ac.in/' },
                    { name: 'Utkal University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://utkaluniversity.nic.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('odisha')
            },
            'telangana': {
                name: 'Telangana',
                knownFor: 'Engineering, Medical, IT',
                topInstitutions: [
                    { name: 'IIT Hyderabad', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology' },
                    { name: 'Osmania University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Hyderabad', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology', website: 'https://www.iith.ac.in/' },
                    { name: 'Osmania University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.osmania.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('telangana')
            },
            'andhra-pradesh': {
                name: 'Andhra Pradesh',
                knownFor: 'Engineering, Medical, Agriculture',
                topInstitutions: [
                    { name: 'IIT Tirupati', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology' },
                    { name: 'Andhra University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Tirupati', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology', website: 'https://www.iittp.ac.in/' },
                    { name: 'Andhra University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.andhrauniversity.edu.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('andhra-pradesh')
            },
            'karnataka': {
                name: 'Karnataka',
                knownFor: 'Engineering, Medical, IT, Management',
                topInstitutions: [
                    { name: 'IISc Bangalore', type: 'Institute', ranking: 'Top Research Institute', specialty: 'Science & Engineering' },
                    { name: 'Bangalore University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IISc Bangalore', type: 'Institute', ranking: 'Top Research Institute', specialty: 'Science & Engineering', website: 'https://www.iisc.ac.in/' },
                    { name: 'Bangalore University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://bangaloreuniversity.ac.in/' },
                    { name: 'Manipal University', type: 'University', ranking: 'Top Private', specialty: 'Multi-disciplinary', website: 'https://manipal.edu/' }
                ],
                scholarships: this.getStateScholarshipsForMap('karnataka')
            },
            'tamil-nadu': {
                name: 'Tamil Nadu',
                knownFor: 'Engineering, Medical, Arts, Management',
                topInstitutions: [
                    { name: 'IIT Madras', type: 'IIT', ranking: 'Top 3 IIT', specialty: 'Engineering & Technology' },
                    { name: 'Anna University', type: 'University', ranking: 'State University', specialty: 'Engineering & Technology' }
                ],
                institutions: [
                    { name: 'IIT Madras', type: 'IIT', ranking: 'Top 3 IIT', specialty: 'Engineering & Technology', website: 'https://www.iitm.ac.in/' },
                    { name: 'Anna University', type: 'University', ranking: 'State University', specialty: 'Engineering & Technology', website: 'https://www.annauniv.edu/' },
                    { name: 'VIT Vellore', type: 'University', ranking: 'Top Private', specialty: 'Engineering & Technology', website: 'https://vit.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('tamil-nadu')
            },
            'kerala': {
                name: 'Kerala',
                knownFor: 'Medical, Engineering, Arts',
                topInstitutions: [
                    { name: 'IIT Palakkad', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology' },
                    { name: 'Kerala University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Palakkad', type: 'IIT', ranking: 'New IIT', specialty: 'Engineering & Technology', website: 'https://www.iitpkd.ac.in/' },
                    { name: 'Kerala University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.keralauniversity.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('kerala')
            },
            'goa': {
                name: 'Goa',
                knownFor: 'Tourism, Engineering, Medical',
                topInstitutions: [
                    { name: 'Goa University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' },
                    { name: 'NIT Goa', type: 'Institute', ranking: 'New NIT', specialty: 'Engineering' }
                ],
                institutions: [
                    { name: 'Goa University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.unigoa.ac.in/' },
                    { name: 'NIT Goa', type: 'Institute', ranking: 'New NIT', specialty: 'Engineering', website: 'https://www.nitgoa.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('goa')
            },
            'uttarakhand': {
                name: 'Uttarakhand',
                knownFor: 'Engineering, Medical, Tourism',
                topInstitutions: [
                    { name: 'IIT Roorkee', type: 'IIT', ranking: 'Top 10 IIT', specialty: 'Engineering & Technology' },
                    { name: 'Uttarakhand University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Roorkee', type: 'IIT', ranking: 'Top 10 IIT', specialty: 'Engineering & Technology', website: 'https://www.iitr.ac.in/' },
                    { name: 'Uttarakhand University', type: 'University', ranking: 'State University', specialty: 'Multi-disciplinary', website: 'https://www.uudoon.org/' }
                ],
                scholarships: this.getStateScholarshipsForMap('uttarakhand')
            },
            'west-bengal': {
                name: 'West Bengal',
                knownFor: 'Engineering, Medical, Arts, Sciences',
                topInstitutions: [
                    { name: 'IIT Kharagpur', type: 'IIT', ranking: 'Top 5 IIT', specialty: 'Engineering & Technology' },
                    { name: 'Jadavpur University', type: 'University', ranking: 'State University', specialty: 'Engineering & Technology' }
                ],
                institutions: [
                    { name: 'IIT Kharagpur', type: 'IIT', ranking: 'Top 5 IIT', specialty: 'Engineering & Technology', website: 'https://www.iitkgp.ac.in/' },
                    { name: 'Jadavpur University', type: 'University', ranking: 'State University', specialty: 'Engineering & Technology', website: 'https://www.jadavpuruniversity.in/' },
                    { name: 'Presidency University', type: 'University', ranking: 'State University', specialty: 'Arts & Sciences', website: 'https://www.presiuniv.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('west-bengal')
            },
            'delhi': {
                name: 'Delhi',
                knownFor: 'Engineering, Medical, Management, Arts',
                topInstitutions: [
                    { name: 'IIT Delhi', type: 'IIT', ranking: 'Top 5 IIT', specialty: 'Engineering & Technology' },
                    { name: 'Delhi University', type: 'University', ranking: 'Central University', specialty: 'Multi-disciplinary' }
                ],
                institutions: [
                    { name: 'IIT Delhi', type: 'IIT', ranking: 'Top 5 IIT', specialty: 'Engineering & Technology', website: 'https://www.iitd.ac.in/' },
                    { name: 'Delhi University', type: 'University', ranking: 'Central University', specialty: 'Multi-disciplinary', website: 'https://www.du.ac.in/' },
                    { name: 'JNU', type: 'University', ranking: 'Central University', specialty: 'Social Sciences & Languages', website: 'https://www.jnu.ac.in/' }
                ],
                scholarships: this.getStateScholarshipsForMap('delhi')
            }
        };
        
        // Merge remaining states into main data
        Object.assign(this.institutionData, remainingStates);
    }
    
    getStateScholarshipsForMap(stateCode) {
        // Get the same state scholarship data used in scholarships page
        const stateScholarships = {
            'jammu-kashmir': [
                { name: 'J&K SC/ST Scholarship', amount: '₹10,000/year' },
                { name: 'J&K Minority Scholarship', amount: '₹8,000/year' }
            ],
            'himachal-pradesh': [
                { name: 'HP SC/ST Scholarship', amount: '₹12,000/year' },
                { name: 'HP OBC Merit Scholarship', amount: '₹8,000/year' }
            ],
            'punjab': [
                { name: 'Punjab SC/ST Scholarship', amount: '₹15,000/year' },
                { name: 'Punjab OBC Merit Scholarship', amount: '₹10,000/year' }
            ],
            'haryana': [
                { name: 'Haryana SC/ST Scholarship', amount: '₹12,000/year' },
                { name: 'Haryana OBC Merit Scholarship', amount: '₹8,000/year' }
            ],
            'rajasthan': [
                { name: 'Rajasthan SC/ST Scholarship', amount: '₹10,000/year' },
                { name: 'Rajasthan OBC Merit Scholarship', amount: '₹8,000/year' }
            ],
            'uttar-pradesh': [
                { name: 'UP SC/ST Post-Matric Scholarship', amount: '₹12,000/year' },
                { name: 'UP OBC Scholarship', amount: '₹8,000/year' },
                { name: 'UP Minority Scholarship', amount: '₹10,000/year' }
            ],
            'madhya-pradesh': [
                { name: 'MP SC/ST Scholarship', amount: '₹12,000/year' },
                { name: 'MP OBC Merit Scholarship', amount: '₹8,000/year' }
            ],
            'gujarat': [
                { name: 'Gujarat SC/ST Scholarship', amount: '₹15,000/year' },
                { name: 'Gujarat OBC Merit Scholarship', amount: '₹10,000/year' }
            ],
            'maharashtra': [
                { name: 'Maharashtra SC Post-Matric Scholarship', amount: '₹15,000/year' },
                { name: 'Rajarshi Shahu SC Scholarship', amount: '₹10,000/year' },
                { name: 'Dr. Panjabrao Deshmukh OBC Scholarship', amount: '₹12,000/year' },
                { name: 'Maharashtra Minority Scholarship', amount: '₹8,000/year' }
            ],
            'chhattisgarh': [
                { name: 'CG SC/ST Scholarship', amount: '₹10,000/year' },
                { name: 'CG OBC Merit Scholarship', amount: '₹8,000/year' }
            ],
            'jharkhand': [
                { name: 'Jharkhand SC/ST Scholarship', amount: '₹12,000/year' },
                { name: 'Jharkhand OBC Merit Scholarship', amount: '₹8,000/year' }
            ],
            'bihar': [
                { name: 'Bihar SC/ST Post-Matric Scholarship', amount: '₹12,000/year' },
                { name: 'Bihar OBC Scholarship', amount: '₹8,000/year' }
            ],
            'odisha': [
                { name: 'Odisha SC/ST Scholarship', amount: '₹12,000/year' },
                { name: 'Odisha OBC Merit Scholarship', amount: '₹8,000/year' }
            ],
            'telangana': [
                { name: 'Telangana SC/ST Scholarship', amount: '₹15,000/year' },
                { name: 'Telangana OBC Merit Scholarship', amount: '₹10,000/year' }
            ],
            'andhra-pradesh': [
                { name: 'AP SC/ST Scholarship', amount: '₹12,000/year' },
                { name: 'AP OBC Merit Scholarship', amount: '₹8,000/year' }
            ],
            'karnataka': [
                { name: 'Karnataka SC/ST Post-Matric Scholarship', amount: '₹12,000/year' },
                { name: 'Karnataka OBC Merit Scholarship', amount: '₹8,000/year' },
                { name: 'Karnataka Minority Scholarship', amount: '₹10,000/year' }
            ],
            'tamil-nadu': [
                { name: 'TN SC/ST Post-Matric Scholarship', amount: '₹10,000/year' },
                { name: 'TN First Graduate Scheme', amount: 'Fee Waiver' },
                { name: 'TN Minority Scholarship', amount: '₹8,000/year' },
                { name: 'TN OBC Scholarship', amount: '₹9,000/year' }
            ],
            'kerala': [
                { name: 'Kerala SC/ST Scholarship', amount: '₹12,000/year' },
                { name: 'Kerala Minority Scholarship', amount: '₹10,000/year' }
            ],
            'goa': [
                { name: 'Goa SC/ST Scholarship', amount: '₹10,000/year' },
                { name: 'Goa OBC Merit Scholarship', amount: '₹8,000/year' }
            ],
            'uttarakhand': [
                { name: 'Uttarakhand SC/ST Scholarship', amount: '₹12,000/year' },
                { name: 'Uttarakhand OBC Merit Scholarship', amount: '₹8,000/year' }
            ],
            'west-bengal': [
                { name: 'WB Swami Vivekananda Merit Cum Means Scholarship', amount: 'Varies' },
                { name: 'WB Kanyashree Prakalpa (Girls)', amount: '₹1,000-₹25,000' },
                { name: 'WB Aikyashree Minority Scholarship', amount: '₹10,000/year' }
            ],
            'delhi': [
                { name: 'Delhi SC/ST Scholarship', amount: '₹12,000/year' },
                { name: 'Delhi Minority Scholarship', amount: '₹10,000/year' },
                { name: 'Delhi OBC Merit Scholarship', amount: '₹8,000/year' }
            ]
        };
        
        return stateScholarships[stateCode] || [
            { name: 'State Scholarship', amount: '₹10,000/year' },
            { name: 'Merit Scholarship', amount: '₹8,000/year' }
        ];
    }
    
    updateMapDisplay() {
        // Update map based on current filter
        document.querySelectorAll('.state-label').forEach(label => {
            const stateCode = label.getAttribute('data-state');
            const stateData = this.getStateData(stateCode);
            
            if (stateData) {
                if (this.currentFilter === 'all' || 
                    (this.currentFilter === 'universities' && stateData.institutions.some(i => i.type === 'University')) ||
                    (this.currentFilter === 'colleges' && stateData.institutions.some(i => i.type === 'College')) ||
                    (this.currentFilter === 'institutes' && stateData.institutions.some(i => i.type === 'Institute'))) {
                    label.style.opacity = '1';
                    label.style.color = '#2c3e50';
                } else {
                    label.style.opacity = '0.3';
                    label.style.color = '#bdc3c7';
                }
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new IndiaEducationMap();
}); 