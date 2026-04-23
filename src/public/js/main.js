// Hàm dùng chung để load dữ liệu vào dropdown
async function loadDropdown(endpoint, selectId, valueField, textField) {
    try {
        const response = await fetch(`http://localhost:3000/api/${endpoint}`);
        const data = await response.json();
        const select = document.getElementById(selectId);
        select.innerHTML = '<option value="">-- Chọn --</option>';
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueField];
            // Format text hiển thị nếu có truyền vào hàm format
            if (typeof textField === 'function') {
                option.textContent = textField(item);
            } else {
                option.textContent = `${item[valueField]} - ${item[textField]}`;
            }
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Lỗi khi load dropdown ${selectId}:`, error);
    }
}

// Hàm dùng chung để load bảng dữ liệu
async function loadTable(endpoint, tableId, columns, idField) {
    try {
        const response = await fetch(`http://localhost:3000/api/${endpoint}`);
        const data = await response.json();
        const tbody = document.querySelector(`#${tableId} tbody`);
        tbody.innerHTML = '';
        
        data.forEach(item => {
            const tr = document.createElement('tr');
            columns.forEach(col => {
                const td = document.createElement('td');
                // Nếu dữ liệu là Date thì cắt ngắn lại cho đẹp
                if (item[col] && typeof item[col] === 'string' && item[col].includes('T00:00:00')) {
                    td.textContent = item[col].split('T')[0];
                } else {
                    td.textContent = item[col] !== null ? item[col] : '';
                }
                tr.appendChild(td);
            });
            
            // Cột thao tác
            const tdAction = document.createElement('td');
            const btnDelete = document.createElement('button');
            btnDelete.textContent = 'Xóa';
            btnDelete.className = 'btn-danger';
            
            // Xử lý xóa (hỗ trợ cả xóa bảng bình thường và bảng WORK có 2 khóa chính)
            btnDelete.onclick = async () => {
                if (confirm('Bạn có chắc chắn muốn xóa?')) {
                    let deleteUrl = `http://localhost:3000/api/${endpoint}/${item[idField]}`;
                    
                    // Xử lý riêng cho bảng WORK
                    if (endpoint === 'works') {
                         deleteUrl = `http://localhost:3000/api/works/${item.MarsColonistID}/${item.JobID}`;
                    }

                    await fetch(deleteUrl, { method: 'DELETE' });
                    loadTable(endpoint, tableId, columns, idField); // Reload
                }
            };
            tdAction.appendChild(btnDelete);
            tr.appendChild(tdAction);
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error(`Lỗi khi load bảng ${tableId}:`, error);
    }
}

// Hàm dùng chung để xử lý submit form
function handleFormSubmit(formId, endpoint, reloadCallback) {
    document.getElementById(formId).addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (res.ok) {
                alert(result.message || 'Thêm thành công!');
                e.target.reset();
                if (reloadCallback) reloadCallback();
            } else {
                alert('Lỗi: ' + (result.error || 'Thêm thất bại!'));
            }
        } catch (error) {
            alert('Lỗi kết nối tới Server!');
        }
    });
}
