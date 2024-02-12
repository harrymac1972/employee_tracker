
function format(results_arr) {

    function get_real_widths_array(header_arr) {

        var real_widths_arr = [];
        var header_widths_arr = [];
        var ix = 0;
        for (var header_str of header_arr){
            ele_length_n = header_str.length;
            header_widths_arr.push(ele_length_n);
            if (header_widths_arr[ix] > maximum_width_arr[ix]){
                real_widths_arr.push(header_widths_arr[ix]);
            } else {
                real_widths_arr.push(maximum_width_arr[ix]);
            }
            ix++;
        }
        return real_widths_arr;
    }

    function get_widths_max_arr() {

        function get_widths_arr(results_arr){
            let length_arr = [];
            for(var i=0;i<results_arr.length;i++) {
                let j_g = 0;
                var j = 0;
                while(j_g == 0) {
                    let row_o = results_arr[i];
                    let value = Object.values(row_o)[j];
                    if (value == undefined) {
                        j_g = 1;
                        break
                    } else {
                        let length_n = value.toString().length;
                        length_arr.push(length_n);
                    }
                    j++;
                }
            }
            return [length_arr,j];
        }

        var widths_arr = get_widths_arr(results_arr);
        let lengths_all_arr = widths_arr[0];
        let cols_n = widths_arr[1];
        var max_withs_arr = [];
        for (let j = 0; j<cols_n; j++) {
            var max_col_with_n = 0;
            for (i=j;i<lengths_all_arr.length;i+=cols_n) {
                var width_n = lengths_all_arr[i];
                if (width_n > max_col_with_n) {
                    max_col_with_n = width_n;
                }
            }
            max_withs_arr.push(max_col_with_n);
        }
        return max_withs_arr;
    }

    function get_space(width_n,word_length_n){
        let spacer_n = width_n - word_length_n;
        rtn_str = "";
        if (spacer_n > 0){
            for(var i=0;i<spacer_n;i++){
                rtn_str += " ";
            }
        }
        rtn_str += "    "; // add right-margin
        return rtn_str;
    }

    function print_header(header_arr,real_widths_arr) {

        function print_underline(header_str){
            under_str = "\n";
            for (var i=0;i<header_str.length;i++){
                under_str += "-";
            }
            return under_str;
        }    

        let rtn_str = "\n";
        let ix = 0;
        for (var head_v of header_arr){
            rtn_str += head_v;
            rtn_str += get_space(real_widths_arr[ix],head_v.length);
            ix++;
        }
        rtn_str = rtn_str.slice(0,-4); // remove last margin
        rtn_str += print_underline(rtn_str);
        return rtn_str;
    }

    function print_data(results_arr,cols_n,real_widths_arr) {
        rtn_str = "\n";
        for(row_o of results_arr){
            for(var i=0;i<cols_n;i++){
                let word_str = Object.values(row_o)[i];
                if (word_str == null) {
                    word_str = 0;
                }
                rtn_str += word_str;
                rtn_str += get_space(real_widths_arr[i],
                                        word_str.toString().length);
            }
            rtn_str += "\n";
        }
        return rtn_str;
    }

    let table_string = [];
    let maximum_width_arr = get_widths_max_arr();
    let header_arr = Object.keys(results_arr[0]);
    let real_widths_arr = get_real_widths_array(header_arr);
    table_string = print_header(header_arr,real_widths_arr);
    table_string += print_data(results_arr,header_arr.length,real_widths_arr);

    return table_string;
}

function test() {

    let test_arr = [
        {
            id: 1,
            name: 'Engineering',
            testy: '12345',
        },
        {
            id: 2,
            name: 'Finance',
            testy: '1234',
        },
        {
            id: 3,
            name: 'Legal',
            testy: '123',
        },
        {
            id: 4,
            name: 'Sales',
            testy: '1234567',
        },
        {
            id: 5,
            name: 'Service',
            testy: '12',
        },
    ];

    format(test_arr);
};


module.exports = { format };