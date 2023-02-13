const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pa cuando API',
      description: '',
      version: '1.0.0'
    },
    servers: [{ url: process.env.DOMAIN }],
    tags: [
      {
        name: 'Auth',
        description: 'Operations about authorization'
      },
      {
        name: 'User',
        description: 'Operations about user'
      },
      {
        name: 'Publications_types',
        description: 'Operations about Publications'
      },
      {
        name: 'Publications',
        description: 'Operations about Publications'
      },
      {
        name: 'States',
        description: 'Operations about states'
      },
      {
        name: 'Cities',
        description: 'Operations about cities'
      },
      {
        name: 'Roles',
        description: 'Operations about roles'
      },
      {
        name: 'Tags',
        descrition: 'Operations about  tags'
      }
    ],
    components: {
      securitySchemes: {
        // jwtAuth: {
        //   description: '<strong>Add JWT before insert token :</strong> JWT 2sdasd.....dsdsdsd',
        //   type: 'apiKey',
        //   in: 'header',
        //   name: 'Authorization'
        // }
        bearerAuth: {
          type: 'http',
          description: '<strong>Add JWT Token</strong>',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        user: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password', 'username'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
            },
            firstName: {
              type: 'string',
              example: 'JH'
            },
            lastName: {
              type: 'string',
              example: 'delaCruz'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'quebendicion@email.com'
            },
            username: {
              type: 'string',
              example: 'jhdelacruz777'
            }
          }
        },
        Publications: {
          type: 'object',
          required: ['profile_id', 'publication_type_id', 'title', 'description', 'urlShare', 'tags'],
          properties: {
            // profile: {
            //   type: 'string',
            //   format: 'uuid',
            //   required:true,
            //   example: 'newUrl'
            //},
            idPublicationType: {
              type: 'string',
              format: 'integer',
              required: true,
              example: '1'
            },
            title: {
              type: 'string',
              example: 'newTitle',
              required: true,
            },
            description: {
              type: 'string',
              example: 'newDescription',
              required: true,
            },
            urlShare: {
              type: 'string',
              example: 'newUrl',
              required: true,
            },
            tags: {
              type: 'string',
              example: '1,2,3',
              required: true,
            },
            // picture: {
            //   type: 'string',
            //   format: 'url',
            //   example: 'www.picture.com'
            // },
            // city_id: {
            //   type: 'string',
            //   format: 'integer',
            //   example: '1'
            // },
            // image_url: {
            //   type: 'string',
            //   format: 'url',
            //   example: 'www.image_url'
            // }
          }
        },
        States: {
          type: 'object',
          required: ['country_id', 'name'],
          properties: {
            country_id: {
              type: 'string',
              example: 'John'
            },
            name: {
              type: 'string',
              example: 'Doe'
            }
          }
        },
        Cities: {
          type: 'object',
          required: ['state_id', 'name'],
          properties: {
            state_id: {
              type: 'string',
              example: 'John'
            },
            name: {
              type: 'string',
              example: 'Doe'
            }
          }
        },
        Roles: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              example: 'John'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            statusCode: { type: 'error', format: 'integer', example: 'NNN' },
            erroName: { type: 'string', example: 'SequelizeUniqueConstraintError' },
            message: { type: 'string', example: 'llave duplicada viola restricción de unicidad «users_email_key»' }
          }
        },
        Publication: {
          type: 'object',
          properties: {
            id: {
              type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
            },
            profile_id: {
              type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
            },
            title: {
              type: 'string', example: 'newTitle'
            },
            description: {
              type: 'string', example: 'newDescription'
            },
            // content: {
            //   type: 'string', example: 'newContent'
            // },
            urlShare: {
              type: 'string',
              example: 'newUrl'
            },
            // picture: {
            //   type: 'string', format: 'url', example: 'www.picture.com'
            // },
            // image_url: {
            //   type: 'string', format: 'url', example: 'www.image.com'
            // },
            created_at: {
              type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
            },
            updated_at: {
              type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
            },
            votes_count: {
              type: 'integer', example: '1'
            },
            City: {
              type: 'object',
              properties: {
                id: {
                  type: 'string', example: '1'
                },
                name: {
                  type: 'string', example: 'nameCity'
                },
                State: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string', example: '1'
                    },
                    name: {
                      type: 'string', example: 'nameState'
                    },
                    Country: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string', example: '1'
                        },
                        name: {
                          type: 'string', example: 'nameCountry'
                        }
                      }
                    }
                  }
                }
              }
            },
            publication_type_id: {
              type: 'object',
              properties: {
                id: {
                  type: 'string', example: '1'
                },
                name: {
                  type: 'string', example: 'namePublicationType'
                },
                description: {
                  type: 'string', example: 'info publication'
                }
              }
            },
            tags: {
              type: 'array',
              items: {
                properties: {
                  id: {
                    type: 'string', example: '1'
                  },
                  name: {
                    type: 'string', example: 'namePublicationType'
                  }
                }
              }
            }
          }
        }
      }
    },
    paths: {
      '/api/v1/auth/sign-up': {
        post: {
          tags: [
            'Auth'
          ],
          summary: 'Add a new User',
          description: 'After registering, a verification email will be sent to your email',
          operationId: 'addUser',
          requestBody: {
            description: 'The email property is unique and the default profile is public',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    firstName: {
                      type: 'string', required: true, example: 'newFirstName'
                    },
                    lastName: {
                      type: 'string', required: true, example: 'newLastName'
                    },
                    email: {
                      type: 'string', unique: true, format: 'email', required: true, example: 'new@email.com'
                    },
                    password: {
                      type: 'string', required: true, example: 'pass1234'
                    }

                  }

                }
              }
            },
            required: true
          },
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          firstName: {
                            type: 'string', example: 'newFirstName'
                          },
                          lastName: {
                            type: 'string', example: 'newLastName'
                          },
                          username: {
                            type: 'string', example: 'newUserName'
                          },
                          email: {
                            type: 'string', format: 'email', example: 'new@gmail.com'
                          },
                          roleId: {
                            type: 'string', format: 'integer', example: '1'
                          }
                        }
                      },
                      errors: {
                        type: 'object',
                        properties: {
                          counter: { type: 'string', format: 'integer', example: '0' },
                          message: { type: 'string', example: 'null' }
                        }
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/api/v1/auth/login': {
        post: {
          tags: [
            'Auth'
          ],
          summary: 'Login to the page',
          description: 'The login returns the token of the registered user that is only public, in the case that it is admin it returns two tokens, a public token and an admin token | <strong>The token has a time limit of 24 hours</strong>',
          operationId: 'LogIn',
          requestBody: {
            description: 'After login you will receive a token',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string', format: 'email', required: true, example: 'new@email.com'
                    },
                    password: {
                      type: 'string', required: true, example: 'pass1234'
                    }
                  }
                }
              }
            },
            required: true
          },
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string', example: 'Correct Credentials!'
                      },
                      token: {
                        type: 'array',
                        items: {
                          properties: {
                            public: {
                              type: 'string', example: 'eyJhbGciOiJ......6yJV_adQssw5c'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            },
          }
        }
      },
      '/api/v1/auth/forget-password': {
        post: {
          tags: [
            'Auth'
          ],
          summary: 'Recover password',
          description: 'Recover account by mail, you have 15min to use the link in the email',
          operationId: 'forgetPassword',
          requestBody: {
            description: 'Email you want to recover',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string', format: 'email', required: true, example: 'new@email.com'
                    }
                  }
                }
              }
            },
            required: true
          },
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          message: {
                            type: 'string',
                            example: 'Email sended!, Check your inbox'
                          },
                          errors: {
                            type: 'object',
                            properties: {
                              counter: {
                                type: 'integer',
                                example: '0'
                              },
                              message: {
                                type: 'string',
                                example: 'null'
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
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/api/v1/auth/change-password/{token}': {
        post: {
          tags: [
            'Auth'
          ],
          summary: 'Change password with token',
          description: 'The token is in your email, has an expiration date of 15min when created',
          operationId: 'restorePassword',
          parameters: [
            {
              name: 'token',
              in: 'path',
              description: 'The token is in your email',
              required: true,
              schema: {
                type: 'string',
                example: 'eyOiwGnmajqusjEsUjn......cferi5IXy7'
              }
            }
          ],
          requestBody: {
            description: 'After registering, a verification email will be sent to your email',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    password: { type: 'string', required: true, example: '123' }
                  }
                }
              }
            },
            required: true
          },
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string', example: 'update success'
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/api/v1/users/user-info': {
        get: {
          tags: [
            'User'
          ],
          summary: 'Get my data',
          description: '<strong>Get</strong> my information through the <strong>token</strong>',
          operationId: 'userInfo',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          email: {
                            type: 'string', format: 'email', example: 'random@mail.com'
                          },
                          username: {
                            type: 'string', example: 'userName'
                          },
                          profile: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                image_url: {
                                  type: 'string', format: 'email', example: 'random@mail.com'
                                },
                                code_phone: {
                                  type: 'string', example: 'userName'
                                },
                                phone: {
                                  type: 'string', example: '999888777'
                                },
                                role: {
                                  type: 'object',
                                  properties: {
                                    id: {
                                      type: 'string', example: '1'
                                    },
                                    name: {
                                      type: 'string', example: 'public'
                                    },
                                  }
                                },
                                // username: {
                                //   type: 'string',example: 'userName' 
                                // },
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
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        }
      },
      '/api/v1/publications-types': {
        get: {
          tags: [
            'Publications_types'
          ],
          summary: 'Get all Publications types',
          description: 'Search all available publications types',
          operationId: 'getPublicationsTypes',
          parameters: [
            {
              name: 'size',
              in: 'query',
              description: 'Pagination | How many instances per request',
              schema: {
                type: 'integer'
              },
              example: '10'
            },
            {
              name: 'page',
              in: 'query',
              description: 'Pagination | From which page will start counting to return instances | Starts from 1 by default',
              schema: {
                type: 'integer'
              },
              example: '1'
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'string', example: '1'
                                },
                                name: {
                                  type: 'string', example: 'newEvent'
                                },
                                description: {
                                  type: 'string', example: 'newDescription'
                                },
                                created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
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
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/api/v1/publications-types/{publicationsTypesId} ': {
        get: {
          tags: [
            'Publications_types'
          ],
          summary: 'Get Publication',
          description: 'Search for a publication by id',
          operationId: 'getPublicationType',
          parameters: [
            {
              name: 'publicationsTypesId',
              in: 'path',
              description: 'ID of Publications-types',
              required: true,
              schema: {
                type: 'integer'
              }
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'integer', example: '1'
                          },
                          name: {
                            type: 'string', example: 'newEvent'
                          },
                          description: {
                            type: 'string', example: 'newDescription'
                          },
                          created_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          },
                          updated_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/api/v1/publications': {
        get: {
          tags: [
            'Publications'
          ],
          summary: 'Get all Publications',
          description: 'Search all available publications | filtering by tags (categories), searches for all publications that contain at least one category sent in the query',
          operationId: ' GetAllPublications ',
          parameters: [
            {
              name: 'size',
              in: 'query',
              description: 'Pagination | How many instances per request',
              schema: {
                type: 'integer'
              },
              example: '10'
            },
            {
              name: 'page',
              in: 'query',
              description: 'Pagination | From which page will start counting to return instances | Starts from 1 by default',
              schema: {
                type: 'integer'
              },
              example: '1'
            },
            {
              name: 'tags',
              in: 'query',
              description: 'Tags ID to filter | <strong>Verify that the Tag ID exists</strong> | All the tags that you want to filter must be inside a string separated by commas | ',
              schema: {
                type: 'String'
              },
              example: '1,2,3'
            },
            {
              name: 'publicationsTypesIds',
              in: 'query',
              description: 'Publication Types IDs to filter | <strong>Verify that the Publication Types ID exists</strong> | All Publication Types Ids that you want to filter must be inside a string separated by commas | ',
              schema: {
                type: 'String'
              },
              example: '1,2,3'
            },
            {
              name: 'title',
              in: 'query',
              description: 'Title to filter | <strong>Verify that the title in any publication exists</strong> | ',
              schema: {
                type: 'String'
              },
              example: 'new'
            },
            {
              name: 'description',
              in: 'query',
              description: 'Description ID to filter | <strong>Verify that the description exists in any publication</strong> | ',
              schema: {
                type: 'String'
              },
              example: 'descrip'
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '2'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                profile_id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                title: {
                                  type: 'string', example: 'newTitle'
                                },
                                description: {
                                  type: 'string', example: 'newDescription'
                                },
                                content: {
                                  type: 'string', example: 'newContent'
                                },
                                picture: {
                                  type: 'string', format: 'url', example: 'www.picture.com'
                                },
                                image_url: {
                                  type: 'string', format: 'url', example: 'www.image.com'
                                },
                                created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                votes_count: {
                                  type: 'integer', example: '1'
                                },
                                City: {
                                  type: 'object',
                                  properties: {
                                    id: {
                                      type: 'string', example: '1'
                                    },
                                    name: {
                                      type: 'string', example: 'nameCity'
                                    },
                                    State: {
                                      type: 'object',
                                      properties: {
                                        id: {
                                          type: 'string', example: '1'
                                        },
                                        name: {
                                          type: 'string', example: 'nameState'
                                        },
                                        Country: {
                                          type: 'object',
                                          properties: {
                                            id: {
                                              type: 'string', example: '1'
                                            },
                                            name: {
                                              type: 'string', example: 'nameCountry'
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                publication_type_id: {
                                  type: 'object',
                                  properties: {
                                    id: {
                                      type: 'string', example: '1'
                                    },
                                    name: {
                                      type: 'string', example: 'namePublicationType'
                                    },
                                    description: {
                                      type: 'string', example: 'info publication'
                                    }
                                  }
                                },
                                tags: {
                                  type: 'array',
                                  items: {
                                    properties: {
                                      id: {
                                        type: 'string', example: '1'
                                      },
                                      name: {
                                        type: 'string', example: 'namePublicationType'
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
                  }
                }
              }
            },
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        },
        post: {
          tags: [
            'Publications'
          ],
          summary: 'Add a publication',
          description: 'Add a new publication,by default it adds the city , also the imageURL (in development) | the token is needed to get the profileId',
          operationId: ' createPublications ',
          requestBody: {
            description: 'The Tags that the publication has are entered in a string, which is made up of the Tags ids | <strong>VERIFY THAT TAGS EXIST </strong>',
            content: {
              'application/json': {
                schema: {
                  '$ref': '#/components/schemas/Publications'
                }
              }
            },
            required: true
          },
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        '$ref': '#/components/schemas/Publication'
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        }
      },
      '/api/v1/publications/{publicationId}': {
        get: {
          tags: [
            'Publications'
          ],
          summary: 'Get a Publication',
          description: 'Get a publication from any user by means of the publicationId',
          operationId: 'getPublication',
          parameters: [
            {
              name: 'publicationId',
              in: 'path',
              description: 'ID of Publication',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                profile_id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                title: {
                                  type: 'string', example: 'newTitle'
                                },
                                description: {
                                  type: 'string', example: 'newDescription'
                                },
                                content: {
                                  type: 'string', example: 'newContent'
                                },
                                picture: {
                                  type: 'string', format: 'url', example: 'www.picture.com'
                                },
                                image_url: {
                                  type: 'string', format: 'url', example: 'www.image.com'
                                },
                                created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                votes_count: {
                                  type: 'integer', example: '1'
                                },
                                City: {
                                  type: 'object',
                                  properties: {
                                    id: {
                                      type: 'string', example: '1'
                                    },
                                    name: {
                                      type: 'string', example: 'nameCity'
                                    },
                                    State: {
                                      type: 'object',
                                      properties: {
                                        id: {
                                          type: 'string', example: '1'
                                        },
                                        name: {
                                          type: 'string', example: 'nameState'
                                        },
                                        Country: {
                                          type: 'object',
                                          properties: {
                                            id: {
                                              type: 'string', example: '1'
                                            },
                                            name: {
                                              type: 'string', example: 'nameCountry'
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                publication_type_id: {
                                  type: 'object',
                                  properties: {
                                    id: {
                                      type: 'string', example: '1'
                                    },
                                    name: {
                                      type: 'string', example: 'namePublicationType'
                                    },
                                    description: {
                                      type: 'string', example: 'info publication'
                                    }
                                  }
                                },
                                tags: {
                                  type: 'array',
                                  items: {
                                    properties: {
                                      id: {
                                        type: 'string', example: '1'
                                      },
                                      name: {
                                        type: 'string', example: 'namePublicationType'
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
                  }
                }
              }
            },
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
        },
        delete: {
          tags: [
            'Publications'
          ],
          summary: 'Delete my publication',
          description: 'Delete a publication created by the <strong>user</strong>(profileId) associated with the <strong>token</strong>',
          operationId: 'removePublication',
          parameters: [
            {
              name: 'publicationId',
              in: 'path',
              description: 'ID of publication',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          profile_id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          publication_type_id: {
                            type: 'string', example: '1'
                          },
                          title: {
                            type: 'string', example: 'newTitle'
                          },
                          description: {
                            type: 'string', example: 'newDescription'
                          },
                          content: {
                            type: 'string', example: 'newContent'
                          },
                          picture: {
                            type: 'string', format: 'url', example: 'www.picture.com'
                          },
                          city_id: {
                            type: 'string', example: '1'
                          },
                          image_url: {
                            type: 'string', format: 'url', example: 'www.image.com'
                          },
                          created_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          },
                          updated_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          }
                        }

                      },
                      message: {
                        type: 'object',
                        example: 'removed'
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        }
      },
      '/api/v1/publications/{publicationId}/images': {
        get: {
          tags: [
            'Publications'
          ],
          summary: 'Get Images by publication (URLs) ',
          description: 'Get the urls of the images that have a publication',
          operationId: 'getUrlsImagePublication',
          parameters: [
            {
              name: 'publicationId',
              in: 'path',
              description: 'ID of Publication',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          images: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                image_url: {
                                  type: 'string', format: 'url', example: 'https://bucket.region.amazonaws.com/publications-images-01a503f1.......'
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
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
        },
        post: {
          tags: [
            'Publications'
          ],
          summary: 'Add images to publication',
          description: `<ul> 
          <li>Only allows adding images to the creator of the publication</li> 
          <li><strong>It is not allowed to add more images</strong>, if the publication already registers at least one image</li> 
          </ul>`,
          operationId: 'addImagesPublication',
          parameters: [
            {
              name: 'publicationId',
              in: 'path',
              description: 'ID of publication',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          requestBody: {
            description:
              `<ul> 
              <li><strong>Only 3 images are allowed maximum</strong></li> 
              <li>Only <strong>jpg, jpeg and png </strong> image formats are allowed</li> 
              <li>The image can only weigh a <strong>maximum of 3mb</strong></li>
              <li>There is no resolution limit it will be resized to 1920x1080</li> 
              </ul>`,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    image: {
                      type: 'array',
                      items: {
                        type: 'string',
                        format: 'binary'
                      }
                    }
                  }
                }
              }
            },
            required: true
          },
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          message: {
                            type: 'string',  example: 'success upload'
                          },
                          images: {
                            type: 'array',
                            items : {
                              type: 'string', example: 'publications-images-014f03f1-fdcc-4a1c-88c1-bc3ecc1953d2-b68b27ef-a07a-48ter-9013-a09335ef8c7f'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        },
        delete: {
          tags: [
            'Publications'
          ],
          summary: 'Delete images from a publication',
          description: `<ul> 
          <li><strong>Delete all the images of a publication</strong></li> 
          <li>You can only delete the post created by the user</li> 
          </ul>`,
          operationId: 'removeImagePublication',
          parameters: [
            {
              name: 'publicationId',
              in: 'path',
              description: 'ID of publication',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'object',
                        example : 'Images Deleted'
                      },
                      imagesPublications: {
                        type: 'array',
                        items: {
                          type : 'object',
                          properties :{
                            idPublication:{
                              type: 'string',
                              format: 'uuid',
                              example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                            },
                            idImage:{
                              type: 'string',
                              format: 'uuid',
                              example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        }
      },
      '/api/v1/publications/{publicationId}/vote': {
        post: {
          tags: [
            'Publications'
          ],
          summary: 'Vote for a publication',
          description: 'Extracts the profileID from the token and associates it to a publicationId, if the association does not exist, said association is created, if it already exists then it is deleted',
          operationId: 'votePublication',
          parameters: [
            {
              name: 'publicationId',
              in: 'path',
              description: 'ID of publication',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        example: 'Vote removed'
                      }
                    }
                  }
                }
              }
            },
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          publication_id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          profile_id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          updated_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          },
                          created_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          }

                        }
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        }
      },
      '/api/v1/users/{userId}': {
        get: {
          tags: [
            'User'
          ],
          summary: 'Get my user data',
          description: 'Get my information, the <strong>userId</strong> will be validated with the <strong>token</strong>',
          operationId: 'getAUser',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              description: 'ID of User',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          first_name: {
                            type: 'string', example: 'nowFirstName'
                          },
                          last_name: {
                            type: 'string', example: 'nowLastName'
                          },
                          username: {
                            type: 'string', example: 'nowFirstName'
                          }
                        }

                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        },
        put: {
          tags: [
            'User'
          ],
          summary: 'Update my user',
          description: 'Update my user information | The <strong>userId</strong> will be validated with the <strong>token</strong>',
          operationId: 'putUser',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              description: 'ID of User',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          requestBody: {
            description: 'After registering, a verification email will be sent to your email',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string', example: 'nowUserName'
                    },
                    firstName: {
                      type: 'string', required: true, example: 'nowFirstName'
                    },
                    lastName: {
                      type: 'string', required: true, example: 'nowLastName'
                    },
                    imageUrl: {
                      type: 'string', format: 'url', example: 'www.nowImage.com'
                    },
                    codePhone: {
                      type: 'integer', example: '55'
                    },
                    phone: {
                      type: 'integer', example: '999888777'
                    },
                  }
                }
              }
            },
            required: true
          },
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      result: {
                        type: 'object',
                        properties: {
                          username: {
                            type: 'string', example: 'jhdelacruz777'
                          },
                          first_name: {
                            type: 'string', example: 'jh'
                          },
                          last_name: {
                            type: 'string', example: 'delaCruz'
                          },
                          image_url: {
                            type: 'string', format: 'url', example: 'www.image.com'
                          },
                          code_phone: {
                            type: 'integer', example: '55'
                          },
                          phone: {
                            type: 'integer', example: '999888777'
                          },
                        }
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        }
      },
      '/api/v1/users/{userId}/votes': {
        get: {
          tags: [
            'User'
          ],
          summary: 'Get my votes',
          description: 'Get the votes of the publications | The <strong>userId</strong> will be validated with the <strong>token</strong>',
          operationId: 'getMyVotes',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              description: 'ID of User',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            },
            {
              name: 'size',
              in: 'query',
              description: 'Pagination | How many instances per request',
              schema: {
                type: 'integer'
              },
              example: '10'
            },
            {
              name: 'page',
              in: 'query',
              description: 'Pagination | From which page will start counting to return instances | Starts from 1 by default',
              schema: {
                type: 'integer'
              },
              example: '1'
            }
          ],
          responses: {
            200: {
              description: 'Created Vote',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                publication_id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                profile_id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                }, created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                Publication:
                                {
                                  type: 'object',
                                  properties: {
                                    id: {
                                      type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                    },
                                    profile_id: {
                                      type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                    },
                                    title: {
                                      type: 'string', example: 'newTitle'
                                    },
                                    description: {
                                      type: 'string', example: 'newDescription'
                                    },
                                    content: {
                                      type: 'string', example: 'newContent'
                                    },
                                    picture: {
                                      type: 'string', format: 'url', example: 'www.picture.com'
                                    },
                                    image_url: {
                                      type: 'string', format: 'url', example: 'www.image.com'
                                    },
                                    created_at: {
                                      type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                    },
                                    updated_at: {
                                      type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                    },
                                    votes_count: {
                                      type: 'integer', example: '1'
                                    },
                                    City: {
                                      type: 'object',
                                      properties: {
                                        id: {
                                          type: 'string', example: '1'
                                        },
                                        name: {
                                          type: 'string', example: 'nameCity'
                                        },
                                        State: {
                                          type: 'object',
                                          properties: {
                                            id: {
                                              type: 'string', example: '1'
                                            },
                                            name: {
                                              type: 'string', example: 'nameState'
                                            },
                                            Country: {
                                              type: 'object',
                                              properties: {
                                                id: {
                                                  type: 'string', example: '1'
                                                },
                                                name: {
                                                  type: 'string', example: 'nameCountry'
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    publication_type_id: {
                                      type: 'object',
                                      properties: {
                                        id: {
                                          type: 'string', example: '1'
                                        },
                                        name: {
                                          type: 'string', example: 'namePublicationType'
                                        },
                                        description: {
                                          type: 'string', example: 'info publication'
                                        }
                                      }
                                    },
                                    tags: {
                                      type: 'array',
                                      items: {
                                        properties: {
                                          id: {
                                            type: 'string', example: '1'
                                          },
                                          name: {
                                            type: 'string', example: 'namePublicationType'
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
                      }
                    }
                  }
                }
              }
            },
            201: {
              description: 'Deleted Vote',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'string',
                        extends: 'Voto eliminado'
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        }
      },
      '/api/v1/users/{userId}/publications': {
        get: {
          tags: [
            'User'
          ],
          summary: 'Get my publications',
          description: 'Get my publications |the <strong>userId</strong> will be validated with the <strong>token</strong>',
          operationId: 'getMyPublictions',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              description: 'ID of User',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            },
            {
              name: 'size',
              in: 'query',
              description: 'Pagination | How many instances per request',
              schema: {
                type: 'integer'
              },
              example: '10'
            },
            {
              name: 'page',
              in: 'query',
              description: 'Pagination | From which page will start counting to return instances | Starts from 1 by default',
              schema: {
                type: 'integer'
              },
              example: '1'
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          rows: {
                            type: 'array',
                            items: {
                              properties: {
                                publication_id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                profile_id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                title: {
                                  type: 'string', example: 'newTitle'
                                },
                                description: {
                                  type: 'string', example: 'newDescription'
                                },
                                content: {
                                  type: 'string', example: 'newContent'
                                },
                                picture: {
                                  type: 'string', format: 'url', example: 'www.picture.com'
                                },
                                city_id: {
                                  type: 'integer', example: '1'
                                },
                                image_url: {
                                  type: 'string', format: 'url', example: 'www.image.com'
                                },
                                created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                votes_count: {
                                  type: 'integer', example: '1'
                                },
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
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        }
      },
      '/api/v1/users': {
        get: {
          tags: [
            'User'
          ],
          summary: 'Get All Users',
          description: 'Get all users | <strong>Admin endpoint</strong>',
          operationId: 'getAllUsers',
          parameters: [
            {
              name: 'size',
              in: 'query',
              description: 'Pagination | How many instances per request',
              schema: {
                type: 'integer'
              },
              example: '10'
            },
            {
              name: 'page',
              in: 'query',
              description: 'Pagination | From which page will start counting to return instances | Starts from 1 by default',
              schema: {
                type: 'integer'
              },
              example: '1'
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                first_name: {
                                  type: 'string', example: 'nowFirstname'
                                },
                                last_name: {
                                  type: 'string', example: 'nowLastName'
                                },
                                email: {
                                  type: 'string', example: 'email@email.com'
                                },
                                username: {
                                  type: 'string', example: 'nowUserName'
                                },
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
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        }
      },
      '/api/v1/states': {
        get: {
          tags: [
            'States'
          ],
          summary: 'Get all states',
          description: 'Search all States',
          operationId: 'getAllStates',
          parameters: [
            {
              name: 'size',
              in: 'query',
              description: 'Pagination | How many instances per request',
              schema: {
                type: 'integer'
              },
              example: '10'
            },
            {
              name: 'page',
              in: 'query',
              description: 'Pagination | From which page will start counting to return instances | Starts from 1 by default',
              schema: {
                type: 'integer'
              },
              example: '1'
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'integer', example: '1'
                                },
                                country_id: {
                                  type: 'integer', example: '1'
                                },
                                name: {
                                  type: 'string', example: 'nowNameState'
                                },
                                // created_at: {
                                //   type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                // },
                                // updated_at: {
                                //   type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                // }
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
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          }

        }
      },
      '/api/v1/cities': {
        get: {
          tags: [
            'Cities'
          ],
          summary: 'Get all cities',
          description: 'Search all cities',
          operationId: 'getAllCities',
          parameters: [
            {
              name: 'size',
              in: 'query',
              description: 'Pagination | How many instances per request',
              schema: {
                type: 'integer'
              },
              example: '10'
            },
            {
              name: 'page',
              in: 'query',
              description: 'Pagination | From which page will start counting to return instances | Starts from 1 by default',
              schema: {
                type: 'integer'
              },
              example: '1'
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'integer', example: '1'
                                },
                                state_id: {
                                  type: 'integer', example: '1'
                                },
                                name: {
                                  type: 'string', example: 'nowNameCity'
                                },
                                // created_at: {
                                //   type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                // },
                                // updated_at: {
                                //   type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                // }
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
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          }

        }
      },
      '/api/v1/roles': {
        get: {
          tags: [
            'Roles'
          ],
          summary: 'Get all roles | Only admins',
          description: 'Search all Roles  | <strong>Only admins</strong>',
          operationId: 'getAllRoles',
          parameters: [
            {
              name: 'size',
              in: 'query',
              description: 'Pagination | How many instances per request',
              schema: {
                type: 'integer'
              },
              example: '10'
            },
            {
              name: 'page',
              in: 'query',
              description: 'Pagination | From which page will start counting to return instances | Starts from 1 by default',
              schema: {
                type: 'integer'
              },
              example: '1'
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'integer', example: '1'
                                },
                                name: {
                                  type: 'string', example: 'public'
                                },
                                created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
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
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/api/v1/tags': {
        get: {
          tags: [
            'Tags'
          ],
          summary: 'Get all Tags types',
          description: 'Search all available Tags',
          operationId: 'getTags',
          parameters: [
            {
              name: 'size',
              in: 'query',
              description: 'Pagination | How many instances per request',
              schema: {
                type: 'integer'
              },
              example: '10'
            },
            {
              name: 'page',
              in: 'query',
              description: 'Pagination | From which page will start counting to return instances | Starts from 1 by default',
              schema: {
                type: 'integer'
              },
              example: '1'
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'string', example: '1'
                                },
                                name: {
                                  type: 'string', example: 'newTag'
                                },
                                created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
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
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        },
        post: {
          tags: [
            'Tags'
          ],
          summary: `Add Tag`,
          description: `Add new Tag | <strong>Only ADMIN</strong>`,
          operationId: ' createTag ',
          requestBody: {
            description: 'tags post is for Admin',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'newTag'
                    }
                  }
                }
              }
            },
            required: true
          },
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string', example: '5'
                          },
                          name: {
                            type: 'string', example: 'newTag'
                          },
                          created_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          },
                          updated_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        }
      },
      '/api/v1/tags/{TagId}': {
        put: {
          tags: [
            'Tags'
          ],
          summary: 'Update my tag',
          description: `Update tag information | <strong>Only ADMIN</strong>`,
          operationId: 'putTag',
          parameters: [
            {
              name: 'TagId',
              in: 'path',
              description: 'ID of Tag',
              required: true,
              schema: {
                type: 'string',
                format: 'integer'
              }
            }
          ],
          requestBody: {
            description: 'Uddate your tag',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string', example: 'updatedTag'
                    },
                  }
                }
              }
            },
            required: true
          },
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string', example: '5'
                          },
                          name: {
                            type: 'string', example: 'newTag'
                          },
                          created_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          },
                          updated_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        },
        delete: {
          tags: [
            'Tags'
          ],
          summary: 'Delete Tag',
          description: `Delete avalible Tag | <strong>Only ADMIN</strong>`,
          operationId: 'removeTag',
          parameters: [
            {
              name: 'TagId',
              in: 'path',
              description: 'ID of Tag',
              required: true,
              schema: {
                type: 'string',
                format: 'number'
              }
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string', example: '5'
                          },
                          name: {
                            type: 'string', example: 'newTag'
                          },
                          created_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          },
                          updated_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          }
                        }
                      },
                      message: {
                        type: 'object',
                        example: 'removed'
                      }
                    }
                  }
                }
              }
            },
            'Error?': {
              description: 'StatusCode muestra el tipo de error',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }]
        }
      }
    }
  },
  apis: ['src/users/users.router.js', 'src/follows/follows.router.js', 'src/posts/posts.router.js', 'src/auth/auth.router.js']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app, /*port*/) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  console.log(
    `SWAGGER HOST: : http://localhost:${process.env.PORT}/api/v1/docs`
  )
}

module.exports = { swaggerDocs }