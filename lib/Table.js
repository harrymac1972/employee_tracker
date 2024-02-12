
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
        rtn_str += "  ";
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

        let rtn_str = "";
        let ix = 0;
        for (var head_v of header_arr){
            rtn_str += head_v;
            rtn_str += get_space(real_widths_arr[ix],head_v.length,);
            ix++;
        }
        rtn_str += print_underline(rtn_str);
        return rtn_str;
    }

    let formatted_array = [];
    let maximum_width_arr = get_widths_max_arr();
    let header_arr = Object.keys(results_arr[0]);
    let real_widths_arr = get_real_widths_array(header_arr);
    let print_str = print_header(header_arr,real_widths_arr);


    console.log(print_str);
    return formatted_array;
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

test();


module.exports = { format };