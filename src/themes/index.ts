import {createMuiTheme, makeStyles, } from "@material-ui/core";
import type from "@material-ui/lab/themeAugmentation"


const theme = createMuiTheme({
    typography: {
        h1: {
            fontFamily: "'Asap', sans-serif",
            fontSize: '25px',
            lineHeight: '29px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: '#000000'
        },
        h2: {
            fontFamily: "'Asap', sans-serif",
            fontSize: '22px',
            lineHeight: '25px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: '#000000'
        },
        h3: {
            fontFamily: "'Asap', sans-serif",
            fontSize: '20px',
            lineHeight: '23px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: '#000000'
        },
        h4: {
            fontFamily: "'Asap', sans-serif",
            fontSize: '16px',
            lineHeight: '18px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: '#000000'
        },
        subtitle1: {
            fontFamily: "'Asap', sans-serif",
        },
        body2: {
            fontFamily: "'Inter', sans-serif",
        },
        caption: {
            fontFamily: "'Inter', sans-serif",
            color: '#94979F',
        },
        subtitle2: {
            fontFamily: "'Asap', sans-serif",
        }

    },
    overrides: {
        MuiDialogActions: {
            root: {
                justifyContent: 'space-between',
                '& .MuiButton-text': {
                    '& .MuiButton-label': {
                        color: '#0d2e6e',

                    }

                }
            }
        },
        MuiPaper: {
            root: {
                '& .MuiMenu-paper': {
                    backgroundColor: 'red',
                    position: 'relative'
                }
            }
        },
        MuiContainer: {
            root: {
                ['@media (min-width:1280px)']: {
                    maxWidth: 'none!important'
                }
            }
        },
        MuiTab: {
            wrapper: {
                textTransform: 'none'
            }
        },
        MuiFormControlLabel: {
            label: {
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#737780',
                lineHeight: '1.2',
            }
        },
        MuiSvgIcon: {
            root: {
                color: '#0d2e6e'
            }
        },
        MuiButton: {
            root: {
                textTransform: 'none',
                padding: '15px',
                borderRadius: '8px',
                '& .MuiButton-label': {
                    fontFamily: "'Asap', sans-serif",
                    fontSize: '16px',
                    lineHeight: '18px',
                    fontStyle: 'normal',
                    textAlign: 'center',
                    fontWeight: 600,
                    margin: '0px 10px',
                    color: '#FFF'
                }
            },
            outlinedPrimary: {
                border: '1.5px solid #0d2e6e',
                '& .MuiButton-label': {
                    color: '#0d2e6e'
                }
            },
            textSizeLarge: {
                width: '313px',
                height: '48px',
            },
            containedPrimary: {
                backgroundColor: '#0d2e6e'
            }
        },
        MuiTableHead: {
            root: {
                '& .MuiTableRow-head': {
                    '& .MuiTableCell-root': {
                        backgroundColor: '#FFF',
                        color: '#0d2e6e',
                        borderBottomWidth: 0
                    }
                }
            }
        },
        MuiAutocomplete: {
            root: {
                height: 'auto',
                maxHeight: 'none',
                '& .MuiTextField-root': {
                    height: 'auto',
                    maxHeight: 'none',
                }
            },
            listbox: {
                '& .MuiAutocomplete-option[aria-selected="true"]': {
                    background: '#fff !important',
                    position: 'relative',
                    '&::after': {
                        display: 'inline-block',
                        content: `'✔'`,
                        position: 'absolute',
                        color: '#5939E3',
                        right: '15px',
                        top: 0
                    },

                }
            },
            tag: {
                margin: 2,
                color: '#FFF',
                background: '#0d2e6e',
                borderRadius: '4px',
                padding: '4px',
                height: 'auto',
                fontSize: '11px',
                fontFamily: 'Roboto'
            },
            inputRoot: {
                margin: 0,
                padding: '0 !important',
                '& .MuiAutocomplete-input': {
                    padding: '2px 16px !important'
                }
            }
        },
        MuiTableCell: {
            root: {
                fontSize: 10,
                padding: '4px 0',
                '& .MuiAvatar-circle': {
                    width: 35,
                    height: 35
                }
            }
        },
        MuiCheckbox: {
        },
        MuiTextField: {
            root: {
                '& .MuiInputBase-root.MuiInputBase-adornedEnd': {
                    marginTop: 0,
                    '& .MuiSvgIcon-root': {
                        cursor: 'pointer',
                        marginRight: 5
                    }
                },
                '& .MuiInput-underline.Mui-focused': {
                    borderColor: '#0d2e6e',
                },
                '& .MuiInput-underline.Mui-focused.Mui-error': {
                    borderColor: '#EE4B63',
                },
                '& .MuiInput-underline.Mui-error': {
                    borderColor: '#EE4B63'
                },
                '& .MuiFormHelperText-root': {
                    fontSize: '12px',
                    lineHeight: '16px',
                    marginTop: '10px',
                },
                '& .MuiInput-input':  {
                    fontFamily: "'Inter', sans-serif",
                    padding: '0px 16px',
                    fontWeight: 'normal',
                    fontSize: '16px',
                    lineHeight: '18px',
                    letterSpacing: '0.03em',
                    color: '#5E626B'
                },
                '& .MuiInput-input.Mui-disabled': {
                    color: '#00000061'
                },
                '& .MuiSelect-nativeInput': {
                    left: '-16px'
                },
                '& .MuiInputLabel-formControl': {
                    zIndex: 2,
                    fontFamily: "'Inter', sans-serif",
                    fontStyle: 'italic',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '12px',
                    letterSpacing: '0.03em',
                    margin: '2px 16px',
                    transform: 'translate(0, 14px) scale(1)'
                },
                '& .MuiInputLabel-shrink': {
                    transform: 'translate(0, 1.5px) scale(0.75)',
                },
                '& .MuiInputLabel-shrink.MuiFocused': {
                    color: '#ff0000'
                },
                '& .MuiInput-underline': {
                    height: '44px',
                    background: '#F4F6F9',
                    border: '1px solid #B0B3B9',
                    borderRadius: '8px',
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    '& .MuiInputAdornment-positionEnd': {
                        '& .MuiIconButton-root': {
                            padding: '0 6px 0 0 ',
                            '& .MuiIconButton-label': {
                                '& .MuiSvgIcon-root': {
                                    fill: 'none'
                                }
                            }
                        }
                    },
                    '& .MuiSelect-icon': {
                        top: 'calc(100% - 33px)'
                    },
                    '&::before': {
                        content: '',
                        borderBottom: '0px !important',
                    },
                    '&::after': {
                        content: '',
                        borderBottom: '0px !important',
                    }
                },
                '& .MuiInput-multiline': {
                    height: 'auto',
                    paddingTop: 15
                },
                '& .MuiInputBase-adornedEnd' : {
                    marginTop: '7px'
                }
            }
        }
    }
});

export interface ISidebarBackgroundContainer {
    background: string;
}


export interface CustomStyleProps {
    inlineWidth?: number;
}


const useStyleClasses = makeStyles({
    requiredInput: {
        position: 'relative',
        '&::after' : {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: '0',
            right: '-12px',
            fontSize: '20px'
        }
    },
    deleteIcon: {
        color: '#fff',
        width: '18px',
        height: '18px'
    },
    disabledInput: {
        '& .MuiInput-formControl.Mui-disabled': {
            justifyContent: 'center',
            background: '#F4F6F9',
            borderColor: '#F4F6F9',
            marginTop: 0,
            '& .MuiInput-input.Mui-disabled': {
                color: '#B0B3B98C',
            }
        }
    },
    main: {
        marginLeft: '245px!important',
        width: 'calc(100% - 245px)!important',
        ['@media (min-width:1480px)']: {
            marginLeft: '477px!important',
            width: 'calc(100% - 477px)!important',
        }
    },
    navigationHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 20px 10px 0px'
    },
    gradientHeader: {
        textTransform: 'uppercase',
        background: 'linear-gradient(270deg, #FFDA61 0%, #23D8C4 100%)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        display: 'inline-block',
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '20px',
    },
    gradientHeader2: {
        textTransform: 'uppercase',
        marginBottom: '10px',
        background: 'linear-gradient(270deg, #EE4B63 0%, #0d2e6e 100%)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        display: 'inline-block',
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '20px',
    },
    submitContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '40px',
        '& .MuiButton-contained' : {
            width: '115px',
            height: '40px',
            '& .MuiButton-label': {
                fontSize: '14px'
            }
        }
    },
    inlineFormContainer: {
        display: 'flex',
        paddingBottom: '15px',
        '& .MuiTextField-root': {
            width:  '186px',
            marginRight: '25px'
        }
    }
});
export {
    theme,
    useStyleClasses,
}
