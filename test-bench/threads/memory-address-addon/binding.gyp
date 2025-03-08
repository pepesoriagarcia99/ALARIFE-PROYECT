{
  "targets": [
    {
      "target_name": "addon",
      "sources": ["addon.cpp"],
      "cflags": ["-std=c++17"],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"],
      "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"]
    }
  ]
}
# {
#   "targets": [
#     {
#       "target_name": "addon",
#       "sources": ["addon.cpp"]
#     }
#   ]
# }

