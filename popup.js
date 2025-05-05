import(chrome.runtime.getURL('common.js')).then(common =>
    import(chrome.runtime.getURL('settings.js')).then(settings =>
        import(chrome.runtime.getURL('progress.js')).then(progress =>
            chrome.storage.local.get(common.storage, data =>
                main(common, settings, progress, data)
            )
        )
    )
);

function main(common, settings, progress, data) {
    const row_class = 'row';
    const cell_class = 'cell';
    const toggle_class = 'toggle';
    const label_class = 'switch';
    const input_class = 'rate';
    const progress_class = 'progress';
    const done_class = 'done';

    const container1 = document.querySelector('div#container1');
    const container2 = document.querySelector('div#container2');
    const reset_button = document.querySelector('input#reset');
    const progress_div = document.querySelector('div#reset_progress');

    {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.v1, common.default_v1) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v1_enabled', data.v1_enabled, common.default_v1_enabled, common.value));
        container1.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.v2, common.default_v2) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v2_enabled', data.v2_enabled, common.default_v2_enabled, common.value));
        container1.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.v3, common.default_v3) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v3_enabled', data.v3_enabled, common.default_v3_enabled, common.value));
        container1.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.v4, common.default_v4) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v4_enabled', data.v4_enabled, common.default_v4_enabled, common.value));
        container1.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.v5, common.default_v5) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v5_enabled', data.v5_enabled, common.default_v5_enabled, common.value));
        container1.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.v6, common.default_v6) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v6_enabled', data.v6_enabled, common.default_v6_enabled, common.value));
        container1.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.v8, common.default_v8) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v8_enabled', data.v8_enabled, common.default_v8_enabled, common.value));
        container1.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.v7, common.default_v7) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'v7_enabled', data.v7_enabled, common.default_v7_enabled, common.value));
        container1.appendChild(row);
    }

    {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.w1, common.default_w1) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'w1_enabled', data.w1_enabled, common.default_w1_enabled, common.value));
        container2.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.w2, common.default_w2) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'w2_enabled', data.w2_enabled, common.default_w2_enabled, common.value));
        container2.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.w3, common.default_w3) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'w3_enabled', data.w3_enabled, common.default_w3_enabled, common.value));
        container2.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.w4, common.default_w4) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'w4_enabled', data.w4_enabled, common.default_w4_enabled, common.value));
        container2.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.w5, common.default_w5) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'w5_enabled', data.w5_enabled, common.default_w5_enabled, common.value));
        container2.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.w6, common.default_w6) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'w6_enabled', data.w6_enabled, common.default_w6_enabled, common.value));
        container2.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.w7, common.default_w7) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'w7_enabled', data.w7_enabled, common.default_w7_enabled, common.value));
        container2.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, common.value(data.w8, common.default_w8) + 'x'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'w8_enabled', data.w8_enabled, common.default_w8_enabled, common.value));
        container2.appendChild(row);
    }

    settings.registerResetButton(reset_button, progress_div, progress_class, done_class, toggle_class, input_class, progress);
}