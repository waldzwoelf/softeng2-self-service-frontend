const ApprovalView = {


    makeCard(type, vm) {
        console.log(vm);
        let vmTypes = {
            0: "WindowsServer2022",
            1: "Windows11",
            2: "Ubuntu2204"
        }

        let vmTypesReverse = {
            "WindowsServer2022": 0,
            "Windows11": 1,
            "Ubuntu2204": 2
        }

        if (type === 'approval'){

            let frag = new DocumentFragment()
            let info = frag.appendChild(document.createElement('div'))
            info.appendChild(document.createElement('h2')).textContent = `${vm.id}`
            info.appendChild(document.createElement('h3')).textContent = `${vm.employeeEmailAddress}`
            info.appendChild(document.createElement('span')).textContent = `Typ: ${vmTypes[vm.virtualMachineType]}`
            info.appendChild(document.createElement('p')).textContent = vm.description
            let status = frag.appendChild(document.createElement('div'))
            let statusText = status.appendChild(document.createElement('h3'))
            if(vm.businessApprovalState === 0){
                statusText.textContent = 'Genehmigt'
                statusText.style.color = 'green'
            } else if(vm.businessApprovalState === 1){
                statusText.textContent = 'Abgelehnt'
                statusText.style.color = 'red'
            }else if (vm.businessApprovalState === 2) {
                statusText.textContent = 'Offen'
                statusText.style.color = 'orange'
            }


            let buttonApprove = document.createElement('button')
            buttonApprove.classList.add('btn')
            buttonApprove.id = 'buttonApprove'
            buttonApprove.textContent = 'Accept'
            info.appendChild(buttonApprove)
            buttonApprove.addEventListener('click',function () {
                console.log('Approve');
                let vmTypeText = this.parentElement.querySelector('span').textContent
                let vmTypeTextText = vmTypeText.substring(vmTypeText.search(' ') + 1 ,vmTypeText.length)
                let converted = vmTypesReverse[vmTypeTextText]
                let id = this.parentElement.querySelector('h2').textContent
                let vmToApprove = {
                    virtualMachineType: converted,
                    description: this.parentElement.querySelector('p').textContent,
                    employeeEmailAddress: this.parentElement.querySelector('h3').textContent,
                    ipAddress: '127.0.0.1',
                    username: 'initialUsername',
                    initialPassword: 'initialPassword'
                }
                let requestToPutApproved = {
                    reasonForRejection: "",
                    rejected: false
                }
                console.log(vmToApprove);
                console.log(requestToPutApproved);
                fetch('https://provisioningserviceapi.azurewebsites.net/provisioning/api/VirtualEnvironments',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getCookie('JWT')
                    },
                    body: JSON.stringify(vmToApprove)
                }).then((res) =>{
                    if (res.status === 200){
                        alert('Succes!')
                    }else if (res.status === 400){
                        alert('nope.')
                    }

                })
                fetch(`https://provisioningserviceapi.azurewebsites.net/provisioning/api/RequisitionNotes/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getCookie('JWT')
                    },
                    body: JSON.stringify(requestToPutApproved)

                }).then((res) => {
                    if (res.status === 204 || res.status === 200){
                        console.log('Yay');
                    }else {
                        console.log('nopppioo');
                    }
                })
            })

            let buttonReject = document.createElement('button')
            buttonReject.classList.add('btn')
            buttonReject.id = 'buttonReject'
            buttonReject.textContent = 'Reject'
            buttonReject.addEventListener('click', function () {
                console.log('Reject');
            })
            info.appendChild(buttonReject)



            let card = makeGenericCard(frag)
            return card
        }



    },
    updateTitle()   {
        document.querySelector('#content > h1').textContent = 'Genehmigungen'
    },
    showApprovableRequests(){

        let segment = document.querySelector('#approvable-requests')
        segment.style.display = 'flex'
        segment.querySelector('h2').textContent = 'Zu genehmigende Anträge'

    },
    hideAvailableDays() {
        document.querySelector('#available').style.display = 'none'
    },
    updateNewBtn() {
        document.querySelector('#newBtn a').href = ''
    },
    hideAvailableVMs() {
        document.getElementById('available-vms').style.display = 'none'
        document.getElementById('requests').style.display = 'none'
    },
    async display(params) {
        document.querySelectorAll('#requests .card').forEach((it) => {
            it.remove()
        })


        ApprovalView.updateTitle()
        ApprovalView.hideAvailableVMs()
        ApprovalView.hideAvailableDays()
        ApprovalView.showApprovableRequests()

        let user = await getUser()
        console.log(user);
        if (user.role === 'admin' || user.role === 'manager'){
            console.log('accepted!');
            try {
                let res = await fetch(`https://provisioningserviceapi.azurewebsites.net/provisioning/api/RequisitionNotes/`,{
                    headers: {
                        Authorization: 'Bearer ' + getCookie('JWT'),
                    },
                })
                let antraegeData = await res.json()
                antraegeData.forEach((antrag) => {
                    document.getElementById('approvable-requests').appendChild(ApprovalView.makeCard('approval',antrag))
                })

            } catch (e) {
                alert(e)
            }
        }



    }


}