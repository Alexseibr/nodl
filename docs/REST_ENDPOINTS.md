# NODL REST endpoints map (skeleton)

```
# AUTH / SESSION
POST   /api/auth/telegram/init           - init Telegram auth, issue nonce/deeplink
POST   /api/auth/telegram/callback       - finalize auth, create Session
POST   /api/auth/phone/request-code      - request SMS/phone code
POST   /api/auth/phone/verify            - verify phone, create Session
GET    /api/auth/me                      - current user profile
POST   /api/auth/logout                  - revoke session

# USERS
GET    /api/users/me                     - get own profile
PATCH  /api/users/me                     - update own profile (language, geo, etc.)
GET    /api/users/:id                    - public profile (rating, stats)

# STORES (фермеры, строители, магазины)
GET    /api/stores                       - list stores with filters (type, geo, categories)
POST   /api/stores                       - create store (farmer/builder/store/brigade)
GET    /api/stores/:id                   - store details
PATCH  /api/stores/:id                   - update store
DELETE /api/stores/:id                   - deactivate store

# ADS
GET    /api/ads                          - search ads (text, category, geo, price)
POST   /api/ads                          - create ad
GET    /api/ads/:id                      - ad details
PATCH  /api/ads/:id                      - update ad
DELETE /api/ads/:id                      - delete/deactivate ad

POST   /api/ads/:id/view                 - register view (+ heatmap event)
POST   /api/ads/:id/favorite             - add to favorites
DELETE /api/ads/:id/favorite             - remove from favorites

POST   /api/ads/:id/bump                 - paid bump
POST   /api/ads/:id/highlight            - paid highlight

# TENDERS
GET    /api/tenders                      - list/search tenders
POST   /api/tenders                      - create tender
GET    /api/tenders/:id                  - tender details
PATCH  /api/tenders/:id                  - update tender
POST   /api/tenders/:id/close            - close tender

# TENDER RESPONSES
GET    /api/tenders/:id/responses        - list responses to tender
POST   /api/tenders/:id/responses        - create response
PATCH  /api/tender-responses/:id         - update status (shortlisted/selected/rejected)

# SUBSCRIPTIONS
GET    /api/subscriptions/plans          - list available plans (by country)
POST   /api/subscriptions                - start/upgrade subscription
GET    /api/subscriptions/me             - my subscriptions (user + stores)
POST   /api/subscriptions/:id/cancel     - cancel/disable autoRenew

# PAYMENTS
POST   /api/payments/create              - create payment intent (for bump/highlight/plan)
GET    /api/payments/:id                 - payment status

# REVIEWS
GET    /api/reviews                      - list reviews by target
POST   /api/reviews                      - create review
DELETE /api/reviews/:id                  - delete own review

# REPORTS (жалобы)
POST   /api/reports                      - create report (ad/user/store/tender)
GET    /api/reports                      - (admin) list reports
PATCH  /api/reports/:id                  - (moderator) resolve report

# GEO
GET    /api/geo/countries                - list countries
GET    /api/geo/regions                  - list regions by country
GET    /api/geo/cities                   - list cities (by country/region, search)
GET    /api/geo/cities/:id               - city details

# ANALYTICS / HEATMAP
GET    /api/analytics/ads/:id/heatmap    - heatmap for single ad (for продавец)
GET    /api/analytics/stores/:id/heatmap - aggregated heatmap by store
```
