const rooms = [
    { name: '001', description: '同济大学软件学院', backgroundImage: "url('./image/001.jpg')" },
    { name: '002', description: '茶水间', backgroundImage: "url('./image/002.jpg')" },
    { name: '412', description: '教师办公室', backgroundImage: "url('./image/412.jpg')" },
    { name: '417', description: '会议室', backgroundImage: "url('./image/417.jpg')" },
    { name: '419', description: '实验教室', backgroundImage: "url('./image/419.jpg')" },
    { name: '430', description: '上课教室', backgroundImage: "url('./image/430.jpg')" },
    { name: '434', description: '活动教室', backgroundImage: "url('./image/434.jpg')" },
    { name: '446', description: '教师办公室', backgroundImage: "url('./image/446.jpg')" },
]

const map_class_name = [
    { className: 'left-2' },
    { className: 'left-1' },
    { className: 'middle' },
    { className: 'right-1' },
    { className: 'right-2' }
]
let curRoom = 6 // 第一张图是软件学院

const panels = document.querySelectorAll('.panel')
const container = document.querySelector('.container')

const left_arrow = document.createElement('div')
left_arrow.addEventListener('click', () => {
    container.innerHTML = ""
    curRoom = (curRoom + rooms.length - 1) % rooms.length
    updatePanels(curRoom)
})
left_arrow.style = "display: flex; flex-direction: column; justify-content: center; align-items: center;"
left_arrow.innerHTML = `<i class="fas fa-chevron-left"></i>`
left_arrow.classList.add("left-arrow")

const right_arrow = document.createElement('div')
right_arrow.addEventListener('click', () => {
    container.innerHTML = ""
    curRoom = (curRoom + 1) % rooms.length
    updatePanels(curRoom)
})
right_arrow.style = "display: flex; flex-direction: column; justify-content: center; align-items: center;"
right_arrow.innerHTML = `<i class="fas fa-chevron-right"></i>`
right_arrow.classList.add("right-arrow")

function updatePanels(curRoom) {
    container.appendChild(left_arrow)
    map_class_name.forEach(data => {
        idx = map_class_name.indexOf(data)
        const panel = document.createElement('div')
        panel.classList.add('panel', data.className)
        let room = rooms[(curRoom + idx) % rooms.length]
        panel.style.backgroundImage = room.backgroundImage
        panel.innerHTML = `
            <h3 style="opacity: 0;">${room.name}</h3>
            <p style="opacity: 0;">${room.description}</p>`
        container.appendChild(panel)
    })
    container.appendChild(right_arrow)
}
updatePanels(curRoom)

// ===== 搜索 =====
search = document.getElementById('search-content')
search.addEventListener('keyup', () => {
    if (search.value !== null && search.value != "") {
        container.innerHTML = ""
        rooms.forEach(room => {
            if (room.name.includes(search.value)
            || room.description.includes(search.value)) {
                const panel = document.createElement('div')
                panel.classList.add('panel', 'middle')
                panel.style.backgroundImage = room.backgroundImage
                panel.innerHTML = `
                    <h3 style="opacity: 0;">${room.name}</h3>
                    <p style="opacity: 0;">${room.description}</p>`
                container.appendChild(panel)
            }
        })
        if (container.childNodes.length == 0) {
            const panel = document.createElement('div')
            panel.classList.add('panel', 'middle')
            panel.style.backgroundImage = "url('./image/no-result.png')"
            panel.innerHTML = `
            <p style="opacity: 1; color: black; margin: 50px">
                搜索结果不存在
            </p>`
            container.appendChild(panel)
        }
    } else {
        container.innerHTML = ""
        updatePanels(curRoom)
    }
})

// ===== 侧边栏 =====
bars = document.querySelector('.fa-bars')
image = document.querySelector('.sidebar-image')

const room_ul = document.querySelector('.room-ul')
rooms.forEach(room => {
    const room_li = document.createElement('li');
    (function(room){
        room_li.addEventListener('click', function() {
            image.innerHTML = `
                <h3>${room.name}</h3>
                <p>${room.description}</p>`
            image.style.backgroundImage = room.backgroundImage
            image.style.backgroundSize = "cover"
            room_ul.childNodes.forEach(node => {
                node.classList.remove("selected")
            })
            room_li.classList.toggle("selected")
        })
    })(room)
    room_li.innerHTML = `<p>${room.name}</p>`
    room_ul.appendChild(room_li)
})

const sidebar = document.querySelector('.sidebar')
bars.addEventListener('click', () => {
    bars.classList.toggle('fa-times')
    sidebar.classList.toggle('active')
})
