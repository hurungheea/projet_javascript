export const stateModel =
{
  states:
  [
    {
      id : 'mydevice',
      states :
      [
          {
              id : 'idle',
              $type:'initial',
              transitions :
              [
                  {
                      event : 'go',
                      target : 'busy',
                  }

              ],
              onEntry : function()
              {
                port.setOpen(true);
                port.isOpen();
              }
          },
          {
              id : 'busy',
              $type:'parallel',
              onEntry : function()
              {
                port.isClosed();
              },
              transitions :
              [
                  {
                      event : 'e',
                      target : 'idle'
                  },
                  {
                      event : 'c',
                      target : 'S22',
                  }
              ],
              states:
              [
                {
                  id : 'S1',
                  transitions:
                  [
                    {
                        event : 'd',
                        target : 'S21'
                    },
                    {
                        event : 'b',
                        target : 'S12'
                    }
                  ],
                  states:
                  [
                    {
                      id : 'S11',
                      onEntry : function(event)
                      {
                        console.log("w");
                      },
                      onExit : function(event)
                      {
                        console.log("x")
                      }
                    },
                    {
                      id : 'S12',
                      transitions :
                      [
                        {
                          event : 'g',
                          target : 'S11'
                        }
                      ],
                      onEntry : function(event)
                      {
                        console.log("y");
                      },
                      onExit : function(event)
                      {
                        console.log("z")
                      }
                    }
                  ]
                },
                {
                  id : 'S2',
                  states:
                  [
                    {
                      id : 'S22',
                      onEntry : function(event)
                      {
                        //Pas supporté dans cette version
                        //this.send({name: "h", data:event});
                      }
                    },
                    {

                      id : 'S21',
                      transitions :
                      [
                          {
                              event : 'f',
                              target : 'idle'
                          }
                      ]
                    },

                  ]
                },
                {
                  id : 'S3',
                  $type : 'parallel',
                  transitions :
                  [
                      {
                          event : 'c',
                          target : 'S12',
                      }
                  ],
                  states:
                  [
                    {
                      id : 'S31',
                      transitions :
                      [
                          {
                            event : 'h',
                            target : 'S31',
                            onTransition:function(event)
                            {
                              console.log("a");
                            }
                          }
                      ]
                    },
                    {
                      id : 'S32',
                      onEntry:function(event)
                      {
                        port.listenTo();
                      }
                    }
                  ]
                }
              ]
          },
        ],
        transitions :
        [
          {
            event : 'stop',
            target : '$final'
          }
        ]
      },
      {
        id:'$final',
        $type:'final',
        onEntry : function()
        {
          port.setOpen(false);
        }
      }
    ]
};