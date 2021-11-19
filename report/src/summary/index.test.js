const { computeSummary } = require("./index");



test("should compute summary for some URL report", () => {
  // @ts-ignore
  expect(computeSummary(urlReport)).toMatchSnapshot();
});

// extracted from report.json
const urlReport = {
    "url": "https://www.fabrique.social.gouv.fr",
    "declaration-a11y": {
      "declaration": "Accessibilité : partiellement conforme",
    },
    "404": [
      {
        "url": {
          "protocol": "https:",
          "slashes": true,
          "auth": null,
          "host": "www.fabrique.social.gouv.fr",
          "port": null,
          "hostname": "www.fabrique.social.gouv.fr",
          "hash": null,
          "search": null,
          "query": null,
          "pathname": "/startups/code-du-travail-numerique/kickoff/genese",
          "path": "/startups/code-du-travail-numerique/kickoff/genese",
          "href": "https://www.fabrique.social.gouv.fr/startups/code-du-travail-numerique/kickoff/genese"
        },
        "link": "https://www.fabrique.social.gouv.fr/startups/code-du-travail-numerique/kickoff/genese",
        "line": "https://www.fabrique.social.gouv.fr/startups/code-du-travail-numerique/kickoff/genese",
        "broken": true
      },
      {
        "url": {
          "protocol": "https:",
          "slashes": true,
          "auth": null,
          "host": "www.fabrique.social.gouv.fr",
          "port": null,
          "hostname": "www.fabrique.social.gouv.fr",
          "hash": null,
          "search": null,
          "query": null,
          "pathname": "/faq/beta.gouv.fr",
          "path": "/faq/beta.gouv.fr",
          "href": "https://www.fabrique.social.gouv.fr/faq/beta.gouv.fr"
        },
        "link": "https://www.fabrique.social.gouv.fr/faq/beta.gouv.fr",
        "line": "https://www.fabrique.social.gouv.fr/faq/beta.gouv.fr",
        "broken": true
      },
      {
        "url": {
          "protocol": "https:",
          "slashes": true,
          "auth": null,
          "host": "www.fabrique.social.gouv.fr",
          "port": null,
          "hostname": "www.fabrique.social.gouv.fr",
          "hash": null,
          "search": null,
          "query": null,
          "pathname": "/feed.xml",
          "path": "/feed.xml",
          "href": "https://www.fabrique.social.gouv.fr/feed.xml"
        },
        "link": "https://www.fabrique.social.gouv.fr/feed.xml",
        "line": "https://www.fabrique.social.gouv.fr/feed.xml",
        "broken": true
      },
      {
        "url": {
          "protocol": "https:",
          "slashes": true,
          "auth": null,
          "host": "www.fabrique.social.gouv.fr",
          "port": null,
          "hostname": "www.fabrique.social.gouv.fr",
          "hash": null,
          "search": null,
          "query": null,
          "pathname": "/startups/code-du-travail-numerique/sdr",
          "path": "/startups/code-du-travail-numerique/sdr",
          "href": "https://www.fabrique.social.gouv.fr/startups/code-du-travail-numerique/sdr"
        },
        "link": "https://www.fabrique.social.gouv.fr/startups/code-du-travail-numerique/sdr",
        "line": "https://www.fabrique.social.gouv.fr/startups/code-du-travail-numerique/sdr",
        "broken": true
      },
      {
        "url": {
          "protocol": "https:",
          "slashes": true,
          "auth": null,
          "host": "www.fabrique.social.gouv.fr",
          "port": null,
          "hostname": "www.fabrique.social.gouv.fr",
          "hash": null,
          "search": null,
          "query": null,
          "pathname": "/startups/ramses/",
          "path": "/startups/ramses/",
          "href": "https://www.fabrique.social.gouv.fr/startups/ramses/"
        },
        "link": "https://www.fabrique.social.gouv.fr/startups/ramses/",
        "line": "https://www.fabrique.social.gouv.fr/startups/ramses/",
        "broken": true
      }
    ],
    "http": {
      "url": "https://www.fabrique.social.gouv.fr",
      "algorithm_version": 2,
      "end_time": "Fri, 03 Sep 2021 22:40:01 GMT",
      "grade": "A+",
      "hidden": false,
      "likelihood_indicator": "LOW",
      "response_headers": {
        "Connection": "keep-alive",
        "Content-Encoding": "gzip",
        "Content-Security-Policy": "default-src 'none'; connect-src 'self' https://*.gouv.fr; font-src 'self'; img-src 'self'; prefetch-src 'self' https://*.gouv.fr; script-src 'self' https://*.gouv.fr; frame-src 'self' https://*.gouv.fr; style-src 'self' 'unsafe-inline'",
        "Content-Type": "text/html",
        "Date": "Fri, 03 Sep 2021 22:39:59 GMT",
        "ETag": "W/\"6130da08-6cd4\"",
        "Last-Modified": "Thu, 02 Sep 2021 14:04:56 GMT",
        "Server": "nginx/1.17.8",
        "Strict-Transport-Security": "max-age=15724800; includeSubDomains",
        "Transfer-Encoding": "chunked",
        "Vary": "Accept-Encoding",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "deny",
        "X-XSS-Protection": "1; mode=block"
      },
      "scan_id": 21299354,
      "score": 100,
      "start_time": "Fri, 03 Sep 2021 22:39:56 GMT",
      "state": "FINISHED",
      "status_code": 200,
      "tests_failed": 0,
      "tests_passed": 12,
      "tests_quantity": 12,
      "details": {
        "content-security-policy": {
          "expectation": "csp-implemented-with-no-unsafe",
          "name": "content-security-policy",
          "output": {
            "data": {
              "connect-src": [
                "https://*.gouv.fr",
                "'self'"
              ],
              "default-src": [
                "'none'"
              ],
              "font-src": [
                "'self'"
              ],
              "frame-src": [
                "https://*.gouv.fr",
                "'self'"
              ],
              "img-src": [
                "'self'"
              ],
              "prefetch-src": [
                "https://*.gouv.fr",
                "'self'"
              ],
              "script-src": [
                "https://*.gouv.fr",
                "'self'"
              ],
              "style-src": [
                "'unsafe-inline'",
                "'self'"
              ]
            },
            "http": true,
            "meta": false,
            "policy": {
              "antiClickjacking": false,
              "defaultNone": true,
              "insecureBaseUri": true,
              "insecureFormAction": true,
              "insecureSchemeActive": false,
              "insecureSchemePassive": false,
              "strictDynamic": false,
              "unsafeEval": false,
              "unsafeInline": false,
              "unsafeInlineStyle": true,
              "unsafeObjects": false
            }
          },
          "pass": true,
          "result": "csp-implemented-with-unsafe-inline-in-style-src-only",
          "score_description": "Content Security Policy (CSP) implemented with unsafe sources inside style-src. This includes 'unsafe-inline', data: or overly broad sources such as https:.",
          "score_modifier": 0
        },
        "contribute": {
          "expectation": "contribute-json-only-required-on-mozilla-properties",
          "name": "contribute",
          "output": {
            "data": null
          },
          "pass": true,
          "result": "contribute-json-only-required-on-mozilla-properties",
          "score_description": "Contribute.json isn't required on websites that don't belong to Mozilla",
          "score_modifier": 0
        },
        "cookies": {
          "expectation": "cookies-secure-with-httponly-sessions",
          "name": "cookies",
          "output": {
            "data": null,
            "sameSite": null
          },
          "pass": true,
          "result": "cookies-not-found",
          "score_description": "No cookies detected",
          "score_modifier": 0
        },
        "cross-origin-resource-sharing": {
          "expectation": "cross-origin-resource-sharing-not-implemented",
          "name": "cross-origin-resource-sharing",
          "output": {
            "data": {
              "acao": null,
              "clientaccesspolicy": null,
              "crossdomain": null
            }
          },
          "pass": true,
          "result": "cross-origin-resource-sharing-not-implemented",
          "score_description": "Content is not visible via cross-origin resource sharing (CORS) files or headers",
          "score_modifier": 0
        },
        "public-key-pinning": {
          "expectation": "hpkp-not-implemented",
          "name": "public-key-pinning",
          "output": {
            "data": null,
            "includeSubDomains": false,
            "max-age": null,
            "numPins": null,
            "preloaded": false
          },
          "pass": true,
          "result": "hpkp-not-implemented",
          "score_description": "HTTP Public Key Pinning (HPKP) header not implemented",
          "score_modifier": 0
        },
        "redirection": {
          "expectation": "redirection-to-https",
          "name": "redirection",
          "output": {
            "destination": "https://www.fabrique.social.gouv.fr/",
            "redirects": true,
            "route": [
              "http://www.fabrique.social.gouv.fr/",
              "https://www.fabrique.social.gouv.fr/"
            ],
            "status_code": 200
          },
          "pass": true,
          "result": "redirection-to-https",
          "score_description": "Initial redirection is to HTTPS on same host, final destination is HTTPS",
          "score_modifier": 0
        },
        "referrer-policy": {
          "expectation": "referrer-policy-private",
          "name": "referrer-policy",
          "output": {
            "data": null,
            "http": false,
            "meta": false
          },
          "pass": true,
          "result": "referrer-policy-not-implemented",
          "score_description": "Referrer-Policy header not implemented",
          "score_modifier": 0
        },
        "strict-transport-security": {
          "expectation": "hsts-implemented-max-age-at-least-six-months",
          "name": "strict-transport-security",
          "output": {
            "data": "max-age=15724800; includeSubDomains",
            "includeSubDomains": true,
            "max-age": 15724800,
            "preload": false,
            "preloaded": false
          },
          "pass": true,
          "result": "hsts-implemented-max-age-at-least-six-months",
          "score_description": "HTTP Strict Transport Security (HSTS) header set to a minimum of six months (15768000)",
          "score_modifier": 0
        },
        "subresource-integrity": {
          "expectation": "sri-implemented-and-external-scripts-loaded-securely",
          "name": "subresource-integrity",
          "output": {
            "data": {}
          },
          "pass": true,
          "result": "sri-not-implemented-but-all-scripts-loaded-from-secure-origin",
          "score_description": "Subresource Integrity (SRI) not implemented, but all scripts are loaded from a similar origin",
          "score_modifier": 0
        },
        "x-content-type-options": {
          "expectation": "x-content-type-options-nosniff",
          "name": "x-content-type-options",
          "output": {
            "data": "nosniff"
          },
          "pass": true,
          "result": "x-content-type-options-nosniff",
          "score_description": "X-Content-Type-Options header set to \"nosniff\"",
          "score_modifier": 0
        },
        "x-frame-options": {
          "expectation": "x-frame-options-sameorigin-or-deny",
          "name": "x-frame-options",
          "output": {
            "data": "deny"
          },
          "pass": true,
          "result": "x-frame-options-sameorigin-or-deny",
          "score_description": "X-Frame-Options (XFO) header set to SAMEORIGIN or DENY",
          "score_modifier": 0
        },
        "x-xss-protection": {
          "expectation": "x-xss-protection-1-mode-block",
          "name": "x-xss-protection",
          "output": {
            "data": "1; mode=block"
          },
          "pass": true,
          "result": "x-xss-protection-enabled-mode-block",
          "score_description": "X-XSS-Protection header set to \"1; mode=block\"",
          "score_modifier": 0
        }
      }
    },
    "updownio": {
      "token": "rt57",
      "url": "https://www.fabrique.social.gouv.fr",
      "alias": "",
      "last_status": 200,
      "uptime": 99.909,
      "down": false,
      "down_since": null,
      "error": null,
      "period": 60,
      "apdex_t": 0.5,
      "string_match": "",
      "enabled": true,
      "published": true,
      "disabled_locations": [
        "lan",
        "mia",
        "bhs",
        "sin",
        "tok",
        "syd"
      ],
      "last_check_at": "2021-09-03T23:56:41Z",
      "next_check_at": "2021-09-03T23:57:40Z",
      "mute_until": null,
      "favicon_url": "https://www.fabrique.social.gouv.fr/images/favicons/favicon-16x16.png",
      "custom_headers": {},
      "http_verb": "GET/HEAD",
      "http_body": "",
      "ssl": {
        "tested_at": "2021-09-03T23:52:42Z",
        "expires_at": "2021-11-30T20:40:24Z",
        "valid": true,
        "error": null
      },
      "metrics": {
        "apdex": 1,
        "timings": {
          "redirect": 0,
          "namelookup": 20,
          "connection": 14,
          "handshake": 39,
          "response": 19,
          "total": 92
        }
      },
      "uptimeGrade": "A",
      "apdexGrade": "A"
    },
    "nmap": null,
    "dependabot": {
      "totalCount": 4,
      "grade": "D",
      "repositories": [
        {
          "url": "https://github.com/SocialGouv/www",
          "vulnerabilityAlerts": {
            "totalCount": 4,
            "nodes": [
              {
                "dismissedAt": null,
                "createdAt": "2020-12-28T00:59:49Z",
                "securityVulnerability": {
                  "severity": "LOW",
                  "package": {
                    "name": "node-fetch"
                  },
                  "advisory": {
                    "identifiers": [
                      {
                        "type": "GHSA",
                        "value": "GHSA-w7rc-rwvf-8q5r"
                      },
                      {
                        "type": "CVE",
                        "value": "CVE-2020-15168"
                      }
                    ],
                    "references": [
                      {
                        "url": "https://github.com/node-fetch/node-fetch/security/advisories/GHSA-w7rc-rwvf-8q5r"
                      },
                      {
                        "url": "https://nvd.nist.gov/vuln/detail/CVE-2020-15168"
                      },
                      {
                        "url": "https://github.com/advisories/GHSA-w7rc-rwvf-8q5r"
                      }
                    ]
                  }
                }
              },
              {
                "dismissedAt": null,
                "createdAt": "2021-05-10T19:22:41Z",
                "securityVulnerability": {
                  "severity": "HIGH",
                  "package": {
                    "name": "trim"
                  },
                  "advisory": {
                    "identifiers": [
                      {
                        "type": "GHSA",
                        "value": "GHSA-w5p7-h5w8-2hfq"
                      },
                      {
                        "type": "CVE",
                        "value": "CVE-2020-7753"
                      }
                    ],
                    "references": [
                      {
                        "url": "https://nvd.nist.gov/vuln/detail/CVE-2020-7753"
                      },
                      {
                        "url": "https://github.com/advisories/GHSA-w5p7-h5w8-2hfq"
                      }
                    ]
                  }
                }
              },
              {
                "dismissedAt": null,
                "createdAt": "2021-08-23T15:57:23Z",
                "securityVulnerability": {
                  "severity": "MODERATE",
                  "package": {
                    "name": "next"
                  },
                  "advisory": {
                    "identifiers": [
                      {
                        "type": "GHSA",
                        "value": "GHSA-vxf5-wxwp-m7g9"
                      },
                      {
                        "type": "CVE",
                        "value": "CVE-2021-37699"
                      }
                    ],
                    "references": [
                      {
                        "url": "https://github.com/vercel/next.js/security/advisories/GHSA-vxf5-wxwp-m7g9"
                      },
                      {
                        "url": "https://nvd.nist.gov/vuln/detail/CVE-2021-37699"
                      },
                      {
                        "url": "https://github.com/advisories/GHSA-vxf5-wxwp-m7g9"
                      }
                    ]
                  }
                }
              },
              {
                "dismissedAt": null,
                "createdAt": "2021-09-01T18:27:57Z",
                "securityVulnerability": {
                  "severity": "HIGH",
                  "package": {
                    "name": "next"
                  },
                  "advisory": {
                    "identifiers": [
                      {
                        "type": "GHSA",
                        "value": "GHSA-9gr3-7897-pp7m"
                      },
                      {
                        "type": "CVE",
                        "value": "CVE-2021-39178"
                      }
                    ],
                    "references": [
                      {
                        "url": "https://github.com/vercel/next.js/security/advisories/GHSA-9gr3-7897-pp7m"
                      },
                      {
                        "url": "https://nvd.nist.gov/vuln/detail/CVE-2021-39178"
                      },
                      {
                        "url": "https://github.com/advisories/GHSA-9gr3-7897-pp7m"
                      }
                    ]
                  }
                }
              }
            ]
          },
          "grade": "D"
        }
      ]
    },
    "codescan": {
      "totalCount": 0,
      "grade": "A",
      "repositories": [
        {
          "url": "https://github.com/socialgouv/www",
          "grade": "A",
          "alerts": []
        }
      ]
    },
    "testssl": [
      {
        "id": "service",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "HTTP"
      },
      {
        "id": "pre_128cipher",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "No 128 cipher limit bug"
      },
      {
        "id": "SSLv2",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "not offered"
      },
      {
        "id": "SSLv3",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "not offered"
      },
      {
        "id": "TLS1",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "not offered"
      },
      {
        "id": "TLS1_1",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "not offered"
      },
      {
        "id": "TLS1_2",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "offered"
      },
      {
        "id": "TLS1_3",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "not offered + downgraded to weaker protocol"
      },
      {
        "id": "ALPN_HTTP2",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "h2"
      },
      {
        "id": "ALPN",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "http/1.1"
      },
      {
        "id": "cipherlist_NULL",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cwe": "CWE-327",
        "finding": "not offered"
      },
      {
        "id": "cipherlist_aNULL",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cwe": "CWE-327",
        "finding": "not offered"
      },
      {
        "id": "cipherlist_EXPORT",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cwe": "CWE-327",
        "finding": "not offered"
      },
      {
        "id": "cipherlist_LOW",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cwe": "CWE-327",
        "finding": "not offered"
      },
      {
        "id": "cipherlist_3DES_IDEA",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "cwe": "CWE-310",
        "finding": "not offered"
      },
      {
        "id": "cipherlist_AVERAGE",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "cwe": "CWE-310",
        "finding": "not offered"
      },
      {
        "id": "cipherlist_GOOD",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "not offered"
      },
      {
        "id": "cipherlist_STRONG",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "offered"
      },
      {
        "id": "cipher_order",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "server"
      },
      {
        "id": "protocol_negotiated",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "Default protocol TLS1.2"
      },
      {
        "id": "cipher_negotiated",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "ECDHE-RSA-AES128-GCM-SHA256, 256 bit ECDH (P-256)"
      },
      {
        "id": "cipherorder_TLSv1_2",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "FS",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "offered"
      },
      {
        "id": "FS_ciphers",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "ECDHE-RSA-AES128-GCM-SHA256 ECDHE-RSA-AES256-GCM-SHA384"
      },
      {
        "id": "FS_ECDHE_curves",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "prime256v1 secp384r1 secp521r1"
      },
      {
        "id": "TLS_extensions",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "'renegotiation info/#65281' 'server name/#0' 'EC point formats/#11' 'session ticket/#35' 'next protocol/#13172' 'max fragment length/#1' 'application layer protocol negotiation/#16' 'extended master secret/#23'"
      },
      {
        "id": "TLS_session_ticket",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "valid for 600 seconds only (<daily)"
      },
      {
        "id": "SSL_sessionID_support",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "yes"
      },
      {
        "id": "sessionresumption_ticket",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "not supported"
      },
      {
        "id": "sessionresumption_ID",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "not supported"
      },
      {
        "id": "TLS_timestamp",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "random"
      },
      {
        "id": "cert_compression",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "N/A"
      },
      {
        "id": "clientAuth",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "none"
      },
      {
        "id": "cert_numbers",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "1"
      },
      {
        "id": "cert_signatureAlgorithm",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "SHA256 with RSA"
      },
      {
        "id": "cert_keySize",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "RSA 2048 bits (exponent is 65537)"
      },
      {
        "id": "cert_keyUsage",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "Digital Signature, Key Encipherment"
      },
      {
        "id": "cert_extKeyUsage",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLS Web Server Authentication, TLS Web Client Authentication"
      },
      {
        "id": "cert_serialNumber",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "037287C17F9E513C8881E8AC25393BB2F3BF"
      },
      {
        "id": "cert_fingerprintSHA1",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "E4E7C26BB008990407C7BEE00AE4A1BC8B803B66"
      },
      {
        "id": "cert_fingerprintSHA256",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "F882D3AFD97B9346B3C17D8B8A0A5FF6D49A198B92C15FFFA4E094072641C570"
      },
      {
        "id": "cert",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "-----BEGIN CERTIFICATE----- MIIFPjCCBCagAwIBAgISA3KHwX+eUTyIgeisJTk7svO/MA0GCSqGSIb3DQEBCwUA MDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD EwJSMzAeFw0yMTA5MDEyMDQwMjVaFw0yMTExMzAyMDQwMjRaMCYxJDAiBgNVBAMT G3d3dy5mYWJyaXF1ZS5zb2NpYWwuZ291di5mcjCCASIwDQYJKoZIhvcNAQEBBQAD ggEPADCCAQoCggEBANcGK1O7EUiWsO1gqdg0BtTiohfMlBQrD++3YMEy5QPT7a3z Aj59lon4ykpt0hPS32VaegFIenp+fJT9+E6hwQ+dxRlvtwngpmVwmPfHjLiZX2Xj WP8Qh92aO+A/tRy8mqIwP7P8HE4mCztSWMAAwXadF9sd1dXbE6KqPAio4nh1WqKQ IKGApL6f6trwo9wqw8eiOesEjKsyweQoM9WgCIR69LZVSr0FnikdOeWNQnfn2fYb QY+XeK00E53jAqJEPbzBs0jhmxoABVEeIONlfvJJokUspktaozJrvNVhDtNrrEHM uoP4/IMpWWAoHxKqmMz4TWRNJmQ+g1HpYmwBFTMCAwEAAaOCAlgwggJUMA4GA1Ud DwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDAYDVR0T AQH/BAIwADAdBgNVHQ4EFgQUIVpPKtvcK2w3zLWsH9RYd5nmUCkwHwYDVR0jBBgw FoAUFC6zF7dYVsuuUAlA5h+vnYsUwsYwVQYIKwYBBQUHAQEESTBHMCEGCCsGAQUF BzABhhVodHRwOi8vcjMuby5sZW5jci5vcmcwIgYIKwYBBQUHMAKGFmh0dHA6Ly9y My5pLmxlbmNyLm9yZy8wJgYDVR0RBB8wHYIbd3d3LmZhYnJpcXVlLnNvY2lhbC5n b3V2LmZyMEwGA1UdIARFMEMwCAYGZ4EMAQIBMDcGCysGAQQBgt8TAQEBMCgwJgYI KwYBBQUHAgEWGmh0dHA6Ly9jcHMubGV0c2VuY3J5cHQub3JnMIIBBgYKKwYBBAHW eQIEAgSB9wSB9ADyAHcAXNxDkv7mq0VEsV6a1FbmEDf71fpH3KFzlLJe5vbHDsoA AAF7o05VmwAABAMASDBGAiEA529+mbo9CUjbColpNrC+0ncyLEvqAbM5EHN3HNjL tpoCIQDxeE8EvOOI80QjqzbIusijNRY9rC95x/gh+6M6ydmwggB3AH0+8viP/4hV aCTCwMqeUol5K8UOeAl/LmqXaJl+IvDXAAABe6NOVdEAAAQDAEgwRgIhAJ73J56j 2ubfH3XNATQkEhDh9C59+ITaKcP8DSuvQstkAiEAusSM1yqZAbsZm12b5R5+Ojha h+cglMxdTTl62nOXhI4wDQYJKoZIhvcNAQELBQADggEBAIvO8gBeHCS0t8hrZoXg vN7xZWutJqmOKoNXDBGUEXITdYdfmB3kseTIdk86UEOS1rmRno7+8S+LFG/1kraP tfXi9dgBckpilelLDlCInTRJGb6hu5NADpAl7qXJD3R5x+fRdp8Dghl0+LjnuBs6 r2DMOsyI8gzyWC+HNVeCoiaxOco0kRIBJTGZ0JDHBeX/eI8uST/PqZ2vcyZxucMz AuBqDn7sKt7d3NTopbWeI2p9AOsLwWCrj+wZp+52wqFLC1xMzTo7V/lL+imc92mF amnnfXaWCyXgLkyR5N139Iip+83pJQ0YimyZOZp2toXlEo8gifNdcoUOA4+YpWki 3DM= -----END CERTIFICATE-----"
      },
      {
        "id": "cert_commonName",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "www.fabrique.social.gouv.fr"
      },
      {
        "id": "cert_commonName_wo_SNI",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "Kubernetes Ingress Controller Fake Certificate"
      },
      {
        "id": "cert_subjectAltName",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "www.fabrique.social.gouv.fr"
      },
      {
        "id": "cert_trust",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "Ok via SAN and CN (SNI mandatory)"
      },
      {
        "id": "cert_chain_of_trust",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "passed."
      },
      {
        "id": "cert_certificatePolicies_EV",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "no"
      },
      {
        "id": "cert_expirationStatus",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "87 >= 30 days"
      },
      {
        "id": "cert_notBefore",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "2021-09-01 20:40"
      },
      {
        "id": "cert_notAfter",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "2021-11-30 20:40"
      },
      {
        "id": "cert_extlifeSpan",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "certificate has no extended life time according to browser forum"
      },
      {
        "id": "cert_eTLS",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "not present"
      },
      {
        "id": "cert_crlDistributionPoints",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "--"
      },
      {
        "id": "cert_ocspURL",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "http://r3.o.lencr.org"
      },
      {
        "id": "OCSP_stapling",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "LOW",
        "finding": "not offered"
      },
      {
        "id": "cert_mustStapleExtension",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "--"
      },
      {
        "id": "DNS_CAArecord",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "LOW",
        "finding": "--"
      },
      {
        "id": "certificate_transparency",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "yes (certificate extension)"
      },
      {
        "id": "certs_countServer",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "3"
      },
      {
        "id": "certs_list_ordering_problem",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "no"
      },
      {
        "id": "cert_caIssuers",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "R3 (Let's Encrypt from US)"
      },
      {
        "id": "intermediate_cert <#1>",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "-----BEGIN CERTIFICATE----- MIIFFjCCAv6gAwIBAgIRAJErCErPDBinU/bWLiWnX1owDQYJKoZIhvcNAQELBQAw TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMjAwOTA0MDAwMDAw WhcNMjUwOTE1MTYwMDAwWjAyMQswCQYDVQQGEwJVUzEWMBQGA1UEChMNTGV0J3Mg RW5jcnlwdDELMAkGA1UEAxMCUjMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK AoIBAQC7AhUozPaglNMPEuyNVZLD+ILxmaZ6QoinXSaqtSu5xUyxr45r+XXIo9cP R5QUVTVXjJ6oojkZ9YI8QqlObvU7wy7bjcCwXPNZOOftz2nwWgsbvsCUJCWH+jdx sxPnHKzhm+/b5DtFUkWWqcFTzjTIUu61ru2P3mBw4qVUq7ZtDpelQDRrK9O8Zutm NHz6a4uPVymZ+DAXXbpyb/uBxa3Shlg9F8fnCbvxK/eG3MHacV3URuPMrSXBiLxg Z3Vms/EY96Jc5lP/Ooi2R6X/ExjqmAl3P51T+c8B5fWmcBcUr2Ok/5mzk53cU6cG /kiFHaFpriV1uxPMUgP17VGhi9sVAgMBAAGjggEIMIIBBDAOBgNVHQ8BAf8EBAMC AYYwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUFBwMBMBIGA1UdEwEB/wQIMAYB Af8CAQAwHQYDVR0OBBYEFBQusxe3WFbLrlAJQOYfr52LFMLGMB8GA1UdIwQYMBaA FHm0WeZ7tuXkAXOACIjIGlj26ZtuMDIGCCsGAQUFBwEBBCYwJDAiBggrBgEFBQcw AoYWaHR0cDovL3gxLmkubGVuY3Iub3JnLzAnBgNVHR8EIDAeMBygGqAYhhZodHRw Oi8veDEuYy5sZW5jci5vcmcvMCIGA1UdIAQbMBkwCAYGZ4EMAQIBMA0GCysGAQQB gt8TAQEBMA0GCSqGSIb3DQEBCwUAA4ICAQCFyk5HPqP3hUSFvNVneLKYY611TR6W PTNlclQtgaDqw+34IL9fzLdwALduO/ZelN7kIJ+m74uyA+eitRY8kc607TkC53wl ikfmZW4/RvTZ8M6UK+5UzhK8jCdLuMGYL6KvzXGRSgi3yLgjewQtCPkIVz6D2QQz CkcheAmCJ8MqyJu5zlzyZMjAvnnAT45tRAxekrsu94sQ4egdRCnbWSDtY7kh+BIm lJNXoB1lBMEKIq4QDUOXoRgffuDghje1WrG9ML+Hbisq/yFOGwXD9RiX8F6sw6W4 avAuvDszue5L3sz85K+EC4Y/wFVDNvZo4TYXao6Z0f+lQKc0t8DQYzk1OXVu8rp2 yJMC6alLbBfODALZvYH7n7do1AZls4I9d1P4jnkDrQoxB3UqQ9hVl3LEKQ73xF1O yK5GhDDX8oVfGKF5u+decIsH4YaTw7mP3GFxJSqv3+0lUFJoi5Lc5da149p90Ids hCExroL1+7mryIkXPeFM5TgO9r0rvZaBFOvV2z0gp35Z0+L4WPlbuEjN/lxPFin+ HlUjr8gRsI3qfJOQFy/9rKIJR0Y/8Omwt/8oTWgy1mdeHmmjk7j1nYsvC9JSQ6Zv MldlTTKB3zhThV1+XWYp6rjd5JW1zbVWEkLNxE7GJThEUG3szgBVGP7pSWTUTsqX nLRbwHOoq7hHwg== -----END CERTIFICATE-----"
      },
      {
        "id": "intermediate_cert_fingerprintSHA256 <#1>",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "67ADD1166B020AE61B8F5FC96813C04C2AA589960796865572A3C7E737613DFD"
      },
      {
        "id": "intermediate_cert_notBefore <#1>",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "2020-09-04 00:00"
      },
      {
        "id": "intermediate_cert_notAfter <#1>",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "2025-09-15 16:00"
      },
      {
        "id": "intermediate_cert_expiration <#1>",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "ok > 40 days"
      },
      {
        "id": "intermediate_cert_chain <#1>",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "R3 <-- ISRG Root X1"
      },
      {
        "id": "intermediate_cert <#2>",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "-----BEGIN CERTIFICATE----- MIIFYDCCBEigAwIBAgIQQAF3ITfU6UK47naqPGQKtzANBgkqhkiG9w0BAQsFADA/ MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT DkRTVCBSb290IENBIFgzMB4XDTIxMDEyMDE5MTQwM1oXDTI0MDkzMDE4MTQwM1ow TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwggIiMA0GCSqGSIb3DQEB AQUAA4ICDwAwggIKAoICAQCt6CRz9BQ385ueK1coHIe+3LffOJCMbjzmV6B493XC ov71am72AE8o295ohmxEk7axY/0UEmu/H9LqMZshftEzPLpI9d1537O4/xLxIZpL wYqGcWlKZmZsj348cL+tKSIG8+TA5oCu4kuPt5l+lAOf00eXfJlII1PoOK5PCm+D LtFJV4yAdLbaL9A4jXsDcCEbdfIwPPqPrt3aY6vrFk/CjhFLfs8L6P+1dy70sntK 4EwSJQxwjQMpoOFTJOwT2e4ZvxCzSow/iaNhUd6shweU9GNx7C7ib1uYgeGJXDR5 bHbvO5BieebbpJovJsXQEOEO3tkQjhb7t/eo98flAgeYjzYIlefiN5YNNnWe+w5y sR2bvAP5SQXYgd0FtCrWQemsAXaVCg/Y39W9Eh81LygXbNKYwagJZHduRze6zqxZ Xmidf3LWicUGQSk+WT7dJvUkyRGnWqNMQB9GoZm1pzpRboY7nn1ypxIFeFntPlF4 FQsDj43QLwWyPntKHEtzBRL8xurgUBN8Q5N0s8p0544fAQjQMNRbcTa0B7rBMDBc SLeCO5imfWCKoqMpgsy6vYMEG6KDA0Gh1gXxG8K28Kh8hjtGqEgqiNx2mna/H2ql PRmP6zjzZN7IKw0KKP/32+IVQtQi0Cdd4Xn+GOdwiK1O5tmLOsbdJ1Fu/7xk9TND TwIDAQABo4IBRjCCAUIwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAQYw SwYIKwYBBQUHAQEEPzA9MDsGCCsGAQUFBzAChi9odHRwOi8vYXBwcy5pZGVudHJ1 c3QuY29tL3Jvb3RzL2RzdHJvb3RjYXgzLnA3YzAfBgNVHSMEGDAWgBTEp7Gkeyxx +tvhS5B1/8QVYIWJEDBUBgNVHSAETTBLMAgGBmeBDAECATA/BgsrBgEEAYLfEwEB ATAwMC4GCCsGAQUFBwIBFiJodHRwOi8vY3BzLnJvb3QteDEubGV0c2VuY3J5cHQu b3JnMDwGA1UdHwQ1MDMwMaAvoC2GK2h0dHA6Ly9jcmwuaWRlbnRydXN0LmNvbS9E U1RST09UQ0FYM0NSTC5jcmwwHQYDVR0OBBYEFHm0WeZ7tuXkAXOACIjIGlj26Ztu MA0GCSqGSIb3DQEBCwUAA4IBAQAKcwBslm7/DlLQrt2M51oGrS+o44+/yQoDFVDC 5WxCu2+b9LRPwkSICHXM6webFGJueN7sJ7o5XPWioW5WlHAQU7G75K/QosMrAdSW 9MUgNTP52GE24HGNtLi1qoJFlcDyqSMo59ahy2cI2qBDLKobkx/J3vWraV0T9VuG WCLKTVXkcGdtwlfFRjlBz4pYg1htmf5X6DYO8A4jqv2Il9DjXA6USbW1FzXSLr9O he8Y4IWS6wY7bCkjCWDcRQJMEhg76fsO3txE+FiYruq9RUWhiF1myv4Q6W+CyBFC Dfvp7OOGAN6dEOM4+qR9sdjoSYKEBpsr6GtPAQw4dy753ec5 -----END CERTIFICATE-----"
      },
      {
        "id": "intermediate_cert_fingerprintSHA256 <#2>",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "6D99FB265EB1C5B3744765FCBC648F3CD8E1BFFAFDC4C2F99B9D47CF7FF1C24F"
      },
      {
        "id": "intermediate_cert_notBefore <#2>",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "2021-01-20 19:14"
      },
      {
        "id": "intermediate_cert_notAfter <#2>",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "2024-09-30 18:14"
      },
      {
        "id": "intermediate_cert_expiration <#2>",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "ok > 40 days"
      },
      {
        "id": "intermediate_cert_chain <#2>",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "ISRG Root X1 <-- DST Root CA X3"
      },
      {
        "id": "intermediate_cert_badOCSP",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "intermediate certificate(s) is/are ok"
      },
      {
        "id": "HTTP_status_code",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "200 OK ('/')"
      },
      {
        "id": "HTTP_clock_skew",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "0 seconds from localtime"
      },
      {
        "id": "HSTS_time",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "182 days (=15724800 seconds) > 15552000 seconds"
      },
      {
        "id": "HSTS_subdomains",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "includes subdomains"
      },
      {
        "id": "HSTS_preload",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "domain is NOT marked for preloading"
      },
      {
        "id": "HPKP",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "No support for HTTP Public Key Pinning"
      },
      {
        "id": "banner_server",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "nginx/1.17.8"
      },
      {
        "id": "banner_application",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "No application banner found"
      },
      {
        "id": "cookie_count",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "0 at '/'"
      },
      {
        "id": "X-Frame-Options",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "deny"
      },
      {
        "id": "X-Content-Type-Options",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "nosniff"
      },
      {
        "id": "Content-Security-Policy",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "default-src 'none'; connect-src 'self' https://*.gouv.fr; font-src 'self'; img-src 'self'; prefetch-src 'self' https://*.gouv.fr; script-src 'self' https://*.gouv.fr; frame-src 'self' https://*.gouv.fr; style-src 'self' 'unsafe-inline'"
      },
      {
        "id": "X-XSS-Protection",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "1; mode=block"
      },
      {
        "id": "banner_reverseproxy",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "cwe": "CWE-200",
        "finding": "--"
      },
      {
        "id": "heartbleed",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2014-0160",
        "cwe": "CWE-119",
        "finding": "not vulnerable, no heartbeat extension"
      },
      {
        "id": "CCS",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2014-0224",
        "cwe": "CWE-310",
        "finding": "not vulnerable"
      },
      {
        "id": "ticketbleed",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2016-9244",
        "cwe": "CWE-200",
        "finding": "not vulnerable"
      },
      {
        "id": "ROBOT",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2017-17382 CVE-2017-17427 CVE-2017-17428 CVE-2017-13098 CVE-2017-1000385 CVE-2017-13099 CVE-2016-6883 CVE-2012-5081 CVE-2017-6168",
        "cwe": "CWE-203",
        "finding": "not vulnerable, no RSA key transport cipher"
      },
      {
        "id": "secure_renego",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cwe": "CWE-310",
        "finding": "supported"
      },
      {
        "id": "secure_client_renego",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2011-1473",
        "cwe": "CWE-310",
        "finding": "not vulnerable"
      },
      {
        "id": "CRIME_TLS",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2012-4929",
        "cwe": "CWE-310",
        "finding": "not vulnerable"
      },
      {
        "id": "BREACH",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "MEDIUM",
        "cve": "CVE-2013-3587",
        "cwe": "CWE-310",
        "finding": "potentially VULNERABLE, gzip HTTP compression detected  - only supplied '/' tested"
      },
      {
        "id": "POODLE_SSL",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2014-3566",
        "cwe": "CWE-310",
        "finding": "not vulnerable, no SSLv3"
      },
      {
        "id": "fallback_SCSV",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "no protocol below TLS 1.2 offered"
      },
      {
        "id": "SWEET32",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2016-2183 CVE-2016-6329",
        "cwe": "CWE-327",
        "finding": "not vulnerable"
      },
      {
        "id": "FREAK",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2015-0204",
        "cwe": "CWE-310",
        "finding": "not vulnerable"
      },
      {
        "id": "DROWN",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2016-0800 CVE-2016-0703",
        "cwe": "CWE-310",
        "finding": "not vulnerable on this host and port"
      },
      {
        "id": "DROWN_hint",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "cve": "CVE-2016-0800 CVE-2016-0703",
        "cwe": "CWE-310",
        "finding": "Make sure you don't use this certificate elsewhere with SSLv2 enabled services, see https://censys.io/ipv4?q=F882D3AFD97B9346B3C17D8B8A0A5FF6D49A198B92C15FFFA4E094072641C570"
      },
      {
        "id": "LOGJAM",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2015-4000",
        "cwe": "CWE-310",
        "finding": "not vulnerable, no DH EXPORT ciphers,"
      },
      {
        "id": "LOGJAM-common_primes",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2015-4000",
        "cwe": "CWE-310",
        "finding": "no DH key with <= TLS 1.2"
      },
      {
        "id": "BEAST",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2011-3389",
        "cwe": "CWE-20",
        "finding": "not vulnerable, no SSL3 or TLS1"
      },
      {
        "id": "LUCKY13",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2013-0169",
        "cwe": "CWE-310",
        "finding": "not vulnerable"
      },
      {
        "id": "winshock",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2014-6321",
        "cwe": "CWE-94",
        "finding": "not vulnerable"
      },
      {
        "id": "RC4",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "cve": "CVE-2013-2566 CVE-2015-2808",
        "cwe": "CWE-310",
        "finding": "not vulnerable"
      },
      {
        "id": "clientsimulation-android_442",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-android_500",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-android_60",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-android_70",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-android_81",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-android_90",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-android_X",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-chrome_74_win10",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-chrome_79_win10",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-firefox_66_win81",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-firefox_71_win10",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-ie_6_xp",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "No connection"
      },
      {
        "id": "clientsimulation-ie_8_win7",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "No connection"
      },
      {
        "id": "clientsimulation-ie_8_xp",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "No connection"
      },
      {
        "id": "clientsimulation-ie_11_win7",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "No connection"
      },
      {
        "id": "clientsimulation-ie_11_win81",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "No connection"
      },
      {
        "id": "clientsimulation-ie_11_winphone81",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "No connection"
      },
      {
        "id": "clientsimulation-ie_11_win10",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-edge_15_win10",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-edge_17_win10",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-opera_66_win10",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-safari_9_ios9",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-safari_9_osx1011",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-safari_10_osx1012",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-safari_121_ios_122",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-safari_130_osx_10146",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-apple_ats_9_ios9",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-java_6u45",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "No connection"
      },
      {
        "id": "clientsimulation-java_7u25",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "No connection"
      },
      {
        "id": "clientsimulation-java_8u161",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-java1102",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-java1201",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-openssl_102e",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-openssl_110l",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-openssl_111d",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "clientsimulation-thunderbird_68_3_1",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
      },
      {
        "id": "rating_spec",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "SSL Labs's 'SSL Server Rating Guide' (version 2009q from 2020-01-30)"
      },
      {
        "id": "rating_doc",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide"
      },
      {
        "id": "protocol_support_score",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "100"
      },
      {
        "id": "protocol_support_score_weighted",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "30"
      },
      {
        "id": "key_exchange_score",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "90"
      },
      {
        "id": "key_exchange_score_weighted",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "27"
      },
      {
        "id": "cipher_strength_score",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "60"
      },
      {
        "id": "cipher_strength_score_weighted",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "24"
      },
      {
        "id": "final_score",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "81"
      },
      {
        "id": "overall_grade",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "OK",
        "finding": "A+"
      },
      {
        "id": "scanTime",
        "ip": "www.fabrique.social.gouv.fr/20.74.14.77",
        "port": "443",
        "severity": "INFO",
        "finding": "77"
      }
    ],
    "thirdparties": {
      "trackers": [],
      "cookies": [
        {
          "name": "_pk_ses.2.6321",
          "value": "1",
          "domain": "www.fabrique.social.gouv.fr",
          "path": "/",
          "expires": 1630714984,
          "size": 15,
          "httpOnly": false,
          "secure": false,
          "session": false,
          "sameSite": "Lax",
          "sameParty": false,
          "sourceScheme": "Secure",
          "sourcePort": 443
        },
        {
          "name": "_pk_id.2.6321",
          "value": "4c80f470b3fad38e.1630713184.",
          "domain": "www.fabrique.social.gouv.fr",
          "path": "/",
          "expires": 1664668384,
          "size": 41,
          "httpOnly": false,
          "secure": false,
          "session": false,
          "sameSite": "Lax",
          "sameParty": false,
          "sourceScheme": "Secure",
          "sourcePort": 443
        }
      ],
      "headers": {
        "server": "nginx/1.17.8",
        "date": "Fri, 03 Sep 2021 23:53:03 GMT",
        "content-type": "text/html",
        "last-modified": "Thu, 02 Sep 2021 14:04:56 GMT",
        "vary": "Accept-Encoding",
        "etag": "W/\"6130da08-6cd4\"",
        "x-frame-options": "deny",
        "x-xss-protection": "1; mode=block",
        "x-content-type-options": "nosniff",
        "content-encoding": "gzip",
        "strict-transport-security": "max-age=15724800; includeSubDomains",
        "content-security-policy": "default-src 'none'; connect-src 'self' https://*.gouv.fr; font-src 'self'; img-src 'self'; prefetch-src 'self' https://*.gouv.fr; script-src 'self' https://*.gouv.fr; frame-src 'self' https://*.gouv.fr; style-src 'self' 'unsafe-inline'"
      },
      "endpoints": [
        {
          "hostname": "www.fabrique.social.gouv.fr",
          "ip": "20.74.14.77",
          "geoip": {
            "city": {
              "geoname_id": 2988507,
              "names": {
                "de": "Paris",
                "en": "Paris",
                "es": "París",
                "fr": "Paris",
                "ja": "パリ",
                "pt-BR": "Paris",
                "ru": "Париж",
                "zh-CN": "巴黎"
              }
            },
            "continent": {
              "code": "EU",
              "geoname_id": 6255148,
              "names": {
                "de": "Europa",
                "en": "Europe",
                "es": "Europa",
                "fr": "Europe",
                "ja": "ヨーロッパ",
                "pt-BR": "Europa",
                "ru": "Европа",
                "zh-CN": "欧洲"
              }
            },
            "country": {
              "geoname_id": 3017382,
              "is_in_european_union": true,
              "iso_code": "FR",
              "names": {
                "de": "Frankreich",
                "en": "France",
                "es": "Francia",
                "fr": "France",
                "ja": "フランス共和国",
                "pt-BR": "França",
                "ru": "Франция",
                "zh-CN": "法国"
              }
            },
            "location": {
              "accuracy_radius": 1000,
              "latitude": 48.8607,
              "longitude": 2.3281,
              "time_zone": "Europe/Paris"
            },
            "postal": {
              "code": "75001"
            },
            "registered_country": {
              "geoname_id": 6252001,
              "iso_code": "US",
              "names": {
                "de": "USA",
                "en": "United States",
                "es": "Estados Unidos",
                "fr": "États-Unis",
                "ja": "アメリカ合衆国",
                "pt-BR": "Estados Unidos",
                "ru": "США",
                "zh-CN": "美国"
              }
            },
            "subdivisions": [
              {
                "geoname_id": 3012874,
                "iso_code": "IDF",
                "names": {
                  "de": "Île-de-France",
                  "en": "Île-de-France",
                  "es": "Isla de Francia",
                  "fr": "Île-de-France",
                  "pt-BR": "Ilha de França"
                }
              },
              {
                "geoname_id": 2968815,
                "iso_code": "75",
                "names": {
                  "de": "Paris",
                  "en": "Paris",
                  "es": "Paris",
                  "fr": "Paris"
                }
              }
            ]
          }
        }
      ]
    },
    "wappalyzer": {
      "urls": {
        "https://www.fabrique.social.gouv.fr/": {
          "status": 200
        },
        "https://www.fabrique.social.gouv.fr/actus/": {
          "status": 200
        },
        "https://www.fabrique.social.gouv.fr/members/": {
          "status": 200
        },
        "https://www.fabrique.social.gouv.fr/idees/": {
          "status": 200
        },
        "https://www.fabrique.social.gouv.fr/startups/work-in-france/": {
          "status": 200
        },
        "https://www.fabrique.social.gouv.fr/actus/seminaire-1": {
          "status": 301
        },
        "https://www.fabrique.social.gouv.fr/actus/seminaire-1/": {
          "status": 200
        },
        "https://www.fabrique.social.gouv.fr/startups/code-du-travail-numerique/": {
          "status": 200
        },
        "https://www.fabrique.social.gouv.fr/faq/": {
          "status": 200
        },
        "https://www.fabrique.social.gouv.fr/startups/e-mjpm/": {
          "status": 200
        }
      },
      "technologies": [
        {
          "slug": "node-js",
          "name": "Node.js",
          "confidence": 100,
          "version": null,
          "icon": "node.js.png",
          "website": "http://nodejs.org",
          "cpe": "cpe:/a:nodejs:node.js",
          "categories": [
            {
              "id": 27,
              "slug": "programming-languages",
              "name": "Programming languages"
            }
          ]
        },
        {
          "slug": "azure",
          "name": "Azure",
          "confidence": 100,
          "version": null,
          "icon": "azure.svg",
          "website": "https://azure.microsoft.com",
          "cpe": null,
          "categories": [
            {
              "id": 62,
              "slug": "paas",
              "name": "PaaS"
            }
          ]
        },
        {
          "slug": "next-js",
          "name": "Next.js",
          "confidence": 100,
          "version": null,
          "icon": "vercel.svg",
          "website": "https://nextjs.org",
          "cpe": "cpe:/a:zeit:next.js",
          "categories": [
            {
              "id": 18,
              "slug": "web-frameworks",
              "name": "Web frameworks"
            },
            {
              "id": 22,
              "slug": "web-servers",
              "name": "Web servers"
            }
          ]
        },
        {
          "slug": "styled-components",
          "name": "styled-components",
          "confidence": 100,
          "version": "5.3.1",
          "icon": "styled-components.png",
          "website": "https://styled-components.com",
          "cpe": null,
          "categories": [
            {
              "id": 12,
              "slug": "javascript-frameworks",
              "name": "JavaScript frameworks"
            },
            {
              "id": 47,
              "slug": "development",
              "name": "Development"
            }
          ]
        },
        {
          "slug": "nginx",
          "name": "Nginx",
          "confidence": 100,
          "version": "1.17.8",
          "icon": "Nginx.svg",
          "website": "http://nginx.org/en",
          "cpe": "cpe:/a:nginx:nginx",
          "categories": [
            {
              "id": 22,
              "slug": "web-servers",
              "name": "Web servers"
            },
            {
              "id": 64,
              "slug": "reverse-proxies",
              "name": "Reverse proxies"
            }
          ]
        },
        {
          "slug": "webpack",
          "name": "webpack",
          "confidence": 100,
          "version": null,
          "icon": "webpack.svg",
          "website": "https://webpack.js.org/",
          "cpe": null,
          "categories": [
            {
              "id": 19,
              "slug": "miscellaneous",
              "name": "Miscellaneous"
            }
          ]
        },
        {
          "slug": "core-js",
          "name": "core-js",
          "confidence": 100,
          "version": null,
          "icon": "default.svg",
          "website": "https://github.com/zloirock/core-js",
          "cpe": null,
          "categories": [
            {
              "id": 59,
              "slug": "javascript-libraries",
              "name": "JavaScript libraries"
            }
          ]
        },
        {
          "slug": "wheelio",
          "name": "Wheelio",
          "confidence": 100,
          "version": null,
          "icon": "Wheelio.png",
          "website": "https://wheelio-app.com/",
          "cpe": null,
          "categories": [
            {
              "id": 5,
              "slug": "widgets",
              "name": "Widgets"
            }
          ]
        },
        {
          "slug": "matomo-analytics",
          "name": "Matomo Analytics",
          "confidence": 100,
          "version": null,
          "icon": "Matomo.png",
          "website": "https://matomo.org",
          "cpe": "cpe:/a:matomo:matomo",
          "categories": [
            {
              "id": 10,
              "slug": "analytics",
              "name": "Analytics"
            }
          ]
        },
        {
          "slug": "react",
          "name": "React",
          "confidence": 100,
          "version": null,
          "icon": "React.png",
          "website": "https://reactjs.org",
          "cpe": "cpe:/a:facebook:react",
          "categories": [
            {
              "id": 59,
              "slug": "javascript-libraries",
              "name": "JavaScript libraries"
            }
          ]
        }
      ]
    },
    "zap": {
      "@version": "2.10.0",
      "@generated": "Fri, 3 Sep 2021 23:52:32",
      "site": [
        {
          "@name": "https://www.fabrique.social.gouv.fr",
          "@host": "www.fabrique.social.gouv.fr",
          "@port": "443",
          "@ssl": "true",
          "alerts": [
            {
              "name": "Information Disclosure - Suspicious Comments",
              "riskcode": "0",
              "confidence": "1",
              "riskdesc": "Informational (Low)",
              "desc": "<p>The response appears to contain suspicious comments which may help an attacker. Note: Matches made within script blocks or files are against the entire content not only comments.</p>"
            },
            {
              "name": "CSP: Wildcard Directive",
              "riskcode": "2",
              "confidence": "2",
              "riskdesc": "Medium (Medium)",
              "desc": "<p>The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined: </p><p>frame-ancestors, form-action</p><p></p><p>The directive(s): frame-ancestors, form-action are among the directives that do not fallback to default-src, missing/excluding them is the same as allowing anything.</p>"
            },
            {
              "name": "Server Leaks Version Information via \"Server\" HTTP Response Header Field",
              "riskcode": "1",
              "confidence": "3",
              "riskdesc": "Low (High)",
              "desc": "<p>The web/application server is leaking version information via the \"Server\" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.</p>"
            },
            {
              "name": "CSP: style-src unsafe-inline",
              "riskcode": "2",
              "confidence": "2",
              "riskdesc": "Medium (Medium)",
              "desc": "<p>style-src includes unsafe-inline.</p>"
            },
            {
              "name": "Storable and Cacheable Content",
              "riskcode": "0",
              "confidence": "2",
              "riskdesc": "Informational (Medium)",
              "desc": "<p>The response contents are storable by caching components such as proxy servers, and may be retrieved directly from the cache, rather than from the origin server by the caching servers, in response to similar requests from other users.  If the response data is sensitive, personal or user-specific, this may result in sensitive information being leaked. In some cases, this may even result in a user gaining complete control of the session of another user, depending on the configuration of the caching components in use in their environment. This is primarily an issue where \"shared\" caching servers such as \"proxy\" caches are configured on the local network. This configuration is typically found in corporate or educational environments, for instance.</p>"
            },
            {
              "name": "Modern Web Application",
              "riskcode": "0",
              "confidence": "2",
              "riskdesc": "Informational (Medium)",
              "desc": "<p>The application appears to be a modern web application. If you need to explore it automatically then the Ajax Spider may well be more effective than the standard one.</p>"
            },
            {
              "name": "Base64 Disclosure",
              "riskcode": "0",
              "confidence": "2",
              "riskdesc": "Informational (Medium)",
              "desc": "<p>Base64 encoded data was disclosed by the application/web server. Note: in the interests of performance not all base64 strings in the response were analyzed individually, the entire response should be looked at by the analyst/security team/developer(s).</p>"
            },
            {
              "name": "Reverse Tabnabbing",
              "riskcode": "2",
              "confidence": "2",
              "riskdesc": "Medium (Medium)",
              "desc": "<p>At least one link on this page is vulnerable to Reverse tabnabbing as it uses a target attribute without using both of the \"noopener\" and \"noreferrer\" keywords in the \"rel\" attribute, which allows the target page to take control of this page.</p>"
            },
            {
              "name": "In Page Banner Information Leak",
              "riskcode": "1",
              "confidence": "3",
              "riskdesc": "Low (High)",
              "desc": "<p>The server returned a version banner string in the response content. Such information leaks may allow attackers to further target specific issues impacting the product and version in use.</p>"
            },
            {
              "name": "Incomplete or No Cache-control Header Set",
              "riskcode": "1",
              "confidence": "2",
              "riskdesc": "Low (Medium)",
              "desc": "<p>The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content.</p>"
            },
            {
              "name": "Permissions Policy Header Not Set",
              "riskcode": "1",
              "confidence": "2",
              "riskdesc": "Low (Medium)",
              "desc": "<p>Permissions Policy Header is an added layer of security that helps to restrict from unauthorized access or usage of browser/client features by web resources. This policy ensures the user privacy by limiting or specifying the features of the browsers can be used by the web resources. Permissions Policy provides a set of standard HTTP headers that allow website owners to limit which features of browsers can be used by the page such as camera, microphone, location, full screen etc.</p>"
            },
            {
              "name": "Timestamp Disclosure - Unix",
              "riskcode": "0",
              "confidence": "1",
              "riskdesc": "Informational (Low)",
              "desc": "<p>A timestamp was disclosed by the application/web server - Unix</p>"
            }
          ]
        }
      ]
    },
    "nuclei": [
      {
        "templateID": "nginx-version",
        "info": {
          "name": "nginx version detect",
          "author": [
            "philippedelteil"
          ],
          "tags": null,
          "description": "Some nginx servers have the version on the response header. Useful when you need to find specific CVEs on your targets.",
          "reference": null,
          "severity": "info"
        },
        "type": "http",
        "host": "https://www.fabrique.social.gouv.fr",
        "matched": "https://www.fabrique.social.gouv.fr",
        "extracted_results": [
          "nginx/1.17.8"
        ],
        "ip": "20.74.14.77",
        "timestamp": "2021-09-03T23:55:05.078589619Z"
      },
      {
        "templateID": "can-i-take-over-dns-fingerprint",
        "info": {
          "name": "Can I Take Over DNS - Fingerprint",
          "author": [
            "pdteam"
          ],
          "tags": [
            "dns",
            "ns",
            "takeover"
          ],
          "reference": [
            "https://github.com/indianajson/can-i-take-over-dns"
          ],
          "severity": "info"
        },
        "matcher_name": "azure",
        "type": "dns",
        "host": "https://www.fabrique.social.gouv.fr",
        "matched": "https://www.fabrique.social.gouv.fr",
        "timestamp": "2021-09-03T23:55:09.16274644Z"
      },
      {
        "templateID": "tech-detect",
        "info": {
          "name": "Wappalyzer Technology Detection",
          "author": [
            "hakluke"
          ],
          "tags": [
            "tech"
          ],
          "reference": null,
          "severity": "info"
        },
        "matcher_name": "nginx",
        "type": "http",
        "host": "https://www.fabrique.social.gouv.fr",
        "matched": "https://www.fabrique.social.gouv.fr",
        "ip": "20.74.14.77",
        "timestamp": "2021-09-03T23:55:12.45345032Z"
      }
    ],
    "lhr": {
      "requestedUrl": "https://www.fabrique.social.gouv.fr/",
      "finalUrl": "https://www.fabrique.social.gouv.fr/",
      "fetchTime": "2021-09-03T23:52:34.263Z",
      "runWarnings": [],
      "categories": {
        "performance": {
          "title": "Performance",
          "id": "performance",
          "score": 0.45
        },
        "accessibility": {
          "title": "Accessibility",
          "description": "These checks highlight opportunities to [improve the accessibility of your web app](https://developers.google.com/web/fundamentals/accessibility). Only a subset of accessibility issues can be automatically detected so manual testing is also encouraged.",
          "manualDescription": "These items address areas which an automated testing tool cannot cover. Learn more in our guide on [conducting an accessibility review](https://developers.google.com/web/fundamentals/accessibility/how-to-review).",
          "id": "accessibility",
          "score": 0.96
        },
        "best-practices": {
          "title": "Best Practices",
          "id": "best-practices",
          "score": 0.93
        },
        "seo": {
          "title": "SEO",
          "description": "These checks ensure that your page is optimized for search engine results ranking. There are additional factors Lighthouse does not check that may affect your search ranking. [Learn more](https://support.google.com/webmasters/answer/35769).",
          "manualDescription": "Run these additional validators on your site to check additional SEO best practices.",
          "id": "seo",
          "score": 0.9
        },
        "pwa": {
          "title": "Progressive Web App",
          "description": "These checks validate the aspects of a Progressive Web App. [Learn more](https://developers.google.com/web/progressive-web-apps/checklist).",
          "manualDescription": "These checks are required by the baseline [PWA Checklist](https://developers.google.com/web/progressive-web-apps/checklist) but are not automatically checked by Lighthouse. They do not affect your score but it's important that you verify them manually.",
          "id": "pwa",
          "score": 0.42
        }
      },
      "audits": {
        "metrics": {
          "id": "metrics",
          "title": "Metrics",
          "description": "Collects all available metrics.",
          "score": null,
          "scoreDisplayMode": "informative",
          "numericValue": 3413,
          "numericUnit": "millisecond",
          "details": {
            "type": "debugdata",
            "items": [
              {
                "firstContentfulPaint": 1487,
                "firstMeaningfulPaint": 2087,
                "largestContentfulPaint": 9438,
                "firstCPUIdle": 3032,
                "interactive": 3413,
                "speedIndex": 2041,
                "estimatedInputLatency": 13,
                "totalBlockingTime": 88,
                "maxPotentialFID": 179,
                "cumulativeLayoutShift": 0.0008589238656159644,
                "cumulativeLayoutShiftAllFrames": 0,
                "observedTimeOrigin": 0,
                "observedTimeOriginTs": 216039253,
                "observedNavigationStart": 0,
                "observedNavigationStartTs": 216039253,
                "observedFirstPaint": 567,
                "observedFirstPaintTs": 216606126,
                "observedFirstContentfulPaint": 567,
                "observedFirstContentfulPaintTs": 216606126,
                "observedFirstMeaningfulPaint": 956,
                "observedFirstMeaningfulPaintTs": 216994896,
                "observedLargestContentfulPaint": 961,
                "observedLargestContentfulPaintTs": 217000697,
                "observedTraceEnd": 2222,
                "observedTraceEndTs": 218261278,
                "observedLoad": 1164,
                "observedLoadTs": 217203119,
                "observedDomContentLoaded": 565,
                "observedDomContentLoadedTs": 216604708,
                "observedCumulativeLayoutShift": 0.0008589238656159644,
                "observedCumulativeLayoutShiftAllFrames": 0,
                "observedFirstVisualChange": 568,
                "observedFirstVisualChangeTs": 216607253,
                "observedLastVisualChange": 2218,
                "observedLastVisualChangeTs": 218257253,
                "observedSpeedIndex": 918,
                "observedSpeedIndexTs": 216957321
              },
              {
                "lcpInvalidated": false
              }
            ]
          }
        },
        "diagnostics": {
          "id": "diagnostics",
          "title": "Diagnostics",
          "description": "Collection of useful page vitals.",
          "score": null,
          "scoreDisplayMode": "informative",
          "details": {
            "type": "debugdata",
            "items": [
              {
                "numRequests": 51,
                "numScripts": 16,
                "numStylesheets": 1,
                "numFonts": 3,
                "numTasks": 1120,
                "numTasksOver10ms": 5,
                "numTasksOver25ms": 2,
                "numTasksOver50ms": 0,
                "numTasksOver100ms": 0,
                "numTasksOver500ms": 0,
                "rtt": 81.42399999999999,
                "throughput": 97016540.01178907,
                "maxRtt": 83.94500000000001,
                "maxServerLatency": 63.456,
                "totalByteWeight": 7612039,
                "totalTaskTime": 491.60799999999983,
                "mainDocumentTransferSize": 8114
              }
            ]
          }
        }
      }
    }
  };