//@flow

// =============================================================================
// MARK: TYPE
// =============================================================================

type Elem = HTMLElement & {
  src ? : string,
  type ? : string,
  href ? : string
}

type OptionElement = {
  name: string,
  tag: string,
  index ? : number,
  display ? : string,
  position ? : string,
  width ? : string | number,
  height ? : string | number,
  top ? : string | number,
  bottom ? : string | number,
  right ? : string | number,
  left ? : string | number,
  opacity ? : number,
  zIndex ? : number,
  bkgColor ? : string,
  innerTxt ? : string,
  margin ? : number,
  padding ? : number,
  append ? : Elem | 'body',
  class ? : string,
  src ? : string,
  href ? : string,
  type ? : string,
  event ? : Function,
  tstart ? : Function,
  tmove ? : Function,
  tend ? : Function,
  click ? : Function,
  style ? : { ...CSSStyleDeclaration
  }
}

type Size = {
  width: number,
  height: number
}

type SrcType = {
  url: string,
  width: number,
  height: number,
  type: string
}

type CanvasPlacement = {
  width: number,
  height: number,
  left: number,
  top: number
}

type OptionResize = 'crop' | 'stretch' | 'contain'

type OptVideoCanvas = {
  resize: OptionResize,
  namePlus ? : string,
  backgroundCanvas ? : boolean
}

type OptionCreateCreative = {
  callback: Function,
  name: string,
  orga ? : string,
  favicon ? : string
}
declare class CanvasFilterBlur extends CanvasRenderingContext2D {
  filter: string
}

// =============================================================================
// MARK: createNewCreative
// =============================================================================
const createNewCreative = (options: OptionCreateCreative) => {
  const {
    callback,
    name,
    orga,
    favicon
  } = options
  return new Promise((resolve, reject) => {
    let win = window
    let doc = document
    var oldLoad = win.onload;
    if (typeof win.onload != "function") {
      win.onload = windowLoad;
    } else {
      win.onload = function () {
        oldLoad();
        windowLoad();
      }
    }

    function windowLoad() {
      const mainBody = doc.body;
      const head = doc.head
      if (mainBody) {
        mainBody.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0; width: 100%; height: 100%;";
        setMargin(0, mainBody)
        displayFlex(mainBody)
      }
      const meta = create('meta')
      meta.setAttribute('name', 'viewport')
      meta.setAttribute('content', 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=yes')
      meta.setAttribute('charset', 'utf-8')
      const title = create('title')
      innerTxt(`${name}${orga?'_'+orga:''}`, title)
      if (favicon) {
        const favi = create('link')
        favi.setAttribute('rel', 'icon')
        favi.setAttribute('type', 'image/x-icon')
        favi.setAttribute('href', favicon)
        if (head) appendToDom(head, favi)
      }
      if (head) {
        appendToDom(head, meta, title)
      }
      computeSize().then(r => {
          if (window.creative === undefined) {
            window.creative = {
              size: r
            }
          } else {
            window.creative.size = r
          }
          callback()
        })
        .catch(er => {
          console.error(er)
        })
    }
  })
}

// =============================================================================
// MARK: string replace 
// =============================================================================

const px: string = 'px';

const getInt = (elem: string): number => parseInt(elem.replace(px, ''), 10);

// =============================================================================
// MARK: MRAID
// =============================================================================

const amMraid = (): boolean => window.mraid !== undefined

// =============================================================================
// MARK: Mobile check
// =============================================================================

const amIphone = (): boolean => navigator.userAgent.includes('iPhone') && !navigator.userAgent.includes('Safari')

const amLandscape = (): boolean => window.orientation === 90 || window.orientation === -90

const amPortrait = (): boolean => window.orientation == 0

// =============================================================================
// MARK: Size
// =============================================================================

async function getSize(elem: HTMLElement | HTMLBodyElement): Promise < Size > {
  return new Promise((resolve, reject) => {
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i <= 25) {
        if (elem.offsetHeight !== 0) {
          clearInterval(interval)
          if (elem instanceof HTMLBodyElement) {
            resolve({
              width: elem.offsetWidth,
              height: elem.offsetHeight
            })
          } else {
            resolve({
              width: elem.offsetWidth,
              height: elem.offsetHeight
            })
          }
        }
      } else {
        const styleH = window.getComputedStyle(elem, null).getPropertyValue('height')
        const styleW = window.getComputedStyle(elem, null).getPropertyValue('width')
        if (getInt(styleH) !== undefined && getInt(styleH) !== 0) {
          clearInterval(interval)
          resolve({
            width: getInt(styleW),
            height: getInt(styleH)
          })
        } else {
          clearInterval(interval)
          reject("ERROR : I can't compute Creative Size")
        }
      }
    }, 10)
  })
}

async function computeSize(): Promise < Size | void > {
  return new Promise((resolve, reject) => {
    if (document.body != null) getSize(document.body).then(r => resolve(r))
  })
}

// =============================================================================
// MARK: SELECTORS
// =============================================================================

const select = (id: string): Elem | null => document.getElementById(id)

const selectClass = (className: string): HTMLCollection < Elem > | null => document.getElementsByClassName(className)

const selectTag = (tag: string): HTMLCollection < Elem > | null => document.getElementsByTagName(tag)

const S = (selector: string): HTMLCollection < Elem > | null | Elem => {
  const first = selector.charAt(0)
  switch (first) {
    case '.':
      return selectClass(selector.slice(1, selector.length))
    case '#':
      return select(selector.slice(1, selector.length))
    default:
      return selectTag(selector)
  }
}

const have = (elem: any): boolean => elem !== undefined && elem !== null

// =============================================================================
// MARK: CREATORS
// =============================================================================

const create = (tag: string): Elem => document.createElement(tag);

const setElem = (name: string, tag: string, index ? : number): Elem => {
  const elem = create(tag)
  elem.id = index ? `${name}${index}` : name
  elem.className = index ? `${index} ${name}` : name
  return elem
}

const classe = (type: string) => (newclass: string, ...elem: Elem[]): Elem[] => elem.map(e => {
  const classList: DOMTokenList = e.classList
  switch (type) {
    case 'add':
      classList.add(newclass)
      break;
    case 'remove':
      classList.remove(newclass)
      break;
    case 'toggle':
      classList.toggle(newclass)
      break;
    default:
      break;
  }
  return e
})

const addClass = classe('add')
const remClass = classe('remove')
const toggleClass = classe('toggle')

const appendToDom = (container: Elem | 'body', ...elem: Elem[]): void => {
  elem.map(e => {
    switch (typeof container) {
      case ('string'):
        if (document.body != null) {
          document.body.appendChild(e)
        } else {
          console.error("null error")
        }
        break;
      default:
        container.appendChild(e)
        break;
    }
  })
}

// =============================================================================
// MARK: CSS MANIP
// =============================================================================

const innerTxt = (text: string, ...elem: Elem[]): string[] => elem.map(e => e.innerHTML = text)

const opacity = (lvl: number) => (...elem: Elem[]): string[] => elem.map(e => e.style.opacity = lvl.toString())

const opacity0 = opacity(0)
const opacity1 = opacity(1)

const display = (type: string) => (...elem: Elem[]): string[] => elem.map(e => e.style.display = type)

const displayBlock = display('block')
const displayNone = display('none')
const displayFlex = display('flex')

const setPos = (type: string) => (...elem: Elem[]): string[] => elem.map(e => e.style.position = type)

const setAbs = setPos('absolute')
const setRel = setPos('relative')
const setFix = setPos('fixed')

const setZindex = (z: number = 0, ...elem: Elem[]): string[] => elem.map(e => e.style.zIndex = z.toString())

const bkgColor = (color: string, ...elem: Elem[]): string[] => elem.map(e => e.style.backgroundColor = color)

const parseDimensionString = (value: string | number):string => {
  if (value === 'auto')return value
  const vwvh: RegExp = /vw|vh/gi
  const result: string = typeof value === 'string' ?
    vwvh.test(value) ?
    `${value}` :
    `${value}%` :
    `${value}px`
    return result
}

const setPM = (type: string) => (x: number, ...elem: Elem[]): void => {
  const style: string[] = ['margin', 'padding']
  const pm: number = style.indexOf(type)
  const value = parseDimensionString(x)
  elem.map(e => {
    switch (pm) {
      case 0:
        e.style.margin = value
        break;
      case 1:
        e.style.padding = value    
        break;
      default:
        console.error('margin/padding');
        break;
    }
    return e
  })
}

const setMargin = setPM('margin')
const setPadding = setPM('padding')

const setTransition = (prop: string, duration: number, ease: string, ...elem: Elem[]): void => {
  let param: string = `${prop} ${duration}s ${ease}`
  elem.map(e => {
    e.style.transition = param
    e.style.setProperty('-webkit-transition', param)
    return e
  })
}

const setDim = (dim: string) => (x: string | number, ...elem: Elem[]): void => {
  const value: string = parseDimensionString(x)
  elem.map(e => {
    switch (dim) {
      case 'width':
        e.style.width = value
        break;
      case 'height':
        e.style.height = value
        break;
      case 'top':
        e.style.top = value
        break;
      case 'bottom':
        e.style.bottom = value
        break;
      case 'right':
        e.style.right = value
        break;
      case 'left':
        e.style.left = value
        break;
      default:
        console.error('dimension');
        break;
    }
    return e
  })
}

const setHeight = setDim('height')
const setWidth = setDim('width')
const setTop = setDim('top')
const setBottom = setDim('bottom')
const setRight = setDim('right')
const setLeft = setDim('left')

const css = (selector: any, styles: {}) => {
  for (const key in styles) {
    if (styles.hasOwnProperty(key)) {
      const style = styles[key];
      selector.style[key] = style
    }
  }
}

// =============================================================================
// MARK: VIDEO to CANVAS
// =============================================================================

function VideoOnCanvas(src: SrcType | string, container: Elem, size: Size, opt ? : OptVideoCanvas) {
  this.src = src
  this.container = container
  this.size = size
  if (opt) {
    this.opt = opt
    this.namePlus = opt.namePlus
    this.resize = opt.resize
    this.bkgCanvas = opt.backgroundCanvas ? opt.backgroundCanvas : false
  }
  this.builtVideo()
}

VideoOnCanvas.prototype = {
  builtVideo: function () {
    this.video = document.createElement('video')
    this.video.id = this.namePlus ? `video${this.namePlus}` : 'video'
    this.video.classList.add('video')
    this.video.style.position = 'absolute'
    this.video.style.opacity = '0'
    this.video.preload = 'auto'
    this.video.autoplay = true
    this.video.defaultMuted = true
    this.video.muted = true
    this.video.style.width = '100px'
    this.video.style.height = 'auto'
    let webKitPlayInline = document.createAttribute('webkit-playsinline')
    this.video.setAttribute('crossorigin', 'anonymous')
    this.video.setAttributeNode(webKitPlayInline)
    let att = document.createAttribute("playsinline")
    this.video.setAttributeNode(att)
    this.container.appendChild(this.video)
    const s = new CreateElem({
      name: this.namePlus ? `source${this.namePlus}` : 'source',
      tag: 'source',
      src: typeof this.src == 'string' ? this.src : this.src.url,
      type: 'video/mp4',
      append: this.video
    })
    this.builtCanvas()
    return this
  },
  builtCanvas: function () {
    this.canvas = document.createElement('canvas')
    this.canvas.style.zIndex = '42'
    this.canvas.id = this.namePlus ? `canvas${this.namePlus}` : 'canvas',
      this.canvas.classList.add('canvas')
    this.canvas.style.position = 'absolute'
    if (this.resize !== 'stretch' && this.bkgCanvas) {
      this.canvasBkg = document.createElement('canvas')
      this.canvasBkg.id = this.namePlus ? `canvasBkg${this.namePlus}` : 'canvasBkg',
        this.canvasBkg.classList.add('canvasBkg')
      this.canvasBkg.style.position = 'absolute'
    }
    if (typeof this.src == 'string' || this.src.width == null) {
      this.video.addEventListener('loadedmetadata', () => {
        getSize(this.video).then(r => {
          if(typeof this.src == 'object') {
            this.src.width = r.width
            this.src.height = r.height
            console.log('this.src: ', this.src);
            console.log(window.creative.data);
          }
          const canvasPlacement = resizeFromOption(this.resize, r, this.size)
          this.canvas.width = canvasPlacement.width
          this.canvas.height = canvasPlacement.height
          this.canvas.style.left = canvasPlacement.left + 'px'
          this.canvas.style.top = canvasPlacement.top + 'px'
          this.container.appendChild(this.canvas)
          if (this.canvasBkg) {
            this.canvasBkg.height = this.size.height
            this.canvasBkg.width = this.size.width
            this.container.appendChild(this.canvasBkg)
          }
        })
      })
    } else {
      const canvasPlacement = resizeFromOption(this.resize, {
        width: this.src.width,
        height: this.src.height
      }, this.size)
      this.canvas.width = canvasPlacement.width
      this.canvas.height = canvasPlacement.height
      this.canvas.style.left = canvasPlacement.left + 'px'
      this.canvas.style.top = canvasPlacement.top + 'px'
      this.container.appendChild(this.canvas)
      if (this.canvasBkg) {
        this.canvasBkg.height = this.size.height
        this.canvasBkg.width = this.size.width
        this.container.appendChild(this.canvasBkg)
      }
    }
    return this
  },
  play: function () {
    playCanvas(this)
    this.video.play()
    return this
  },
  firstQuartile: function (tracker: string) {
    makeTracker(this, 'firstQuartile', 0.25, tracker)
    return this
  },
  midPoint: function (tracker: string) {
    makeTracker(this, 'midPoint', 0.5, tracker)
    return this
  },
  thirdQuartile: function (tracker: string) {
    makeTracker(this, 'thirdQuartile', 0.75, tracker)
    return this
  },
  complete: function (tracker: string) {
    makeTracker(this, 'complete', 0.99, tracker)
    return this
  },
  clickable: function (time: number, tracker: string) {
    makeTracker(this, 'clickable', time, tracker, true)
    return this
  },
  get duration() {
    return this.video.duration
  }
}

const playCanvas = (elem: any) => {
  elem.video.addEventListener('play', () => {
    if (elem.canvasBkg) {
      draw(elem.video, elem.canvas, elem.canvasBkg)
    } else {
      draw(elem.video, elem.canvas)
    }
  })
}

const draw = (video: HTMLVideoElement, canvas: HTMLCanvasElement, canvasBkg ? : HTMLCanvasElement) => {
  
  if (canvasBkg) {
    let ctx = canvas.getContext('2d')
    let ctxBkg = canvasBkg.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    ctxBkg.drawImage(video, 0, 0, canvasBkg.width, canvasBkg.height)
    // $FlowFixMe
    ctxBkg.filter = 'blur(10px)'
    requestAnimationFrame(() => {
      draw(video, canvas, canvasBkg)
    })
  } else {
    let ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    requestAnimationFrame(() => draw(video, canvas))
  }
}

const makeTracker = (object: {
  video: HTMLVideoElement,
  container: Elem
}, name: string, time: number, src: string, clickable ? : boolean = false) => {
  let elem
  object.video.addEventListener('timeupdate', function (e) {
    if (e.target instanceof HTMLVideoElement) {
      if (e.target.currentTime >= e.target.duration * time && elem === undefined) {
        if (clickable) {
          elem = new CreateElem({
            name: name,
            tag: 'a',
            href: src,
            width: window.creative.size.width,
            height: window.creative.size.height,
            position: 'absolute',
            zIndex: 5000,
            append: object.container
          })
        } else {
          elem = new CreateElem({
            name: name,
            tag: 'img',
            src: src,
            position: 'absolute',
            visibility: 'hidden',
            append: object.container
          })
        }
        console.log(`%c${name.toUpperCase()}`, 'color: #FC1F49')
      }
    }
  })
}

const resizeFromOption = (resize: OptionResize, videoSize: Size, mainSize: Size): CanvasPlacement => {
  const ratioVideo = videoSize.height / videoSize.width
  const ratioWrapper = mainSize.height / mainSize.width
  switch (resize) {
    case 'stretch':
      return {
        width: mainSize.width,
        height: mainSize.height,
        left: 0,
        top: 0
      }
    case 'crop':
      return (ratioVideo <= ratioWrapper ? {
        width: (videoSize.width * mainSize.height) / videoSize.height,
        height: mainSize.height,
        left: (mainSize.width - ((videoSize.width * mainSize.height) / videoSize.height)) / 2,
        top: 0
      } : {
        width: mainSize.width,
        height: (videoSize.height * mainSize.width) / videoSize.width,
        left: 0,
        top: (mainSize.height - ((videoSize.height * mainSize.width) / videoSize.width)) / 2
      })
    case 'contain':
      return (ratioVideo <= ratioWrapper ? {
        width: mainSize.width,
        height: (videoSize.height * mainSize.width) / videoSize.width,
        left: 0,
        top: (mainSize.height - ((videoSize.height * mainSize.width) / videoSize.width)) / 2
      } : {
        width: (videoSize.width * mainSize.height) / videoSize.height,
        height: mainSize.height,
        left: (mainSize.width - ((videoSize.width * mainSize.height) / videoSize.height)) / 2,
        top: 0
      })
    default:
      return {
        width: mainSize.width,
        height: mainSize.height,
        left: 0,
        top: 0
      }
  }
}

// =============================================================================
// MARK: EVENT
// =============================================================================

const eventHandler = (event: string) => (handleEvent: EventListener, elem: Elem, bubble ? : boolean) => {
  elem.addEventListener(event, handleEvent, bubble)
}

const click = eventHandler('click')
const tstart = eventHandler('touchstart')
const tmove = eventHandler('touchmove')
const tend = eventHandler('touchend')

// =============================================================================
// MARK: HELPERS
// =============================================================================

const debugo = (obj: {}): string => {
  let response: string = ''
  for (const key of Object.keys(obj)) {
    let kobj: string = '';
    if (typeof obj[key] === 'object') {
      if (key === 'append') {
        kobj = obj[key].id
      } else {
        for (const k of Object.keys(obj[key])) {
          kobj += '\n' + k + ' => ' + obj[key][k] + '\n'
        }
      }
    } else {
      kobj = obj[key]
    }
    response += key + ' => ' + kobj + '\n'
  }
  console.log(`%c ${response}`, 'color: #FC1F49')
  return response
}

// =============================================================================
// MARK:CreateElem COMPIL
// =============================================================================

function CreateElem(opt: OptionElement): void {
  this.opt = opt;
  this.i
  this.build();
}

CreateElem.prototype = {
  build: function () {
    this.i = setElem(this.opt.name, this.opt.tag, this.opt.index)
    if (this.opt.display) display(this.opt.display)(this.i)
    if (this.opt.position) setPos(this.opt.position)(this.i)
    if (this.opt.width) setWidth(this.opt.width, this.i)
    if (this.opt.height) setHeight(this.opt.height, this.i)
    if (this.opt.top) setTop(this.opt.top, this.i)
    if (this.opt.bottom) setBottom(this.opt.bottom, this.i)
    if (this.opt.left) setLeft(this.opt.left, this.i)
    if (this.opt.right) setRight(this.opt.right, this.i)
    if (this.opt.opacity) opacity(this.opt.opacity)(this.i)
    if (this.opt.zIndex) setZindex(this.opt.zIndex, this.i)
    if (this.opt.bkgColor) bkgColor(this.opt.bkgColor, this.i)
    if (this.opt.innerTxt) innerTxt(this.opt.innerTxt, this.i)
    if (this.opt.margin) setMargin(this.opt.margin, this.i)
    if (this.opt.padding) setPadding(this.opt.padding, this.i)
    if (this.opt.append) appendToDom(this.opt.append, this.i)
    if (this.opt.class) addClass(this.opt.class, this.i)
    if (this.opt.style) {
      css(this.i, this.opt.style)
    }
    if (this.opt.src) this.i.src = this.opt.src
    if (this.opt.href) this.i.href = this.opt.href
    if (this.opt.type) this.i.type = this.opt.type
    if (this.opt.tstart) tstart(this.opt.tstart, this.i)
    if (this.opt.tmove) tmove(this.opt.tmove, this.i)
    if (this.opt.tend) tend(this.opt.tend, this.i)
    if (this.opt.click) click(this.opt.click, this.i)
    return this
  },
  info: function () {
    debugo(this.opt)
    return this
  },
  _event: function (e: string, fn: Function) {
    eventHandler(e)(fn, this.i)
    return this
  },
  _style: function (styles: {}) {
    css(this.i, styles)
    return this
  }
}
// =============================================================================
// MENTIONS LEGALES
// =============================================================================

const haveLegalTerms = (wrapper: Elem, data: string, size: Size): void => {
  if (typeof data === 'undefined') return
  let i = 0
  const bkgmentions = new CreateElem({
    name: 'bkgmentions',
    tag: 'div',
    height: 20,
    width: '100',
    position: 'absolute',
    zIndex: 999999998,
    top: size.height - 20,
    bottom: 0,
    style: {
      backgroundColor: 'black'
    },
    append: wrapper
  }).i

  const mentions = new CreateElem({
    name: 'mentions',
    tag: 'div',
    height: 20,
    display: 'flex',
    position: 'absolute',
    zIndex: 999999999,
    top: size.height - 20,
    bottom: 0,
    innerTxt: data,
    style: {
      fontFamily: 'sans-serif',
      color: 'grey',
      whiteSpace: 'nowrap',
    },
    append: wrapper
  }).i

  setInterval(() => {
    mentions.style.left = -i + 'px'
    i++
    if (getInt(mentions.style.left) === -mentions.clientWidth) {
      i = -size.width
      mentions.style.left = -i + 'px'
    }
  }, 20)
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  createNewCreative,
  px,
  getInt,
  amMraid,
  getSize,
  amIphone,
  amLandscape,
  amPortrait,
  computeSize,
  select,
  selectClass,
  selectTag,
  S,
  have,
  create,
  setElem,
  appendToDom,
  innerTxt,
  opacity,
  opacity0,
  opacity1,
  display,
  displayNone,
  displayFlex,
  displayBlock,
  setPos,
  setFix,
  setAbs,
  setRel,
  setZindex,
  bkgColor,
  setPM,
  setMargin,
  setPadding,
  setTransition,
  setDim,
  setWidth,
  setHeight,
  setTop,
  setBottom,
  setRight,
  setLeft,
  classe,
  addClass,
  remClass,
  toggleClass,
  eventHandler,
  tstart,
  tmove,
  tend,
  click,
  debugo,
  CreateElem,
  VideoOnCanvas,
  haveLegalTerms
}