export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length
export const isArray = array => Array.isArray(array)
export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

export const serialize = (obj) => {
  const arr_ = []
  if (obj) {
    Object.keys(obj).map((key, _) => {
      const oneLevel = key
      if (!isEmpty(obj[oneLevel]) && isObject(obj[oneLevel])) {
        const oneLevelPos = arr_.push({ name: oneLevel, label: oneLevel })
        if (!arr_[oneLevelPos - 1].items) {
          arr_[oneLevelPos - 1].items = []
        }
        Object.keys(obj[oneLevel]).map((key, _) => {
          const twoLevel = key
          if (!isEmpty(obj[oneLevel][twoLevel]) && isObject(obj[oneLevel][twoLevel])) {
            const twoLevelPos = arr_[oneLevelPos - 1].items.push({ name: twoLevel, label: twoLevel })
            if (!arr_[oneLevelPos - 1].items[twoLevelPos - 1].items) { arr_[oneLevelPos - 1].items[twoLevelPos - 1].items = [] }
            Object.keys(obj[oneLevel][twoLevel]).map((key, _) => {
              const MenuThreeLevel = key
              arr_[oneLevelPos - 1].items[twoLevelPos - 1].items.push({ name: MenuThreeLevel, label: MenuThreeLevel })
              return true
            })
          } else if (isArray(obj[oneLevel][twoLevel])) {
            arr_[oneLevelPos - 1].items.push({ name: twoLevel, label: twoLevel })
          }
          return true
        })
      } else if (isArray(obj[oneLevel])) {
        arr_.push({ name: oneLevel, label: oneLevel })
      }
      return true
    })
  }
  return arr_
}
