/* ==========================================
   BE NICE BEAUTY — CENTRAL PRICE LIST

   Prices are in GBP.

   offer: {
    discountPercent: 0,
    startDate: null,
    endDate: null
}
   No seasonal offer.

   Example seasonal offer:
   offer: {
     discountPercent: 20,
     startDate: "2026-12-01",
     endDate: null
   }

   endDate: null
   Offer continues until manually removed.

   Dates use YYYY-MM-DD format.
   The end date includes the entire day.
========================================== */

window.BN_PRICES = {
    currency: "GBP",
    timeZone: "Europe/London",

    treatments: {

        /* ======================================
           FACIAL
        ====================================== */

        "deep-cleansing": {
            name: "Deep Cleansing with Manual Extraction",
            price: 99,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "hydrofacial": {
            name: "HydroFacial",
            price: 99,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "hydro-intense": {
            name: "Hydro Intense Treatment",
            price: 89,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "instant-glow": {
            name: "Instant Glow Treatment",
            price: 89,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "age-refinement": {
            name: "Age Refinement Treatment",
            price: 89,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "korean-glass-facial": {
            name: "Bespoke Korean Glass Facial",
            price: 99,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "skin-correction-facial": {
            name: "Bespoke Skin Correction Facial",
            price: 99,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "express-facial": {
            name: "Express Facial",
            price: 59,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "eye-firming": {
            name: "Intense Eye Firming Treatment",
            price: 59,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "facial-massage": {
            name: "Facial Massage",
            price: 59,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        /* ======================================
           AESTHETIC
        ====================================== */

        "chemical-peel": {
            name: "Chemical Peel",
            price: 79,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "microneedling": {
            name: "Microneedling Collagen Induction",
            price: 139,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "rf-microneedling": {
            name: "RF Microneedling Skin Tightening",
            price: 180,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "scalp-treatment": {
            name: "Scalp Health & Hair Growth Treatment",
            price: 139,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "mesotherapy-face": {
            name: "Mesotherapy Injection for Face",
            price: 150,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        /* ======================================
           LASER
    
           price = single-session price.
    
           package.price = final price for all
           six sessions together.
    
           savingPercent is a display label.
           It does not reduce package.price again.
    
           Single-session and package seasonal
           offers are configured separately.
        ====================================== */

        "laser-micro": {
            name: "Laser MICRO Area",
            price: 29,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            },

            package: {
                sessions: 6,
                price: 139,
                savingPercent: 20,
                offer: {
                    discountPercent: 0,
                    startDate: null,
                    endDate: null
                }
            }
        },

        "laser-small": {
            name: "Laser SMALL Area",
            price: 49,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            },

            package: {
                sessions: 6,
                price: 235,
                savingPercent: 20,
                offer: {
                    discountPercent: 0,
                    startDate: null,
                    endDate: null
                }
            }
        },

        "laser-medium": {
            name: "Laser MEDIUM Area",
            price: 89,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            },

            package: {
                sessions: 6,
                price: 427,
                savingPercent: 20,
                offer: {
                    discountPercent: 0,
                    startDate: null,
                    endDate: null
                }
            }
        },

        "laser-large": {
            name: "Laser LARGE Area",
            price: 125,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            },

            package: {
                sessions: 6,
                price: 600,
                savingPercent: 20,
                offer: {
                    discountPercent: 0,
                    startDate: null,
                    endDate: null
                }
            }
        },

        /* ======================================
           WAXING — LADIES
        ====================================== */

        "wax-underarm": {
            name: "Underarm — Hot Wax",
            price: 18,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "wax-half-arm": {
            name: "Half Arm — Strip Wax",
            price: 25,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "wax-full-arm": {
            name: "Full Arm — Strip Wax",
            price: 33.25,
            from: true,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "wax-bikini-line": {
            name: "Bikini Line — Hot Wax",
            price: 25,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "wax-thong-bikini": {
            name: "Thong Bikini — Hot Wax",
            price: 30,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "wax-brazilian": {
            name: "Brazilian — Hot Wax",
            price: 45,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "wax-hollywood": {
            name: "Hollywood — Hot Wax",
            price: 45,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "wax-buttocks": {
            name: "Buttocks — Strip Wax",
            price: 20,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "wax-half-leg": {
            name: "Half Leg — Strip Wax",
            price: 28,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        "wax-full-leg": {
            name: "Full Leg — Strip Wax",
            price: 45,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        },

        /* ======================================
           WAXING — MEN
        ====================================== */

        "wax-back-shoulders": {
            name: "Full Back & Shoulders",
            price: 50,
            offer: {
                discountPercent: 0,
                startDate: null,
                endDate: null
            }
        }

    }
};