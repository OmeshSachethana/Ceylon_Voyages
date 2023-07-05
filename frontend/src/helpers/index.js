export const downloadFile = (url) => {
  fetch(url).then((response) => {
    response.blob().then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = decodeURIComponent(url).split('/').pop()?.split('?')[0]
      a.click()
    })
  })
}
