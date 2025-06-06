import { swaggerUI } from '@hono/swagger-ui'
import { z } from 'zod'

const urlResponse = {
  shortId: z.string().length(6),
  originalUrl: z.string().url(),
  shortUrl: z.string().url()
}

const errorResponse = {
  message: z.string(),
  errors: z.array(z.object({
    message: z.string()
  })).optional()
}

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'URL Shortener API',
    description: 'A simple URL shortener API'
  },
  paths: {
    '/v1/url': {
      post: {
        summary: 'Create a new shortened URL',
        tags: ['URL'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['originalUrl'],
                properties: {
                  originalUrl: {
                    type: 'string',
                    format: 'url'
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'URL created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    data: {
                      type: 'object',
                      properties: {
                        shortId: { type: 'string' },
                        originalUrl: { type: 'string' },
                        shortUrl: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    errors: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          message: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      get: {
        summary: 'Get all URLs for the authenticated user',
        tags: ['URL'],
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'URLs found successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          shortId: { type: 'string' },
                          originalUrl: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/v1/url/{shortId}': {
      put: {
        summary: 'Update a URL',
        tags: ['URL'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'shortId',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['originalUrl'],
                properties: {
                  originalUrl: {
                    type: 'string',
                    format: 'url'
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'URL updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      },
      delete: {
        summary: 'Delete a URL',
        tags: ['URL'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'shortId',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '201': {
            description: 'URL deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/{shortId}': {
      get: {
        summary: 'Redirect to original URL',
        tags: ['URL'],
        parameters: [
          {
            name: 'shortId',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '302': {
            description: 'Redirect to original URL',
            headers: {
              Location: {
                schema: {
                  type: 'string'
                }
              }
            }
          },
          '404': {
            description: 'URL not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/v1/user': {
      post: {
        summary: 'Create a new user',
        tags: ['User'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        }
      },
      put: {
        summary: 'Update a user',
        tags: ['User'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        },
      },
      delete: {
        summary: 'Delete a user',
        tags: ['User'],
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'User deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/v1/user/login': {
      post: {
        summary: 'Login a user',
        tags: ['User'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'User logged in successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    data: {
                      type: 'object',
                      properties: {
                        token: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
} 