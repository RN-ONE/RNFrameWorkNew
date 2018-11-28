package com.reactnativenavigation.parse;

import com.reactnativenavigation.parse.params.Bool;
import com.reactnativenavigation.parse.params.NullBool;
import com.reactnativenavigation.parse.parsers.BoolParser;

import org.json.JSONObject;

public class OverlayOptions {
    public Bool interceptTouchOutside = new NullBool();

    public static OverlayOptions parse(JSONObject json) {
        OverlayOptions options = new OverlayOptions();
        if (json == null) return options;

        options.interceptTouchOutside = BoolParser.parse(json,"interceptTouchOutside");
        return options;
    }
}
